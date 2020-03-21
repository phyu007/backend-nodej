const express = require('express');
const app = express()


var cors = require('cors');
app.use(cors());




var router = express.Router();

// require the body-parser
const bodyParser = require('body-parser')
//app.use(bodyParser.urlencoded({extended: false}));

//app.listen(5000 || 8100 , () => console.log('Example app listening on port 5000!'))

app.listen( 5000,"10.3.14.214", () => console.log('Example app listening to ipv4 address!'))
app.listen(5000, () => console.log('Example app listening on port 5000!'))
//app.listen(5000, "192.168.1.84", () => console.log('Example app listening to ipv4 address!'))

app.listen(8100, () => console.log('Example app listening on port 8100!'))
app.listen(8101, () => console.log('Example app listening on port 8101!'))
// app.listen( 8100 , () => console.log('Example app listening on port 8100!'))

app.get('/', (req, res) => {
  res.send('Testing from backend')
})


app.get('/getData', (req, res) => {
  res.json({ 'message': 'Hello World' })
})

app.post('/postData', bodyParser.json(), (req, res) => {
  res.json(req.body.firstName + "this comes from backend")
})

/* GET users listing. */
app.post('/', (req, res) => {

  GetData(function (recordset) {
    res.send(recordset);

  });



});

app.post('/demand', (req, res) => {


  DemandForecast(function (recordset) {
    res.send(recordset);

  });



});



var test = ''; var code = ''; var cat = ''; var cost = '';

// app.post('/OnHandCost', bodyParser.json(), function(req, res){


//   console.log(req);
// test = req.body.newVal;

// console.log(test)

//  OnHandCost( test,function (recordset) { res.send(recordset); });

// });



app.post('/OnHandLoadedCost', bodyParser.json(), function (req, res) {


  console.log("This is insided onhand loaded cost" + req);
  test = req.body.newVal;

  console.log(test)

  OnHandLoadedCost(test, function (recordset) { res.send(recordset); });

});

app.post('/insertonHandData', bodyParser.json(), function (req, res) {


  var code = req.body.SKU_CodeonHand;
  var quan = req.body.onHandQuantity;
  console.log(code)
  console.log(quan)

  InsertonHandData(code, quan, function (recordset) { res.send(recordset); });

});



app.post('/insertData', bodyParser.json(), function (req, res) {


  console.log(req);
  code = req.body.SKU_Code;
  cat = req.body.SKU_Cat;
  cost = req.body.SKU_cost;


  console.log(code)
  console.log(cat)
  console.log(cost);


  InsertData(code, cat, cost, function (recordset) { res.send(recordset); });

});

app.post('/getCategory', function (req, res) {

  getCategory(function (recordset) {
    res.send(recordset);

  });



});






function GetData(callback) {
  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'Inventory',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query('select * from PartMaster', function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}


function DemandForecast(callback) {
  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'Inventory',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query("select * from CombinedData", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}

function OnHandCost(cat, callback) {

  console.log(cat);
  var time = 2018 - 01 - 12; //Change later

  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'Inventory',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query("Select *,UnitCost * onHand AS totalOnHand,UnitCost*OpenOrderQuantity As totalOpenOrder  from PartMaster Inner Join CombinedData On PartMaster.SKUcode = CombinedData.SKUcode Where PartMaster.Category = '" + cat + "'", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}


function OnHandLoadedCost(cat, callback) {

  console.log(cat);
  var time = 2018 - 01 - 12; //Change later

  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'Inventory',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query("Select *, UnitCost*LoadedCombinedData.onHand As totalOnHand from LoadedData Inner Join LoadedCombinedData On LoadedData.SKUcode = LoadedCombinedData.SKUcode where LoadedData.Category = '" + cat + "'", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}


function getCategory(callback) {

  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'Inventory',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query("Select DISTINCT Category from UnitCost", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}


function InsertData(code, cate, ucost, callback) {

  console.log(code);
  var time = 2018 - 01 - 12; //Change later

  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'Inventory',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query("Insert into LoadedData(SKUcode,Category,UnitCost) Values ('" + code + "','" + cate + "'," + ucost + ")", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}

function InsertonHandData(codeonHand, onHandQuantity, callback) {

  console.log(code);
  var time = 2018 - 01 - 12; //Change later

  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'Inventory',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query("Insert into LoadedCombinedData(SKUcode,onHand) Values	('" + codeonHand + "'," + onHandQuantity + ")", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}

module.exports = router



