const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");

exports.SectionsOrderType = new GraphQLObjectType({
    name: 'SectionsOrder',
    fields: () => ({
      top: { type: new GraphQLList(GraphQLString) },
      left: { type: new GraphQLList(GraphQLString) },
      right: { type: new GraphQLList(GraphQLString) },
    }),
  });