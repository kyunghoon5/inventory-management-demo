WITH botrantmp
     AS (SELECT *
         FROM   botran
         WHERE  CONVERT(DATE, invdte) BETWEEN   DATEADD(DD, -120, CONVERT(date, GETDATE())) and CONVERT(date, GETDATE())) 
SELECT CASE
         WHEN b.percentile >= 0.98 THEN 'A+'
         WHEN b.percentile >= 0.93 THEN 'A'
         WHEN b.percentile >= 0.9 THEN 'A-'
         WHEN b.percentile >= 0.87 THEN 'B+'
         WHEN b.percentile >= 0.83 THEN 'B'
         WHEN b.percentile >= 0.80 THEN 'B-'
         WHEN b.percentile >= 0.77 THEN 'C+'
         WHEN b.percentile >= 0.73 THEN 'C'
         WHEN b.percentile >= 0.7 THEN 'C-'
         WHEN b.percentile >= 0.67 THEN 'D+'
         WHEN b.percentile >= 0.63 THEN 'D'
         WHEN b.percentile >= 0.6 THEN 'D-'
         ELSE 'F'
       END AS percentile,
 Trim(b.vendno) as vendno,
       b.rank,
       b.class,
       b.descrip,
       b.onhand,
       b.qtyshp,
       b.qtybo,
       b.price,
       b.cost,
       b.brand_name,
       b.length_cat,
       b.num_of_pd,
	   case when b.target_qtyshp >0 then target_qtyshp else 0 end as target_qtyshp,
	 b.onhand/ (b.qtyshp /120) as days_left,
	 case when b.price < b.cost then b.cost else 0 end as sale_on
FROM   (SELECT Percent_rank()
                 OVER (
                   ORDER BY qtyshp)                    AS percentile,
               A.ranknum                               AS 'rank',
			     (SELECT TOP 1 vendno
        FROM   potran10c
        WHERE  descrip = a.descrip )      AS vendno,
               A.class,
               Trim(A.descrip)                         AS descrip,
               (SELECT Sum(onhand)
                FROM   arinvt10
                WHERE  descrip = A.descrip)            AS onhand,
               A.qtyshp,
			  
               Isnull((SELECT Sum(qtybo)
                       FROM   botrantmp
                       WHERE  descrip = A.descrip), 0) AS qtybo,
               (SELECT Min(price)
                FROM   arinvt10
                WHERE  descrip = A.descrip)            AS price,
               (SELECT Min(cost)
                FROM   arinvt10
                WHERE  descrip = A.descrip)            AS cost,
               (SELECT brand_name
                FROM   arinvt10_brand
                WHERE  descrip = A.descrip)            AS brand_name,
               (SELECT length_cat
                FROM   arinvt10_brand
                WHERE  descrip = A.descrip)            AS length_cat,
               (SELECT Count(distinct invno)
                FROM   potran10c
                WHERE  reqdate > Getdate()
                       AND descrip = a.descrip)        AS num_of_pd,
					 (select (sum(qtyshp) *0.15)+sum(qtyshp)  from artran10c where descrip =a.descrip and  CONVERT(DATE, invdte) BETWEEN  datefromparts(datepart(yyyy,getdate()) -1, datepart(mm,getdate()),1)
                                             AND
                                               DATEADD(day, -1, DATEADD
(month, 1, DATEFROMPARTS(YEAR(GETDATE()) - 1, MONTH(GETDATE()), 1)))) as target_qtyshp
        FROM   (SELECT Rank()
                         OVER (
                           ORDER BY Sum(A.qtyshp) DESC) AS rankNum,
                       A.class,
                       A.descrip,
                       Sum(A.qtyshp)                    AS qtyshp
                FROM   artran10c A
                WHERE  CONVERT(DATE, invdte) BETWEEN
                      DATEADD(DD, -120, CONVERT(date, GETDATE())) and CONVERT(date, GETDATE()) 
                       AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
                       AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                       --RB only
                       and A.class in ('RB')
                       --Exclude RB
                       --AND A.class NOT IN ( 'RB', 'AA', 'Z' )
                GROUP  BY A.class,
                          A.descrip) A
        WHERE  A.qtyshp > 0  )b
		where b.vendno is not null and b.vendno not in ('')

ORDER  BY qtyshp DESC 