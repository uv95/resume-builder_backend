const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID } = require("graphql");

exports.HeadingType = new GraphQLObjectType({
    name: 'Heading',
    fields: () => ({
      id: { type: GraphQLID },
      style: { type: GraphQLString },
      isUppercase: { type: GraphQLBoolean },
      size: { type: GraphQLString },
    }),
  });