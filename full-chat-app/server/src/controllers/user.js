const { response } = require('express');
const Usuario = require('../models/user');

const getUsers = async ( req, res = response ) => {

    const from = Number( req.query.from ) || 0;

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(from)
        .limit(20)

    
    res.json({
        ok: true,
        usuarios,
    })
}



module.exports = {
    getUsers
}