WITH months
     AS (SELECT 1         AS month,
                'January' AS month_name
         UNION
         SELECT 2,
                'February'
         UNION
         SELECT 3,
                'March'
         UNION
         SELECT 4,
                'April'
         UNION
         SELECT 5,
                'May'
         UNION
         SELECT 6,
                'June'
         UNION
         SELECT 7,
                'July'
         UNION
         SELECT 8,
                'August'
         UNION
         SELECT 9,
                'September'
         UNION
         SELECT 10,
                'October'
         UNION
         SELECT 11,
                'November'
         UNION
         SELECT 12,
                'December')
SELECT B.SalesmanName,
       Year(a.invdte)                                          AS year,
       months.month,
     Sum(invamt-disamt)                           AS qtyshp

FROM   months
       CROSS JOIN (SELECT  SalesmanName, SalesmanID
                   FROM   salesman
               where Active in ('y')             
                  ) B

       LEFT JOIN armast10c A
              ON a.salesmn = b.SalesmanID
                 AND Month(a.invdte) = months.month
                 AND CONVERT(DATE, A.invdte) BETWEEN
                      DATEADD(yy,-1,DATEADD(yy,DATEDIFF(yy,0,GETDATE()),0))  AND
                     Getdate()
GROUP  BY B.SalesmanName,
          Year(a.invdte),
          months.month

ORDER  BY B.SalesmanName ASC,
          year DESC,
          months.month ASC