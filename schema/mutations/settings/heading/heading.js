const {
    GraphQLNonNull,
    GraphQLID,
    GraphQLEnumType,
    GraphQLBoolean,
  } = require('graphql');
const { Heading } = require('../../../../models/settings');
const { HeadingType } = require('../../../types/settings');
 
  exports.headingMutations = {
    updateHeading: {
      type: HeadingType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        style: {
            type: new GraphQLEnumType({
              name: 'HeadingStyleType',
              values: {
                box: { value: 'box' },
                simple: { value: 'simple' },
                topBottomLine: { value: 'topBottomLine' },
                line: { value: 'line' },
              },
            }),
            defaultValue: 'line',
          },
        isUppercase: { type: GraphQLBoolean, defaultValue: false },
        size: {
            type: new GraphQLEnumType({
              name: 'HeadingSizeType',
              values: {
                s: { value: 's' },
                m: { value: 'm' },
                l: { value: 'l' },
              },
            }),
            defaultValue: 's',
          },
      },
      resolve(parent, args) {
        return Heading.findByIdAndUpdate(
          args.id,
          {
            style: args.style,
            isUppercase: args.isUppercase,
            size: args.size,
          },
          { new: true }
        );
      },
    },
  };
  