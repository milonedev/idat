const moongose = require('mongoose');

const dbConnection = async () => {
    try {
        await moongose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Db is online.')
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos.')
    }
}

module.exports = {
    dbConnection
}