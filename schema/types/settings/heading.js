const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

exports.HeadingType = new GraphQLObjectType({
    name: 'Heading',
    fields: () => ({
      style: { type: GraphQLString },
      uppercase: { type: GraphQLBoolean },
      size: { type: GraphQLString },
    }),
  });