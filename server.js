var express = require('express'),
        profiles = require('./routes/profiles');
 
var app = express();
 
mysql      = require('mysql');
connection = mysql.createConnection({
      host     : 'lotus-server-db.cotssczuecoi.us-west-2.rds.amazonaws.com',
      port     : '3306',
      user     : 'lotus_admin',
      password : 'R9hd2n6Fpb8uPz6x',
      database : 'lotus'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

// Create SQL tables if necessary
connection.query('SELECT * FROM profiles', function (err, rows ) {
    if (err) {
        console.error('init error: ' + err.stack);
        connection.query(
            'CREATE TABLE profiles( id int, name varchar(255), city varchar(255), tags varchar(1023))', function (err, rows ) { 
                if (err) {
                    console.error('create table error: ' + err.stack);
                }
            });
        return;
    }
});


app.configure(function () {
        app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
            app.use(express.bodyParser());
});

app.get('/profiles', profiles.findAll);
app.get('/profiles/fixtures', profiles.fixtures);
app.get('/profiles/s/n/:name', profiles.findByName);
app.get('/profiles/s/t/:tag', profiles.findByTags);
// app.post('/profiles', profiles.addWine);
// app.put('/profiles/:id', profiles.updateWine);
// app.delete('/profiles/:id', profiles.deleteWine);

app.listen(3000);
console.log('Listening on port 3000...');
