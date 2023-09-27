const { Schema, model } = require('mongoose');

const MessageSchema = Schema({


    date:{
        type:String,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required:true
    },
    content:{
        type:String,
        required:true
    }

})

MessageSchema.method('toJSON', function(){
    const { __v, date,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});


module.exports = model( 'Message', MessageSchema );