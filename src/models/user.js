

const { Schema, model } = require('mongoose');

// Roles validos
// const rolesValidos = {
//     values: ['ADMIN_ROLE', 'USER_ROLE', 'SITE_ROLE'],
//     message: '{VALUE} no es un rol válido'
// }

const UserSchema = Schema({

    password:{
        type: String,
    },
    
    name:{
        type: String,
        required: false

    },
    image:{
        type: String,
        default: "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
    },
    online:{
        type: Boolean,
        default:false
    }

});


UserSchema.method('toJSON', function(){
    const { __v, password,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});



module.exports = model( 'User', UserSchema );

