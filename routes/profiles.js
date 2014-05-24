var hasFixtures = false;

exports.fixtures = function(req, res) {
    if (hasFixtures === false) {
        hasFixtures = true;
        var profiles = [{id: 1, name: "John", city: "Austin", tags: "{web,design}"}, {id: 2, name: "Param", city: "Austin", tags: "{hardware,design}"},{id: 3, name: "Matt", city: "Austin", tags: "{web,hardware,nonprofits}"}, {id: 4, name: "Belinda", city: "Austin", tags: "{nonprofits}"}];
        console.log("Adding fixtures to DB");
        for (var i = 0; i < profiles.length; i++) {    
            var query = connection.query('INSERT INTO profiles SET ?', profiles[i], function(err, result) {
                // Take care of errors, etc.
            });
            console.log(query.sql);
        }
        res.send([{result: "Added fixtures"}]);
    }
    res.send([{result: "Already Added Fixtures"}]);
};

exports.findAll = function(req, res) {
    connection.query('SELECT * FROM profiles', function (err, rows ) {
        if (err) {
            console.error('error exports.findAll: ' + err.stack);
            return;
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    });
};

exports.findByTags = function(req, res) {
    connection.query("SELECT * FROM profiles WHERE `tags` LIKE ?", '%' + req.params.tag + '%', function (err, rows) {
        if (err) {
            console.error('error exports.findByTags: ' + err.stack);
            return;
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    });
};

exports.findByName = function(req, res) {
    connection.query('SELECT * FROM profiles WHERE name=?', req.params.name, function (err, rows) {
        if (err) {
            console.error('error exports.findByName: ' + err.stack);
            return;
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    });
};
