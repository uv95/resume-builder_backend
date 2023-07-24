const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

exports.SubtitleType = new GraphQLObjectType({
    name: 'Subtitle',
    fields: () => ({
      id: { type: GraphQLID },
      style: { type: GraphQLString },
      position: { type: GraphQLString },
    }),
  });