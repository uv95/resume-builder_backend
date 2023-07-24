const { GraphQLObjectType, GraphQLString } = require("graphql");

exports.FontType = new GraphQLObjectType({
    name: 'Font',
    fields: () => ({
      type: { type: GraphQLString },
      font: { type: GraphQLString },
    }),
  });