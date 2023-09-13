const express = require('express');
var app = express();

const router = express.Router();

const sql = require('mssql');
let mssql = require('../mssql-connection-pooling');

var cors = require('cors');
app.use(cors());
var _ = require('lodash');

// Configuration for the two SQL servers

// const configServer2 = require('../sqlServer2');
// const utils = require('../data/utils');

const configServer30 = require('../sqlServer30');
const utils = require('../data/utils');

router.get('/', async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const loadQ = await utils.loadSqlQueries('events');
  // Connect to both servers
  // const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);
  // let request1 = new sql.Request(sqlPool);

  const sqlPool2 = await mssql.GetCreateIfNotExistPool(configServer30);
  let request2 = new sql.Request(sqlPool2);

  const searchAutoQuery = await loadQ.productsMain.replace(
    '${req.query.descrip}',
    req.query.descrip
  );
  const result2 = await request2.query(searchAutoQuery);

  const productsMainQuery2 = await loadQ.productsWeekDiff
    .replace(/\${req\.query\.descrip}/g, req.query.descrip || '')
    .replace(/\${endDate}/g, req.query.endDate || '');

  const result21 = await request2.query(productsMainQuery2);

    // const searchAutoQuery3 = await loadQ.productsTarget.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result22 = await request2.query(searchAutoQuery3);


  //trim
  const mergedResults = [...result2.recordset];

  const mergeArrays = (arr1, arr2,arr3) => {
    return arr1.map((obj) => {
      const numbers = arr2.filter(
        (nums) => nums.descrip.trim() === obj.descrip.trim()
      );

          // const numbers2 = arr3.filter(
          //   (nums) => nums.descrip.trim() === obj.descrip.trim()
          // );



      if (!numbers.length) {

        return obj;
      }

      const mergedWowTrend = numbers.reduce((acc, curr) => {
        acc.push(curr.wowTrend);
        return acc;
      }, []);

      const mergedWowTrendNumber = mergedWowTrend.reduce(
        (acc, curr) => acc + curr,
        0
      );

        // const mergedTarget = numbers2.reduce((acc, curr) => {
        //   acc.push(curr.target_qtyshp);
        //   return acc;
        // }, []);
  


      // const mergedWowTrendString = mergedWowTrend.join(', ');
      return {
        ...obj,
        wowTrend: mergedWowTrendNumber,
        // target_qtyshp: mergedTarget
     
      };
    });
  };

  const mergedResultsWithMergedWowTrend = mergeArrays(
    mergedResults,
    result21.recordset,
    // result22.recordset
  );

  if (req.query.descrip) {
    const descrips = req.query.descrip;
    const result = mergedResultsWithMergedWowTrend.filter(
      (obj) => obj.descrip?.trim().toLowerCase() === descrips
    );

    if (result) {
      // Return the matching object to the client
      res.send(result);
    } else {
      // If no object with the specified ID is found, return a 404 error
      res.status(404).send('Object not found');
    }
  } else {
    // If no eventId query parameter is provided, return the merged results array
    res.send(mergedResultsWithMergedWowTrend);
  }
});

module.exports = router;
