var config = {};

config.debug = process.env.DEBUG || false;

config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || '/#';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '192.168.1.1'; //'m20.cloudmqtt.com';
config.mqtt.port      = process.env.MQTT_PORT      || 1883; // 10852;
config.mqtt.username  = process.env.MQTT_USERNAME  || "box01"; //"cedprdzm";
config.mqtt.password  = process.env.MQTT_PASSWORD  || "1380bis"; //"r4z4KoSZrCrk";

config.db = {};
config.db.hostname  = 'localhost';
config.db.port      = 28015;
config.db.dbname    = 'mqtt';
config.db.tablename = 'topics';

module.exports = config;