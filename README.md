# mqtt-rethinkdb
Working example of MQTT client with storing messages to RethinkDB database.
Act as daemon to hold messages into database.

Used as data aquisition part of IoT hobby project.

# Requirements

- Nodejs + npm
- RethinkDB server up and running

# Installation
- Clone repository to local machine
`git https://github.com/konstsaf/mqtt-rethinkdb.git`

- Go to `mqtt-rethinkdb` folder
- Install dependances
```
npm install --save
```
- Modify to have yours MQTT server connection parameters
- Start MQTT messages aquisition
```
node server.js
```
# ToDo list
- [x] Setup defined MQTT server connection and topic subscribtion by template
- [x] Database setup
- [x] Insert MQTT messages to database
- [ ] Circular databese with TTL
- [ ] Individual subscription for MQTT topics
- [ ] Individual TTL by MQTT message topics

