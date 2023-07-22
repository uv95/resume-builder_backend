const { GraphQLObjectType, GraphQLString } = require("graphql");

exports.SubtitleType = new GraphQLObjectType({
    name: 'Subtitle',
    fields: () => ({
      style: { type: GraphQLString },
      position: { type: GraphQLString },
    }),
  });