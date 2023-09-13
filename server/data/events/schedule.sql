select

Dense_rank()
       OVER (
       ORDER BY t.invno)                                            AS
       number,
t.invno,
t.vendno,
t.purno,
t.descrip,
t.purdate,
t.shpdate,
t.reqdate,
t.recdate,
sum(t.qtyord) as qtyord,
sum(t.amount) as amount,
t.newitem,
t.weight,
sum(t.qtyord) / t.weight as ctns

from

(SELECT Dense_rank()
         OVER (
           ORDER BY p.descrip)                                            AS
       number,
       p.invno,
	p.vendno,
       p.purno,
       p.descrip,
       p.itemkey2,
       CONVERT(VARCHAR(10), Min(shpdate), 101)                            AS
       shpdate,
       CONVERT(VARCHAR(10), Min(purdate), 101)                            AS
       purdate,
       CONVERT(VARCHAR(10), Min(reqdate), 101)                            AS
       reqdate,     
	   CONVERT(VARCHAR(10), Min(recdate), 101)                            AS
       recdate,    
       Sum(p.qtyord)                                                      AS
       qtyord,
       cost,
       sum(p.qtyord) * cost as amount,
       (SELECT CASE
                 WHEN Max(reqdate) = Min(reqdate)
                       OR ( Max(recdate) IS NULL
                            AND Min(recdate) IS NULL ) THEN 'new'
                 ELSE ''
               END AS newitem
        FROM   potran10c
        WHERE  descrip = p.descrip)                                       AS
       newitem,
       (SELECT weight
        FROM   arinvt10
        WHERE  itemkey2 = p.itemkey2
               AND descrip = p.descrip)                                   AS
       weight
   
FROM   potran10c AS p
WHERE  CONVERT(date,reqdate) between getdate()-4 and getdate()+30
       AND NOT purno = '' and not descrip ='CARTON BOX' and not descrip ='TAPE'
GROUP  BY p.invno,
          p.descrip,
          p.itemkey2,
          p.vendno,
          p.purno,
		  p.cost) t

group by t.descrip,t.invno,t.vendno,
          t.purno, t.newitem,t.weight,t.purdate,t.reqdate,t.recdate,t.shpdate	 
ORDER  BY t.reqdate asc
       
