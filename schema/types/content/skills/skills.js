const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = require("graphql");
const Resume = require("../../../../models/Resume");
const { SkillsItem } = require("../../../../models/Skills");

const SkillsItemType = new GraphQLObjectType({
    name: 'SkillsItem',
    fields: () => ({
      id: { type: GraphQLID },
      skill: { type: GraphQLString },
      info: { type: GraphQLString },
      skillLevel: {
        type: GraphQLString,
      },
      index: { type: GraphQLInt },
      resume: {
        type: require('../../resume/resume').ResumeType,
        resolve(parent, args) {
          return Resume.findById(parent.resumeId);
        },
    },
    }),
  });

  const SkillsType = new GraphQLObjectType({
    name: 'Skills',
    fields: () => ({
      id: { type: GraphQLID },
      sectionName: { type: GraphQLString },
      items: {
        type: new GraphQLList(SkillsItemType),
        async resolve(parent) {
          return await SkillsItem.find({ resumeId: parent.resumeId }).sort({
            index: 'ascending',
          });
        },
      }
    }),
  })
  
  module.exports = {SkillsItemType,SkillsType}
