// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax - formats "?" better: ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
};

// ORM Object with MySQL methods
// =============================
var orm = {

    // EXAMPLE METHOD
    selectOne: (tableName, id, cb) => {
        var queryString = "SELECT * FROM " + tableName + " WHERE id = " + id;
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },

    selectLuchador: (tableName, uid, cb) => {
        var queryString = "SELECT * FROM " + tableName + " WHERE token = " + uid;
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },

    selectOpponents: (tableName, dlow, dhigh, cb) => {
        var queryString = "SELECT char_name, id, lvl, fame, wins, losses, profile_pic FROM " + tableName + " WHERE fame BETWEEN " + dlow + " and " +dhigh;
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },

    selectSingleOpponent: (tableName, id, cb) => {
        var queryString = "SELECT * FROM " + tableName + " WHERE id = " + id;
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },

    updateExpFame: (tableName, fame, exp, id, cb) => {
        var queryString = "UPDATE " + tableName + " SET ? WHERE id = " + id;
        connection.query(queryString, {fame: fame, exp: exp}, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },

    levelUp: (tableName, lvl, hp, exp, tickets_max, id, cb) => {
        var queryString = "UPDATE " + tableName + " SET ? WHERE id = " + id;
        connection.query(queryString, {lvl: lvl, hp: hp, exp: exp, tickets: tickets_max, tickets_max: tickets_max}, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },

    //Create/Connect account to SQL DB
    //====================================
    insertOne: (id, created, last_login, char_name, cb) => {
        var queryString = "INSERT INTO players (id, created, last_login, char_name) VALUES ?";
        connection.query(queryString, [id, created, last_login, char_name], function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },

    //last login time update test method
    //=================================
    updateOne: (tableName, id, cb) => {
        var queryString = "UPDATE last_login " + tableName + " WHERE id = " + id;
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },

};
// =============================

// Export the orm object
module.exports = orm;