const { GraphQLObjectType, GraphQLID, GraphQLSchema } = require('graphql');

const Resume = require('../models/Resume');
const { ResumeType } = require('./types');
const { mutation } = require('./mutations');

//ROOT Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    resume: {
      type: ResumeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Resume.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
