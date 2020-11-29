const mongoose = require('mongoose');
const Door = require('./Door');
const Schema = mongoose.Schema;

const UserPackageSchema = new Schema({
    fullName: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    email: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    password: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    permissions: {
        type:  [{ type: Schema.ObjectId, ref: Door }],
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    userToken: {
        type: String,
        default:""
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('UserPackage', UserPackageSchema);