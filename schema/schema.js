const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

const Resume = require('../models/Resume');
const { ResumeType, SettingsType } = require('./types');
const { mutation } = require('./mutations');
const Settings = require('../models/Settings');

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
    settings: {
      type: SettingsType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Settings.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
