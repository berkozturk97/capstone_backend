const mongoose = require('mongoose');
const Door = require('./Door');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    rfid: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    doorId: {
        type: Schema.ObjectId,
        ref: Door
    },
    user: {
        type: Object,
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