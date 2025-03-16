const User = require('../models/user');
const Message = require('../models/message');

const userConected = async ( uid = '' ) => {

    const usuario  = await User.findById( uid );
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const userDisconnected = async ( uid = '' ) => {
    const usuario  = await User.findById( uid );
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const saveMessage = async( payload ) => {

    try {
        const mensaje = new Message( payload );
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }

}

module.exports = {
    userConected,
    userDisconnected,
    saveMessage
}


