const express = require('express');
var app = express();

const router = express.Router();
const sql = require('mssql');
let mssql = require('../mssql-connection-pooling');

var cors = require('cors');
app.use(cors());
const configServer30 = require('../sqlServer30');
const utils = require('../data/utils');

router.get('/', async (req, res) => {
  try {
    const sqlPool2 = await mssql.GetCreateIfNotExistPool(configServer30);
    let request2 = new sql.Request(sqlPool2);
    const loadQ = await utils.loadSqlQueries('events');
    const mainInfoQuery = await loadQ.growthplan.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const result2 = await request2.query(mainInfoQuery);
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
        res.send(result);
      } else {
        res.status(404).send('Object not found');
      }
    } else {
      res.send(mergedResults);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
