const { GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLID } = require("graphql");

exports.SpacingType = new GraphQLObjectType({
    name: 'Spacing',
    fields: () => ({
      id: { type: GraphQLID },
      fontSize: { type: GraphQLFloat },
      lineHeight: { type: GraphQLFloat },
      leftRightMargin: { type: GraphQLInt },
      topBottomMargin: { type: GraphQLInt },
      spaceBetweenSections: { type: GraphQLInt },
    }),
  });