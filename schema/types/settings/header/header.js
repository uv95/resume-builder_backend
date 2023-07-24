const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = require("graphql");

exports.HeaderType = new GraphQLObjectType({
    name: 'Header',
    fields: () => ({
      id: { type: GraphQLID },
      position: { type: GraphQLString },
      additionalInfoStyle: { type: GraphQLString },
      additionalInfoOrder: { type: new GraphQLList(GraphQLString) },
    }),
  });