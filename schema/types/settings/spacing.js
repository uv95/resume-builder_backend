const { GraphQLObjectType, GraphQLFloat, GraphQLInt } = require("graphql");

exports.SpacingType = new GraphQLObjectType({
    name: 'Spacing',
    fields: () => ({
      fontSize: { type: GraphQLFloat },
      lineHeight: { type: GraphQLFloat },
      leftRightMargin: { type: GraphQLInt },
      topBottomMargin: { type: GraphQLInt },
      spaceBetweenSections: { type: GraphQLInt },
    }),
  });