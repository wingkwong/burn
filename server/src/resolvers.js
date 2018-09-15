const { GraphQLScalarType } = require('graphql')
const { withFilter } = require('graphql-yoga')
const bcrypt = require('bcrypt')
const req = require('request')
const moment = require('moment')
const mongoose = require('mongoose')

const { Message } = require('./models')

const resolvers = {
  Query: {
   async getMessage (_, args, {request}) {
    console.log(args)
      const msg = await Message.findById(args.id)
      console.log(msg)
      return await Message.findById(msg)
    },
  },
  Mutation: {
  	 async createMessage (_, {message}) {
      const msg = await Message.create({
       message
      })
      console.log(msg)
      return msg
    }
  }
}

module.exports = resolvers
