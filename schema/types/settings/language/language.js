const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

exports.LanguageSettingsType = new GraphQLObjectType({
    name: 'LanguageSettings',
    fields: () => ({
      format: { type: GraphQLString },
      gridCols: { type: GraphQLString },
      textFormat: { type: GraphQLString },
      infoItalic: { type: GraphQLBoolean },
    }),
  });