const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLBoolean } = require("graphql");
const Resume = require("../../../models/Resume");

exports.PersonalDetailsType = new GraphQLObjectType({
    name: 'PersonalDetails',
    fields: () => ({
      id: { type: GraphQLID },
      fullName: { type: GraphQLString },
      jobTitle: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      address: { type: GraphQLString },
      additionalInfo: {
        type: new GraphQLList(
          new GraphQLObjectType({
            name: 'AdditionalInfo',
            fields: () => ({
              name: { type: GraphQLString },
              input: { type: GraphQLString },
              isLink: { type: GraphQLBoolean },
            }),
          })
        ),
      },
      resume: {
        type: require('../resume/resume').ResumeType,
        resolve(parent, args) {
          return Resume.findById(parent.resumeId);
        },
    },
    }),
  });