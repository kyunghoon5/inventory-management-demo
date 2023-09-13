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

  const searchAutoQuery = await loadQ.vendorinfo.replace(
    '${req.query.descrip}',
    req.query.descrip
  );
  const result2 = await request2.query(searchAutoQuery);
  //trim
  const mergedResults = [...result2.recordset].map((row) => {
    const trimmedRow = {};
    for (const [key, value] of Object.entries(row)) {
      trimmedRow[key] = typeof value === 'string' ? value.trim() : value;
    }
    return trimmedRow;
  });

  if (req.query.descrip) {
    const descrips = req.query.descrip;
    const result = mergedResults.filter(
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
    res.send(mergedResults);
  }
});

module.exports = router;
