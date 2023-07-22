const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

exports.HeaderType = new GraphQLObjectType({
    name: 'Header',
    fields: () => ({
      position: { type: GraphQLString },
      additionalInfoStyle: { type: GraphQLString },
      additionalInfoOrder: { type: new GraphQLList(GraphQLString) },
    }),
  });