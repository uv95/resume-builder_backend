const {
    GraphQLNonNull,
    GraphQLID,
    GraphQLEnumType,
  } = require('graphql');
const { Subtitle } = require('../../../../models/settings');
const { SubtitleType } = require('../../../types/settings');
  
 exports.subtitleMutations = {
    updateSubtitle: {
      type: SubtitleType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        style: {
            type: new GraphQLEnumType({
              name: 'SubtitleStyleType',
              values: {
                normal: { value: 'normal' },
                bold: { value: 'bold' },
                italic: { value: 'italic' },
              },
            }),
            defaultValue: 'normal',
          },
        position: {
            type: new GraphQLEnumType({
              name: 'SubtitlePositionType',
              values: {
                sameLine: { value: 'sameLine' },
                nextLine: { value: 'nextLine' },
              },
            }),
            defaultValue: 'nextLine',
          },
      },
      resolve(parent, args) {
        return Subtitle.findByIdAndUpdate(
          args.id,
          {
            style: args.style,
            position: args.position,
          },
          { new: true }
        );
      },
    },
  };
  