const { response } = require('express');
const OpenAI = require('openai');
const express = require('express');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});



const converse = async (req, res=response) =>{
    
    console.log(req.io);
    try {
        const {question, location} = req.body;
        const instructions = "Eres un experto consultor turistico. Recibiras ubicacion, fecha y hora en formato JSON en cada mensaje, solamente utiliza esa informacion si es pertinente, pero no menciones las coordenadas, responderas de manera casual. Responderas preguntas acerca de lugares turisticos y ofrecerás sugerencias para tener un viaje excelente.";
        console.log({'role': 'User', 'content': question});
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: instructions},
                {"role": "user", "content": JSON.stringify({
                    'location': location,
                    'datetime': Date(),
                    'message': question
                })}],
          });
          console.log(chatCompletion.choices[0].message);
          res.send(chatCompletion.choices[0].message);
    
    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            message: 'Internal Server Error'
        });
    }
}



const consultAi = async (question, location) =>{

    try {
        const instructions = "Eres un experto consultor turistico. Recibiras ubicacion, fecha y hora en formato JSON en cada mensaje, solamente utiliza esa informacion si es pertinente, pero no menciones las coordenadas, responderas de manera casual. Responderas preguntas acerca de lugares turisticos y ofrecerás sugerencias para tener un viaje excelente.";
        console.log({'role': 'User', 'content': question});
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: instructions},
                {"role": "user", "content": JSON.stringify({
                    'location': location,
                    'datetime': Date(),
                    'message': question
                })}],
          });
          console.log(chatCompletion.choices[0].message);
          return({status: true, message: chatCompletion.choices[0].message});
    
    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    converse,
    consultAi
}