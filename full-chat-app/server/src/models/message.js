const {Schema, model} = require('mongoose');

const MesssageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    message: {
        type: String,
        require: true,
    }, 
}, {
    timestamps: true,
})

MesssageSchema.method('toJSON', function() {
    const {__v, __id, ...object} = this.toObject()
    return object;
})

module.exports = model('Message', MesssageSchema)