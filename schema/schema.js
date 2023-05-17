const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

const Resume = require('../models/Resume');
const { mutation } = require('./mutations');
const { ResumeType } = require('./types');

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
    resumes: {
      type: new GraphQLList(ResumeType),
      resolve(parent, args) {
        return Resume.find();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
