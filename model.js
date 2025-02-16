const mongoose = require('mongoose')

const Example = mongoose.Schema({
    name:{
        type: String
    },
    age:{
        type: Number
    },
    city:{
        type: String
    }
})

const ExampleModel =new mongoose.model('Example', Example);

module.exports = ExampleModel;