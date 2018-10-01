var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');


console.log("new client connected");

var redisClient = redis.createClient(6379, "127.0.0.1");

redisClient.on('connect', function () {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

redisClient.get('message', function (error, result) {
    if (error) 
    {
        console.log(error);
        throw error;
    }
    console.log('GET result ->' + result);
});

redisClient.subscribe('message');

//127.0.0.1:6379> publish message "I made it"
redisClient.on("message", function (channel, message) {
    console.log(`
        MSG : ${message},
        channel: ${channel}
    
    `);
    
});



