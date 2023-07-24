const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = require("graphql");
const { ProjectItem } = require("../../../../models/Project");
const Resume = require("../../../../models/Resume");

const ProjectItemType = new GraphQLObjectType({
    name: 'ProjectItem',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      startDate: { type: GraphQLString },
      endDate: { type: GraphQLString },
      description: { type: GraphQLString },
      index: { type: GraphQLInt },
      resume: {
        type: require('../../resume/resume').ResumeType,
        resolve(parent, args) {
          return Resume.findById(parent.resumeId);
        },
    }
    }),
  });
  
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
      id: { type: GraphQLID },
      sectionName: { type: GraphQLString },
      items: {
        type: new GraphQLList(ProjectItemType),
        resolve(parent) {
          return ProjectItem.find({ resumeId: parent.resumeId }).sort({
            index: 'ascending',
          });
        },
      }
    }),
  })

  module.exports = {ProjectItemType,ProjectType}
