const mongoos =  require("mongoose");
const shortId =  require("shortid");

const Schema =  mongoos.Schema({
    full:{
        type:String,
        required:true
       },
    short:{
    type: String,
    required:true,
    default : shortId.generate
    },
    clicks:{
        type:Number,
        required: true,
        default : 0
    }

});

const Short =  mongoos.model('ShortUrl',Schema);

module.exports =  Short;