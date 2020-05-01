const express = require('express');
const app = express()


var cors = require('cors');
app.use(cors());
const { spawn } = require('child_process');

const multer = require('multer')

var router = express.Router();

// require the body-parser
const bodyParser = require('body-parser')
//app.use(bodyParser.urlencoded({extended: false}));

//app.listen(5000 || 8100 , () => console.log('Example app listening on port 5000!'))

//app.listen( 5000,"10.3.14.214", () => console.log('Example app listening to ipv4 address!'))
app.listen(5000, () => console.log('Example app listening on port 5000!'))
//app.listen(5000, "192.168.1.84", () => console.log('Example app listening to ipv4 address!'))
//app.listen(5000, "172.20.10.12", () => console.log('Example app listening to ipv4 address!'))
app.listen(5000, "192.168.1.127", () => console.log('Example app listening to ipv4 address!'))
app.listen(8100, () => console.log('Example app listening on port 8100!'))
app.listen(8101, () => console.log('Example app listening on port 8101!'))
// app.listen( 8100 , () => console.log('Example app listening on port 8100!'))

app.get('/', (req, res) => {
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['script1.py']);
  // collect data from script

  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend)
  });

})


const storage = multer.diskStorage({
  destination: (req,file,callBack)=>{
    callBack(null,'uploads')
  },
  filename:(req,file,callBack) => {
    callBack(null,`${file.originalname}`)
  }
})

var upload = multer({storage:storage})


app.post('/file', upload.single('file'),async(req,res,next)=> {
  const file = req.file
  console.log(file.filename); 
  var spawn = require("child_process").spawn; 
  path = "C:\\Users\\Phyu\\backend-setup\\uploads\\" + file.filename ; 
  console.log(path)
  var process = spawn('python',["./data_analysis.py",path] ); 

  if(!file)
  {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

     process.stdout.on('data', function(data) { 
        return res.json(data.toString()); 
    } );
})



app.post('/name', callName);

function callName(req, res) {
  // Use child_process.spawn method from  
    // child_process module and assign it 
    // to variable spawn 
    var spawn = require("child_process").spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',["./hello.py", 
                            req.query.firstname, 
                            req.query.lastname] ); 
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } ) 
  }
app.post('/getData', (req, res) => {
 // Use child_process.spawn method from  
    // child_process module and assign it 
    // to variable spawn 
    var spawn = require("child_process").spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',["./data_analysis.py"] ); 
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } );

    
     
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



var test = ''; var code = ''; var cat = ''; var cost = ''; var time;

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


app.post('/OnHandLoadedCostByTimeStamp', bodyParser.json(), function (req, res) {


  console.log("This is insided onhand loaded cost by timestamp" + req);
  test = req.body.newVal;
  time =  req.body.time;

  console.log(test)
  console.log(time)

  OnHandLoadedCostByTimeStamp(test,time, function (recordset) { res.send(recordset); });

});

app.post('/insertonHandData', bodyParser.json(), function (req, res) {


  var code = req.body.SKU_CodeonHand;
  var quan = req.body.onHandQuantity;
  var month = req.body.month;
  console.log(code)
  console.log(quan)
  console.log(month)
  InsertonHandData(code, quan,month, function (recordset) { res.send(recordset); });

});

app.post('/OnhandMonthEndCpps2', bodyParser.json(), function (req, res) {


  let WarehouseID = req.body.WarehouseID;
  let ItemID = req.body.ItemID;
  let SKU_CodeonHand = req.body.SKU_CodeonHand;
 // let SKU_NameonHand = req.body.SKU_NameonHand;
  let month = req.body.month ; 
  let onHandQuantity = req.body.onHandQuantity
  console.log(WarehouseID)
  console.log(ItemID)
  console.log(SKU_CodeonHand)
  console.log(month)
  console.log(onHandQuantity)
  OnhandMonthEndCpps2(WarehouseID,ItemID, SKU_CodeonHand,onHandQuantity,month, function (recordset) { res.send(recordset); });

});



app.post('/getCategoryIDcpps2',bodyParser.json(), function (req, res) {
  
  let cat = req.body.SKU_Cat

  getCategorycpps2(cat,function (recordset) {
    res.send(recordset);

  });



});

app.post('/getItemIDCpps',bodyParser.json(), function (req, res) {
  
  let SKU_Code = req.body.SKU_Code

  getItemIDCpps(SKU_Code,function (recordset) {
    console.log(recordset);
    res.send(recordset);

  });



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

app.post('/insertDatacpps2', bodyParser.json(), function (req, res) {


  console.log(req);
  let ItemID = req.body.ItemID;
  let  ItemName = req.body.ItemName;
  let ShortName = req.body.ShortName;
  let CategoryID = req.body.CategoryID;


  console.log(ItemID)
  console.log(ItemName)
  console.log(ShortName);
  console.log(CategoryID);

  insertDatacpps2(ItemID, ItemName, ShortName,CategoryID, function (recordset) { res.send(recordset); })

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


// function OnHandLoadedCost(cat, callback) {

//   console.log(cat);
//   var time = 2018 - 01 - 12; //Change later

//   var sql = require('mssql');
//   var config = {
//     user: 'sa',
//     password: 'sa1234',
//     database: 'Inventory',
//     server: 'DESKTOP-CCDK3QN'

//   };

//   var connection = new sql.ConnectionPool(config, function (err) {

//     //check for errors by inspecting the err parameter
//     if (err) console.log(err);

//     var request = new sql.Request(connection);
//     request.query("Select *, UnitCost*LoadedCombinedData.onHand As totalOnHand from LoadedData Inner Join LoadedCombinedData On LoadedData.SKUcode = LoadedCombinedData.SKUcode where LoadedData.Category = '" + cat + "'", function (err, recordset) {
//       if (err) console.log(err);
//       callback(recordset);
//     });
//   });

// }

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
    request.query("Select SUM(UnitCost*LoadedCombinedData.onHand) As totalOnHand,LoadedCombinedData.Monthly from LoadedData Inner Join LoadedCombinedData On LoadedData.SKUcode = LoadedCombinedData.SKUcode where LoadedData.Category = '" + cat + "'" + "Group by LoadedCombinedData.Monthly", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}


function OnHandLoadedCostByTimeStamp(cat,time, callback) {

  console.log(cat)
  console.log(time)

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
    request.query("Select SUM(UnitCost*LoadedCombinedData.onHand) As totalOnHand,LoadedCombinedData.Monthly from LoadedData Inner Join LoadedCombinedData On LoadedData.SKUcode = LoadedCombinedData.SKUcode where LoadedData.Category = '" + cat + "'" + "AND  DATEDIFF(MONTH, LoadedCombinedData.Monthly, (SELECT MAX (Monthly) FROM LoadedCombinedData)) <"+ time + "Group by LoadedCombinedData.Monthly", function (err, recordset) {
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




function getCategorycpps2(cat,callback) {

  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'cpps2',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query("Select CategoryID from Inventory.FullCategoryList Where CategoryName = '" +cat +"'", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}

function getItemIDCpps(cat,callback) {

  console.log(cat);
  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'cpps2',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query("Select ItemID from Inventory.FullItemList where ItemName = '" +cat +"'", function (err, recordset) {
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



function insertDatacpps2(ItemID,ItemName,ShortName,CategoryID , callback) {

  console.log(code);
  var time = 2018 - 01 - 12; //Change later

  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'cpps2',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query("Insert into Inventory.FullItemList(ItemID,ItemName,ShortName,CategoryID) Values (" + ItemID + ",'" + ItemName + "','" + ShortName + "',"+ CategoryID + ")", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}



function InsertonHandData(codeonHand, onHandQuantity,month, callback) {


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
    request.query("Insert into LoadedCombinedData(SKUcode,Monthly,onHand) Values	('" + codeonHand + "','" + month +"',"+ onHandQuantity + ")", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}

function OnhandMonthEndCpps2(WarehouseID, ItemID,ItemName,OnhandQty,Month, callback) {

  console.log(code);
  var time = 2018 - 01 - 12; //Change later

  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'cpps2',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function (err) {

    //check for errors by inspecting the err parameter
    if (err) console.log(err);

    var request = new sql.Request(connection);
    request.query("Insert into Inventory.OnhandMonthEnd(WarehouseID,ItemID,ItemName,Month,OnhandQty) Values(" + WarehouseID + "," +ItemID +",'" + ItemName +"','"+ Month + "',"+ OnhandQty + ")", function (err, recordset) {
      if (err) console.log(err);
      callback(recordset);
    });
  });

}

module.exports = router





