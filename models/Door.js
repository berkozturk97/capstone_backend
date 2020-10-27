const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoorSchema = new Schema({
    doorName: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    doorId:{
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Door', DoorSchema);