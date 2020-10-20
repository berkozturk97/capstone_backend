const mongoose = require('mongoose');
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
        type: Array,
        required: [true, '`{PATH}` alanı zorunludur.'],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserPackage', UserPackageSchema);