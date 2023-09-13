select 
b.class,
b.descrip,

((b.qtyshp-b.qtyshp2weeks)/b.qtyshp2weeks) *100  as wowTrend,
b.qtyshp,
b.qtyshp2weeks

from

(SELECT A.class,
       Trim(A.descrip)
       AS descrip,
       A.qtyshp,
	   a.qtyshp2weeks
     
FROM   (SELECT A.class,
               A.descrip,
               isnull(Sum(A.qtyshp),0) AS qtyshp,
			     (SELECT Sum(qtyshp)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND CONVERT(DATE, invdte) BETWEEN Dateadd(dd, -14,
                                                 CONVERT(DATE, Getdate
                                                 ())) AND
                                                 Dateadd(dd, -8,
                                                     CONVERT(DATE, Getdate())))
       AS
       qtyshp2weeks
        FROM   artran10c A
        WHERE  CONVERT(DATE, invdte) BETWEEN Dateadd(dd, -7,
                                             CONVERT(DATE, Getdate()))
                                             AND
                                                   Dateadd(dd, -1,
                                             CONVERT(DATE, Getdate()))
               AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
               AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
               --RB only
               and A.class in ('RB')
               --Exclude RB
               --AND A.class NOT IN ( 'RB', 'AA', 'Z' )
        GROUP  BY A.class,
                  A.descrip) A
WHERE  A.qtyshp > 0) b
where b.qtyshp >0 and b.qtyshp2weeks> 0
ORDER  BY qtyshp DESC 