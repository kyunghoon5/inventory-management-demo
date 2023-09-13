SELECT vendno, SUM(CASE WHEN recdate IS NULL THEN 1 ELSE 0 END) AS open_orders
FROM (
SELECT DISTINCT TOP (400) [vendno],
(select max(recdate) from potran10c where invno = a.invno and recdate is null ) as recdate,
[reqdate],
[shpdate],
(select max(purdate) from potran10c where invno = a.invno ) as purdate,
[invno]
FROM potran10c A
WHERE invno IS NOT NULL and recdate is null and CONVERT(date,reqdate) between GETDATE()-90 and getdate()+9999 and vendno  not in ('')
ORDER BY reqdate DESC, invno desc
) AS subquery
GROUP BY vendno
ORDER BY open_orders DESC,  vendno ASC