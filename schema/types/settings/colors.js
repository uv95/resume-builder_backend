const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID } = require('graphql');
const Resume = require('../../../models/Resume');

const BasicMulticolorType = new GraphQLObjectType({
    name: 'BasicMulticolor',
    fields: () => ({
      accent: { type: GraphQLString },
      font: { type: GraphQLString },
      background: { type: GraphQLString },
    }),
  });
  
  const AdvancedMulticolorType = new GraphQLObjectType({
    name: 'AdvancedMulticolor',
    fields: () => ({
      primary: {
        type: new GraphQLObjectType({
          name: 'AdvancedMulticolorPrimary',
          fields: () => ({
            accent: { type: GraphQLString },
            font: { type: GraphQLString },
            background: { type: GraphQLString },
          }),
        }),
      },
      secondary: {
        type: new GraphQLObjectType({
          name: 'AdvancedMulticolorSecondary',
          fields: () => ({
            accent: { type: GraphQLString },
            font: { type: GraphQLString },
            background: { type: GraphQLString },
          }),
        }),
      },
    }),
  });
  
  const ApplyAccentColorType = new GraphQLObjectType({
    name: 'ApplyAccentColor',
    fields: () => ({
      name: { type: GraphQLBoolean },
      dots: { type: GraphQLBoolean },
      headings: { type: GraphQLBoolean },
      dates: { type: GraphQLBoolean },
      headingsLine: { type: GraphQLBoolean },
      linkIcons: { type: GraphQLBoolean },
      headerIcons: { type: GraphQLBoolean },
    }),
  });
  
 exports.ColorsType = new GraphQLObjectType({
    name: 'Colors',
    fields: () => ({
      id: { type: GraphQLID },
      mode: { type: GraphQLString },
      //basic
      basic: {
        type: new GraphQLObjectType({
          name: 'Basic',
          fields: () => ({
            selected: { type: GraphQLString },
            accent: { type: GraphQLString },
            multicolor: {
              type: BasicMulticolorType,
            },
          }),
        }),
      },
      //advanced
      advanced: {
        type: new GraphQLObjectType({
          name: 'Advanced',
          fields: () => ({
            selected: { type: GraphQLString },
            accent: { type: GraphQLString },
            multicolor: {
              type: AdvancedMulticolorType,
            },
          }),
        }),
      },
      //applyAccentColor
      applyAccentColor: { type: ApplyAccentColorType },
      resume: {
          type: require('../resume/resume').ResumeType,
          resolve(parent, args) {
            return Resume.findById(parent.resumeId);
          },
      }
    }),
  });