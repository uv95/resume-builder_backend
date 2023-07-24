const { GraphQLObjectType, GraphQLString } = require("graphql");

exports.DateType = new GraphQLObjectType({
    name: 'Date',
    fields: () => ({
      month: { type: GraphQLString },
      delimiter: { type: GraphQLString },
    }),
  });