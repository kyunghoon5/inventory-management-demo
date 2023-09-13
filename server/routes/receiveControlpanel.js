const express = require('express');
var app = express();

const router = express.Router();

const sql = require('mssql');
let mssql = require('../mssql-connection-pooling');

var cors = require('cors');
app.use(cors());
var _ = require('lodash');

// Configuration for the two SQL servers

const configServer2 = require('../sqlServer2');
const utils = require('../data/utils');


router.get('/', async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const loadQ = await utils.loadSqlQueries('events');
  // Connect to both servers
  // const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);
  // let request1 = new sql.Request(sqlPool);


  const sqlPool2 = await mssql.GetCreateIfNotExistPool(configServer2);
  let request2 = new sql.Request(sqlPool2);

  const searchAutoQuery = await loadQ.receiveControlPanel.replace(
    '${req.query.descrip}',
    req.query.descrip
  );
  const result2 = await request2.query(searchAutoQuery);

    const productsMainQuery2 = await loadQ.invoiceInfoByDescrip
    .replace(/\${req\.query\.descrip}/g, req.query.descrip || '')

  const result21 = await request2.query(productsMainQuery2);

  const mergedResults = [...result2.recordset]

const mergeArrays = (arr1, arr2) => {
  return arr1.map((obj) => {
    const numbers = arr2.filter((nums) => nums.invno === obj.invno);

    if (!numbers.length) {
      return obj;
    }
    const mergedWowTrend = numbers.reduce((acc, curr) => {
      acc.push(curr.descrip.trim()); 
      return acc;
    }, []);
    return {
      ...obj,
      invoiceDes: mergedWowTrend,
    };
  });
};

   const mergedResultsWithMergedWowTrend = mergeArrays(
     mergedResults,
     result21.recordset
   );

    // If no eventId query parameter is provided, return the merged results array
    res.send(mergedResultsWithMergedWowTrend);
 
});

module.exports = router;
