const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        ref: 'User',
        require: true,
    },
    email: {
        type: String,
        ref: 'User',
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    online: {
        type: Boolean,
        default: false
    }
},)

UserSchema.method('toJSON', function () {
    const { __v, __id, ...object } = this.toObject();
    object.uid = __id;
    return object;
})

module.exports = model('User', UserSchema)