const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId
const user = require('C:/Users/anuny/OneDrive/Desktop/ammu/models/user')

const itemSchema = new mongoose.Schema({
    owner : {
       type: ObjectID,
       required: true,
       ref: 'User'
    },
    name: {
       type: String,
       required: true,
       trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
       type: String,
       required: true
    },
    price: {
       type: Number,
       required: true
    }
    }, {
    timestamps: true
    })

    const Item = mongoose.model('Item', itemSchema)
    
module.exports = Item