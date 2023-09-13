SELECT (SELECT TOP 1 class
        FROM   artran10c
        WHERE  descrip = b.descrip)      AS class,

 b.onhand,
		b.recqty,

       b.descrip,

       Isnull(b.total_qty_difference, 0) AS qtyshp,

       b.fristb                          AS start_dte,
       isnull(b.sales_qty_30days,0) as sales_qty_30days,
       isnull(b.sales_qty_60days,0) as sales_qty_60days,
	        isnull(b.sales_qty_90days,0) as sales_qty_90days,
	 b.recqty - (b.onhand +     Isnull(b.total_qty_difference, 0)) as sample_qty,
	    ('http://img.vanessahair.com/sales/'+ RTRIM(LTRIM(descrip))+ '.jpg') AS
       vend_image_url

FROM   (SELECT (SELECT Sum(onhand)
                FROM   arinvt10
                WHERE  descrip = a.descrip) AS onhand,
               (SELECT Sum(qtyrec)
                FROM   potran10c
                WHERE  descrip = a.descrip) AS recqty,
               (SELECT Min(cost)
                FROM   arinvt10
                WHERE  descrip = A.descrip) AS cost,
               (SELECT Min(price)
                FROM   arinvt10
                WHERE  descrip = A.descrip
                       AND price > 0)       AS price,
               A.descrip,
               a.fristb,

               (SELECT Sum(query1.all_qtyshp - query2.total_qtyshp)
                FROM   (SELECT [custno],
                               descrip,
                               itemkey2,
                               Sum(qtyshp) AS all_qtyshp
                        FROM   artran10c
                        WHERE  descrip = A.descrip
                               AND descrip NOT IN ( 'SHIP', 'CALENDAR',
                                                    'BROCHURE' )
                               AND itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                       
                               AND CONVERT(DATE, invdte) BETWEEN
                                   a.fristb AND a.fristb + 30
                        GROUP  BY [custno],
                                  descrip,
                                  itemkey2
                        HAVING Count(custno) > 1) query1
                       JOIN (SELECT t.custno,
                                    t.itemkey2,
                                    t.descrip,
                                    Sum(t.qtyshp) AS total_qtyshp
                             FROM   artran10c t
                                    INNER JOIN (SELECT custno,
                                                       Min(invdte) AS min_invdte
                                                FROM   artran10c
                                                WHERE  descrip = A.descrip
                                                  
                                                GROUP  BY custno
                                                HAVING Count(custno) > 1) t2
                                            ON t.custno = t2.custno
                                               AND t.invdte = t2.min_invdte
                             WHERE  t.descrip = A.descrip
                             GROUP  BY t.custno,
                                       t.itemkey2,
                                       t.descrip,
                                       CONVERT(DATE, t.invdte)
                             HAVING (SELECT Count(*)
                                     FROM   artran10c t3
                                     WHERE  t3.custno = t.custno
                                            AND t3.itemkey2 = t.itemkey2
                                            AND t3.descrip = t.descrip
                                            AND CONVERT(DATE, t3.invdte) =
                                                CONVERT(DATE, t.invdte)
                                         ) < 2) query2
                         ON query1.custno = query2.custno
                            AND query1.descrip = query2.descrip
                            AND query1.itemkey2 = query2.itemkey2
                WHERE  query1.descrip = A.descrip  and query1.all_qtyshp > 0 and query2.total_qtyshp > 0
                GROUP  BY query1.descrip)   AS sales_qty_30days,

               (SELECT Sum(query1.all_qtyshp - query2.total_qtyshp)
                FROM   (SELECT [custno],
                               descrip,
                               itemkey2,
                               Sum(qtyshp) AS all_qtyshp
                        FROM   artran10c
                        WHERE  descrip = A.descrip
                               AND descrip NOT IN ( 'SHIP', 'CALENDAR',
                                                    'BROCHURE' )
                               AND itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                         
                               AND CONVERT(DATE, invdte) BETWEEN
                                   a.fristb AND a.fristb + 60
                        GROUP  BY [custno],
                                  descrip,
                                  itemkey2
                        HAVING Count(custno) > 1) query1
                       JOIN (SELECT t.custno,
                                    t.itemkey2,
                                    t.descrip,
                                    Sum(t.qtyshp) AS total_qtyshp
                             FROM   artran10c t
                                    INNER JOIN (SELECT custno,
                                                       Min(invdte) AS min_invdte
                                                FROM   artran10c
                                                WHERE  descrip = A.descrip
                                                   
                                                GROUP  BY custno
                                                HAVING Count(custno) > 1) t2
                                            ON t.custno = t2.custno
                                               AND t.invdte = t2.min_invdte
                             WHERE  t.descrip = A.descrip
                             GROUP  BY t.custno,
                                       t.itemkey2,
                                       t.descrip,
                                       CONVERT(DATE, t.invdte)
                             HAVING (SELECT Count(*)
                                     FROM   artran10c t3
                                     WHERE  t3.custno = t.custno
                                            AND t3.itemkey2 = t.itemkey2
                                            AND t3.descrip = t.descrip
                                            AND CONVERT(DATE, t3.invdte) =
                                                CONVERT(DATE, t.invdte)
                                         ) < 2) query2
                         ON query1.custno = query2.custno
                            AND query1.descrip = query2.descrip
                            AND query1.itemkey2 = query2.itemkey2
                WHERE  query1.descrip = A.descrip  and query1.all_qtyshp > 0 and query2.total_qtyshp > 0
                GROUP  BY query1.descrip)   AS sales_qty_60days,

				 (SELECT Sum(query1.all_qtyshp - query2.total_qtyshp)
                FROM   (SELECT [custno],
                               descrip,
                               itemkey2,
                               Sum(qtyshp) AS all_qtyshp
                        FROM   artran10c
                        WHERE  descrip = A.descrip
                               AND descrip NOT IN ( 'SHIP', 'CALENDAR',
                                                    'BROCHURE' )
                               AND itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                            
                               AND CONVERT(DATE, invdte) BETWEEN
                                   a.fristb  AND a.fristb + 120
                        GROUP  BY [custno],
                                  descrip,
                                  itemkey2
                        HAVING Count(custno) > 1) query1
                       JOIN (SELECT t.custno,
                                    t.itemkey2,
                                    t.descrip,
                                    Sum(t.qtyshp) AS total_qtyshp
                             FROM   artran10c t
                                    INNER JOIN (SELECT custno,
                                                       Min(invdte) AS min_invdte
                                                FROM   artran10c
                                                WHERE  descrip = A.descrip
                                                  
                                                GROUP  BY custno
                                                HAVING Count(custno) > 1) t2
                                            ON t.custno = t2.custno
                                               AND t.invdte = t2.min_invdte
                             WHERE  t.descrip = A.descrip
                             GROUP  BY t.custno,
                                       t.itemkey2,
                                       t.descrip,
                                       CONVERT(DATE, t.invdte)
                             HAVING (SELECT Count(*)
                                     FROM   artran10c t3
                                     WHERE  t3.custno = t.custno
                                            AND t3.itemkey2 = t.itemkey2
                                            AND t3.descrip = t.descrip
                                            AND CONVERT(DATE, t3.invdte) =
                                                CONVERT(DATE, t.invdte)
                                          ) < 2) query2
                         ON query1.custno = query2.custno
                            AND query1.descrip = query2.descrip
                            AND query1.itemkey2 = query2.itemkey2
                WHERE  query1.descrip = A.descrip  and query1.all_qtyshp > 0 and query2.total_qtyshp > 0
                GROUP  BY query1.descrip)   AS sales_qty_90days,


               (SELECT Sum(query1.all_qtyshp - query2.total_qtyshp)
                FROM   (SELECT [custno],
                               descrip,
                               itemkey2,
                               Sum(qtyshp) AS all_qtyshp
                        FROM   artran10c
                        WHERE  descrip = A.descrip
                               AND descrip NOT IN ( 'SHIP', 'CALENDAR',
                                                    'BROCHURE' )
                               AND itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                           
                        GROUP  BY [custno],
                                  descrip,
                                  itemkey2
                        HAVING Count(custno) > 1) query1
                       JOIN (SELECT t.custno,
                                    t.itemkey2,
                                    t.descrip,
                                    Sum(t.qtyshp) AS total_qtyshp
                             FROM   artran10c t
                                    INNER JOIN (SELECT custno,
                                                       Min(invdte) AS min_invdte
                                                FROM   artran10c
                                                WHERE  descrip = A.descrip
                                                  
                                                GROUP  BY custno
                                                HAVING Count(custno) > 1) t2
                                            ON t.custno = t2.custno
                                               AND t.invdte = t2.min_invdte
                             WHERE  t.descrip = A.descrip
                             GROUP  BY t.custno,
                                       t.itemkey2,
                                       t.descrip,
                                       CONVERT(DATE, t.invdte)
                             HAVING (SELECT Count(*)
                                     FROM   artran10c t3
                                     WHERE  t3.custno = t.custno
                                            AND t3.itemkey2 = t.itemkey2
                                            AND t3.descrip = t.descrip
                                            AND CONVERT(DATE, t3.invdte) =
                                                CONVERT(DATE, t.invdte)
                                      ) < 2) query2
                         ON query1.custno = query2.custno
                            AND query1.descrip = query2.descrip
                            AND query1.itemkey2 = query2.itemkey2
                WHERE  query1.descrip = A.descrip   and query1.all_qtyshp > 0 and query2.total_qtyshp > 0
                GROUP  BY query1.descrip)   AS total_qty_difference

        FROM   (SELECT A.descrip,
                       (SELECT Min(recdate)
                        FROM   potran10c
                        WHERE  descrip = a.descrip
                        HAVING Max(reqdate) = Min(reqdate)) AS fristb
                FROM   artran10c A
                       INNER JOIN potran10c P
                               ON A.descrip = P.descrip
                WHERE  A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
                       AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                GROUP  BY A.descrip
                HAVING Min(p.recdate) >= Dateadd(day, -120, Getdate())) A
        WHERE  a.fristb IS NOT NULL) b
WHERE  cost <= price
ORDER  BY qtyshp DESC 