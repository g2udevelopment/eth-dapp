var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contractSchema = new Schema({
    descriptionHash: String,
    userHash: String,
    user: String,
    description: String,
    fromAddress: String,
    toAddress: String,
    contractAddress: String
});

var Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;