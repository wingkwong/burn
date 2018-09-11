const mongoose = require("mongoose")
const moment = require('moment')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

function buildModel(name, schema, options={}) {
  return mongoose.model(name, new Schema(schema, Object.assign({timestamps: true}, options)))
}

const Message = buildModel('Message', {
  id: String,
  content: String
})
module.exports.Message = Message
