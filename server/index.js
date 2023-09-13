var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');

const credentials = require('./middleware/credentials');


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


const bodyParser = require('body-parser'); 
const eventRoutes = require('./routes/eventRoutes');
const configServer2 = require('./sqlServer2');
let mssql = require('./mssql-connection-pooling');
const utils = require('./data/utils');
const sql = require('mssql');




const receiveEvent = require('./routes/receiveRoutes');
const receiveConP = require('./routes/receiveControlpanel');
const vendorEvent = require('./routes/vendorInfoRoutes');
const openOrders = require('./routes/openOrdersRoutes');
const productsMain = require('./routes/productsMainRoutes');
const productsMainRB = require('./routes/productsMainRBRoutes');
const newLaunchEvent = require('./routes/newLaunchRoute');
const scheduleEvent = require('./routes/scheduleRotue');
const growthplanEven = require('./routes/growthplanRotue');




app.use('/api', eventRoutes.routes);

app.use('/receiveconpanel', receiveConP);
app.use('/vendorinfo', vendorEvent);
app.use('/openorders', openOrders);
app.use('/productsMain', productsMain);
app.use('/productsMainRB', productsMainRB);
app.use('/newlaunch', newLaunchEvent);
app.use('/schedule', scheduleEvent);
app.use('/growthplan', growthplanEven);



app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));


app.use('/receive', receiveEvent);

app.get('/servertwo', async (req, res) => {
  try {

    const sqlPool2 = await mssql.GetCreateIfNotExistPool(configServer2);
    let request2 = new sql.Request(sqlPool2);
    const loadQ = await utils.loadSqlQueries('events');
    const mainInfoQuery = await loadQ.salesmanTrip.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const result2 = await request2.query(mainInfoQuery);
    const mergedResults = [...result2.recordset];
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

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});


app.listen(8086, () => {
  console.log('app listening on url http://localhost:' + 8086);
});
