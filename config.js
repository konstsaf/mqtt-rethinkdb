var config = {};

config.debug = process.env.DEBUG || false;

config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || '/#';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '192.168.1.1'; //
config.mqtt.port      = process.env.MQTT_PORT      || 1883; // 
config.mqtt.username  = process.env.MQTT_USERNAME  || "box01"; //
config.mqtt.password  = process.env.MQTT_PASSWORD  || "1380bis"; //

config.db = {};
config.db.hostname  = 'localhost';
config.db.port      = 28015;
config.db.dbname    = 'mqtt';
config.db.tablename = 'topics';

module.exports = config;
