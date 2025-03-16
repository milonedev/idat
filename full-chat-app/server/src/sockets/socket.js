const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { userConected, userDisconnected, saveMessage } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) =>  {
    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] )

    // Verificar autenticación
    if ( !valido ) { return client.disconnect(); }
    
    // Cliente autenticado
    userConected( uid );

    // Ingresar al usuario a una sala en particular
    // sala global, client.id, 5f298534ad4169714548b785
    client.join( uid );

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async( payload ) => {
        // TODO: Grabar mensaje
        await saveMessage( payload );
        io.to( payload.para ).emit('mensaje-personal', payload );
    })
    

    client.on('disconnect', () => {
        userDisconnected(uid);
    });

});
