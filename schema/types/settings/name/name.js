const { GraphQLObjectType, GraphQLString } = require("graphql");

exports.NameType = new GraphQLObjectType({
    name: 'Name',
    fields: () => ({
      size: { type: GraphQLString },
      style: { type: GraphQLString },
    }),
  });