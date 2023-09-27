const { response } = require('express');
const User = require('../models/user');
const Message = require('../models/message');
const { converse, consultAi } = require('./openai.controllers');




const newMessage = async (req, res=response) =>{

    try {
        const sockets = req.io;
        const {message, user, location} = req.body;
        
        const userExists = await User.findById(user);
        if(!userExists)
            return res.send({
                'status': false,
                'message': 'User not found.'
            });

        if (message.toLowerCase().includes('tucansito')) {
            
            res.send({
                'status': true,
                'message': 'Message sent successfully.'
            });

            sockets.emitMessage(message, userExists.name);

            aiReply = await consultAi(message, location);
            if(aiReply.status) {
                const newMessage = new Message({date: new Date(), user: '6513da19bf97f5f88855ee8c', content: message});
                await newMessage.save();

                sockets.emitMessage(message, 'AI');
            }
        }else{

            const newMessage = new Message({date: new Date(), user: user, content: message});

            await newMessage.save();

            res.send({
                'status': true,
                'message': 'Message sent successfully.'
            });

            sockets.emitMessage(message, userExists.name);
        }

        
    
    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    newMessage
}