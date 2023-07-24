const { GraphQLObjectType, GraphQLBoolean } = require("graphql");

exports.ProfileSettingsType = new GraphQLObjectType({
    name: 'ProfileSettings',
    fields: () => ({
      showHeading: { type: GraphQLBoolean },
    }),
  });