const con= require("../../public/script/databaseConnection");
con.connect(function(err) {
    sql="select * from Roles";
    if (err) throw err;
         con.query(sql, function (err, result, fields) {
          if (err) throw err;
           console.log(result);
        });

});



