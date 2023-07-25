const {
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
  } = require('graphql');
const Spacing = require('../../../../models/settings/Spacing/Spacing');
const { SpacingType } = require('../../../types/settings/spacing/spacing');
  
  exports.spacingMutations = {
    updateSpacing: {
      type: SpacingType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        fontSize: { type: GraphQLFloat, defaultValue: 16 },
        lineHeight: { type: GraphQLFloat, defaultValue: 1.3 },
        leftRightMargin: { type: GraphQLInt, defaultValue: 18 },
        topBottomMargin: { type: GraphQLInt, defaultValue: 18 },
        spaceBetweenSections: { type: GraphQLInt, defaultValue: 15 },
      },
      resolve(parent, args) {
        return Spacing.findByIdAndUpdate(
          args.id,
          {
            fontSize: args.fontSize,
            lineHeight: args.lineHeight,
            leftRightMargin: args.leftRightMargin,
            topBottomMargin: args.topBottomMargin,
            spaceBetweenSections: args.spaceBetweenSections,
          },
          { new: true }
        );
      },
    },
  };
  