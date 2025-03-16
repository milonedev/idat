const { response } = require('express');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res= response) => {
    const {email, password, name} = req.body;

    try {
        const emailExist = await User.findOne({ email:email })

        if (emailExist) {
            return res.status(400).json({ok:false, msg: 'The user is exist.'})
        }

        const user = new User(req.body)
        console.log(user);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // console.log('1', user)
        await user.save();

        const token = await generarJWT(user.id);

        const userinfo = {};
        userinfo.name = user.name;
        userinfo.id = user.id;
        userinfo.online = user.online;
        // console.log('token', token)
        return res.status(200).json({
            ok: true,
            userinfo,
            token
        })
    } catch (error) {
        console.log('error:', error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario.'
        })
    }
}

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuarioDB = await User.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }


        // Generar el JWT
        const token = await generarJWT( usuarioDB.id );
        
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const renewToken = async( req, res = response) => {

    const uid = req.uid;

    // generar un nuevo JWT, generarJWT... uid...
    const token = await generarJWT( uid );

    // Obtener el usuario por el UID, Usuario.findById... 
    const usuario = await User.findById( uid );

    res.json({
        ok: true,
        usuario,
        token
    });

}


module.exports = {
    createUser,
    login,
    renewToken
}
