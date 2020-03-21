var express = require('express');
var router = express.Router();

/* GET home page. */
//
router.get('/', function(req, res, next) {

  GetData(function(recordset)
  {
    res.render('index', { products: recordset });
    console.log(recordset);
  });
 //another function
});

// get username
// update username
// delete user


function GetData(callback)
{
  var sql = require('mssql');
  var config = {
    user: 'sa',
    password: 'sa1234',
    database: 'Inventory',
    server: 'DESKTOP-CCDK3QN'

  };

  var connection = new sql.ConnectionPool(config, function(err)
  {
  
     //check for errors by inspecting the err parameter
     if (err) console.log(err);

     var request = new sql.Request(connection);
     request.query('select * from PartMaster',function(err,recordset)
     {
      if (err) console.log(err);
       callback(recordset);
     });
  });

}


module.exports = router;
