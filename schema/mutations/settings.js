const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql');

const Settings = require('../../models/Settings');
const { SettingsType } = require('../types');

exports.settingsMutations = {
  updateSettings: {
    type: SettingsType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      //sections order
      sectionsOrder: {
        type: new GraphQLInputObjectType({
          name: 'SectionsOrderInput',
          fields: {
            top: { type: new GraphQLList(GraphQLString) },
            left: {
              type: new GraphQLInputObjectType({
                name: 'SectionsOrderLeftInput',
                fields: {
                  leftSide: { type: new GraphQLList(GraphQLString) },
                  rightSide: { type: new GraphQLList(GraphQLString) },
                },
              }),
            },
            right: {
              type: new GraphQLInputObjectType({
                name: 'SectionsOrderRightInput',
                fields: {
                  leftSide: { type: new GraphQLList(GraphQLString) },
                  rightSide: { type: new GraphQLList(GraphQLString) },
                },
              }),
            },
          },
        }),
      },
      //layout
      layout: {
        type: new GraphQLInputObjectType({
          name: 'LayoutInput',
          fields: {
            columns: { type: GraphQLInt, defaultValue: 1 },
            position: {
              type: new GraphQLEnumType({
                name: 'Position',
                values: {
                  top: { value: 'top' },
                  left: { value: 'left' },
                  right: { value: 'right' },
                },
              }),
              defaultValue: 'top',
            },
          },
        }),
      },
      //resolve
    },
    resolve(parent, args) {
      return Settings.findByIdAndUpdate(
        args.id,
        {
          sectionsOrder: args.sectionsOrder,
          layout: args.layout,
        },
        { new: true }
      );
    },
  },
};
