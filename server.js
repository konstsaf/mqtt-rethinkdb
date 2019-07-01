/**
 * 
 * This Node.js application listens to MQTT messages and record 
 * it to RethinkDB
 * 
 * @author Konstantin Safronov <konstsaf@gmail.com>
 * @license MIT
 * 
 */

 var r        = require('rethinkdb');
 var mqtt     = require('mqtt');
 var config   = require('./config');
 var db       = require('./db');

var dbModel = new db();

dbModel.setupDb();

 var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
console.log("Connecting to: " + mqttUri);
var client   = mqtt.connect(mqttUri, {
    username:   config.mqtt.username,
    password:   new Buffer.from(config.mqtt.password)
});

client.on('connect', function () {
    console.log("MQTT server connected successfully");
    client.subscribe(config.mqtt.namespace, function (error){
        if(!error){
            console.log("Subscribed successfully to ", config.mqtt.namespace);
        }else{
            console.log("Subscription error: ".error);
        }
    });
});

client.on('message', function (topic, message){
    var messageObject = {
        topic: topic,
        when: Date.now(),
        message: message.toString()
    };
    console.log("New message: '",messageObject.message, "' on topic: ",messageObject.topic)
    
    dbModel.insertMessage(messageObject, function(err, result){
        if(err){
            console.log("Insert error: ", result)
        }else{
            console.log("Inserted: ", result)
        }
    })
})