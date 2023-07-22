const { GraphQLObjectType, GraphQLString } = require("graphql");

exports.JobTitleType = new GraphQLObjectType({
    name: 'JobTitle',
    fields: () => ({
      size: { type: GraphQLString },
      style: { type: GraphQLString },
    }),
  });