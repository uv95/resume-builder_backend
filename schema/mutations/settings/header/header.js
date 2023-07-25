const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList,
    GraphQLEnumType,
  } = require('graphql');
const { Header } = require('../../../../models/settings');
const { HeaderType } = require('../../../types/settings/header/header');
  
exports.headerMutations = {
    updateHeader: {
      type: HeaderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        position: {
            type: new GraphQLEnumType({
              name: 'HeaderPositionType',
              values: {
                left: { value: 'left' },
                center: { value: 'center' },
              },
            }),
            defaultValue: 'center',
          },
        additionalInfoStyle: {
            type: new GraphQLEnumType({
              name: 'AdditionalInfoStyleType',
              values: {
                icon: { value: 'icon' },
                bar: { value: 'bar' },
              },
            }),
            defaultValue: 'icon',
          },
        additionalInfoOrder: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        return Header.findByIdAndUpdate(
          args.id,
          {
            position: args.position,
            additionalInfoStyle: args.additionalInfoStyle,
            additionalInfoOrder: args.additionalInfoOrder,
          },
          { new: true }
        );
      },
    },
  };
  