const mongoose = require('mongoose');


const ImageSchema = mongoose. Schema ({
    name : {
    type: String,
    required: true
    },
    image: {
    data: Buffer,
    contentType: String
    }
    });

const Image=mongoose.model('Image',ImageSchema);
module.exports = Image;