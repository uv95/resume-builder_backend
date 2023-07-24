const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

exports.SkillsSettingsType = new GraphQLObjectType({
    name: 'SkillsSettings',
    fields: () => ({
      format: { type: GraphQLString },
      gridCols: { type: GraphQLString },
      textFormat: { type: GraphQLString },
      infoItalic: { type: GraphQLBoolean },
    }),
  });