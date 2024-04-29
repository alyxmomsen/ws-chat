
const express = require('express') ;
const dotenv = require('dotenv') ;
dotenv.config();
const WebSocket = require ('ws') ;
const jwt = require('jsonwebtoken');

const http_port = process.env.HTTP_PORT || 3001 ;
const ws_port = process.env.WS_PORT || 9001 ;

const app = new express();

app.listen(http_port , () => {
    console.log('http server runnig on port: ' + http_port);
})

// ======================================================

const wsServer = new WebSocket.Server({ port:ws_port });

wsServer.on("connection" , (wsClient) => {

    console.log('web socket connected on port: ' + ws_port);

    wsClient.onmessage = (message) => {

        const auth = message.data.auth ;
        const messageData = JSON.parse(message.data) ;

        console.log(messageData);

        const data = {
            payload:{
                author:auth ,
                message:messageData.payload.message ,
            } ,
            status:true ,
        }

        wsClient.send(JSON.stringify(data));
    }

    const data = {
        payload:{
            message:'connection is successful! Welcomen to the CHAT' ,
        } , 
        status:true ,
    }

    wsClient.send(JSON.stringify(data)) ;
}) ;



