const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Record = new Schema({
    key         :   {type: String, required: true},
    createdAt   :   {type: Date, required: true},
    totalCount  :   {type: Number, required: true}
});

module.exports = mongoose.model('Record', Record);
