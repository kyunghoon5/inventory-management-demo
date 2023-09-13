
  
  select x.SalesmanName, x.start_dte, x.end_dte 
from (
    select SalesmanName, start_dte, end_dte,
        row_number() over (partition by SalesmanName order by start_dte desc) as _rn
    from SalesmanTrip
) x
where x._rn = 1 and salesmanName not in ('danny')
order by start_dte desc
