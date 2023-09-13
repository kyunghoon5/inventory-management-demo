SELECT DISTINCT TOP (400) [vendno],
(select max(recdate) from potran10c where invno = a.invno ) as recdate,
[reqdate],
[shpdate],
(select max(purdate) from potran10c where invno = a.invno ) as purdate,
[invno]


FROM potran10c A
WHERE (invno IS NOT NULL and vendno not in ('') )




ORDER BY reqdate DESC, invno desc