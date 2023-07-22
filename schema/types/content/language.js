const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = require("graphql");
const Resume = require("../../../models/Resume");

exports.LanguageItemType = new GraphQLObjectType({
    name: 'LanguageItem',
    fields: () => ({
      id: { type: GraphQLID },
      language: { type: GraphQLString },
      info: { type: GraphQLString },
      languageLevel: {
        type: GraphQLString,
      },
      index: { type: GraphQLInt },
      resume:{
        type: require('../resume/resume').ResumeType,
        resolve(parent, args) {
          return Resume.findById(parent.resumeId);
        },
    },
    }),
  });
  
 exports.LanguageType = new GraphQLObjectType({
    name: 'Language',
    fields: () => ({
      id: { type: GraphQLID },
      sectionName: { type: GraphQLString },
      items: {
        type: new GraphQLList(this.LanguageItemType),
        resolve(parent) {
          return LanguageItem.find({ resumeId: parent.resumeId }).sort({
            index: 'ascending',
          });
        },
      }
    }),
  })