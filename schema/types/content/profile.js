const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = require("graphql");
const Resume = require("../../../models/Resume");

exports.ProfileItemType = new GraphQLObjectType({
    name: 'ProfileItem',
    fields: () => ({
      id: { type: GraphQLID },
      text: { type: GraphQLString },
      index: { type: GraphQLInt },
      resume: {
        type: require('../resume/resume').ResumeType,
        resolve(parent, args) {
          return Resume.findById(parent.resumeId);
        },
    },
    }),
  });
  
exports.ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
      id: { type: GraphQLID },
      sectionName: { type: GraphQLString },
      items: {
        type: new GraphQLList(this.ProfileItemType),
        resolve(parent) {
          return ProfileItem.find({ resumeId: parent.resumeId }).sort({
            index: 'ascending',
          });
        },
      }
    }),
  })