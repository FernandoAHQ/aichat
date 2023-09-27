const User = require('../models/user');


const userConnected = ( id ) => {

    // const user = await User.findById(id);
    // user.online = true;
    // await user.save();
    // return user;
    return {"hola":"true"}

}


const userDisconnected = ( id ) => {

    // const user = await User.findById(id);
    // user.online = false;
    // await user.save();
    // return user;
    return {"hola":"false"}

}


const newMessage = async( value, from ) => {
    
    return {
        status: true,
        message: value
    }

    

}

  


module.exports = {
    userConnected,
    userDisconnected,
    

}