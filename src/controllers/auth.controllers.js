const { response } = require('express');
const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt.helper');





////////////////////////////////////////////////////////////////////////


const login = async(req, res = response) => {

    const { No_control, password } = req.body;


    console.log(req.body);

    try {

        const user = await User.findOne({ No_control })


        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'Username inválido.'
            })
        }



        if (!password) {
            return res.status(404).json({
                status: false,
                message: 'Contraseña inválida.'
            });
        }


        const body ={

            name: user.name,
            No_control: user.No_control,
            major: user.major
        }

        const entrada = new Entrada(body)
        console.log(entrada);

        entrada.save()

        const accessToken = await generarJWT(user.id);


        res.status(200).json({
            accessToken,
            status: true,
            user,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        })
    }
    
}


const register = async(req, res = response) => {

    const body = req.body;

    const newUser = new User(body);

    await newUser.save();


    res.json({
        status: true,
        newUser,
    })
}


const renewJWT = async(req, res = response) => {

    const id = req.id
    const accessToken = await generarJWT(id)
    const user = await User.findById(id)


    res.json({
        accessToken,
        status: true,
        user,
    })
}





module.exports = {
    login,
    renewJWT,
    register
}
