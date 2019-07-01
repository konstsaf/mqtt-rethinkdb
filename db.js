"use strict";
var r        = require('rethinkdb');
var async    = require('async');
var config   = require('./config');

class rdb {
    setupDb() {
        var self = this;
        async.waterfall([
          function(callback) {
            self.connectToRethinkDbServer(function(err,connection) {
              if(err) {
                return callback(true,"Error in connecting RethinkDB");
              }
              callback(null,connection);
            });
          },
          function(connection,callback) {
            r.dbCreate(config.db.dbname).run(connection,function(err, result) {
              if(err) {
                console.log("Database already created");
              } else {
                console.log("Created new database");
              }
              callback(null,connection);
            });
          },
          function(connection,callback) {
            r.db(config.db.dbname).tableCreate(config.db.tablename).run(connection,function(err,result) {
              connection.close();
              if(err) {
                console.log("table already created");
              } else {
                console.log("Created new table");
              }
              callback(null,"Database is setup successfully");
            });
          }
        ],function(err,data) {
          console.log(data);
        });
      }
    
      connectToRethinkDbServer(callback) {
        r.connect({
          host : config.db.hostname,
          port : config.db.port
        }, function(err,connection) {
          callback(err,connection);
        });
      }
    
      connectToDb(callback) {
        r.connect({
          host : config.db.hostname,
          port : config.db.port,
          db : config.db.dbname
        }, function(err,connection) {
          callback(err,connection);
        });
      }

      insertMessage(message, callback) {
          this.connectToDb(function(err,connection){
              r.table(config.db.tablename).insert([
                  {
                      topic: message.topic,
                      when:  message.when,
                      value: message.message
                  }
              ]).run(connection, function(err, result){
                  connection.close();
                  if(err){
                    return callback(true,"Error happens while adding new mqtt message");
                  }
                  callback(null,result);
              })
          });
      }
}
module.exports = rdb;