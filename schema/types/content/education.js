const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = require("graphql");
const Resume = require("../../../models/Resume");

exports.EducationItemType = new GraphQLObjectType({
    name: 'EducationItem',
    fields: () => ({
      id: { type: GraphQLID },
      degree: { type: GraphQLString },
      school: { type: GraphQLString },
      city: { type: GraphQLString },
      country: { type: GraphQLString },
      startDate: { type: GraphQLString },
      endDate: { type: GraphQLString },
      description: { type: GraphQLString },
      index: { type: GraphQLInt },
      resume: {
        type: require('../resume/resume').ResumeType,
        resolve(parent, args) {
          return Resume.findById(parent.resumeId);
        },
    }
    }),
  });
  
exports.EducationType = new GraphQLObjectType({
    name: 'Education',
    fields: () => ({
      id: { type: GraphQLID },
      sectionName: { type: GraphQLString },
      items: {
        type: new GraphQLList(this.EducationItemType),
        resolve(parent) {
          return EducationItem.find({ resumeId: parent.resumeId }).sort({
            index: 'ascending',
          });
        },
      }
    }),
  })