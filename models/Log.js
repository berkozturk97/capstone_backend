const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    rfid: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    doorid: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    isOpen: {
        type: Boolean,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Log', LogSchema);