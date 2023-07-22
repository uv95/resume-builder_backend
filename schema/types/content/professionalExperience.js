const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = require("graphql");
const Resume = require("../../../models/Resume");

exports.ProfessionalExperienceItemType = new GraphQLObjectType({
    name: 'ProfessionalExperienceItem',
    fields: () => ({
      id: { type: GraphQLID },
      jobTitle: { type: GraphQLString },
      employer: { type: GraphQLString },
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
    },
    }),
  });
  
exports.ProfessionalExperienceType = new GraphQLObjectType({
    name: 'ProfessionalExperience',
    fields: () => ({
      id: { type: GraphQLID },
      sectionName: { type: GraphQLString },
      items: {
        type: new GraphQLList(this.ProfessionalExperienceItemType),
        resolve(parent) {
          return ProfessionalExperienceItem.find({ resumeId: parent.resumeId }).sort({
            index: 'ascending',
          });
        },
      }
    }),
  })