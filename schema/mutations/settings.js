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

const BasicMulticolorInput = new GraphQLInputObjectType({
  name: 'BasicMulticolorInput',
  fields: {
    font: {
      type: new GraphQLInputObjectType({
        name: 'BasicMulticolorFontInput',
        fields: {
          accent: { type: GraphQLString },
          primary: { type: GraphQLString },
        },
      }),
    },
    background: { type: GraphQLString },
  },
});

const AdvancedMulticolorInput = new GraphQLInputObjectType({
  name: 'AdvancedMulticolorInput',
  fields: {
    font: {
      type: new GraphQLInputObjectType({
        name: 'AdvancedMulticolorFontInput',
        fields: {
          accent: { type: GraphQLString },
          primary: { type: GraphQLString },
          secondary: { type: GraphQLString },
        },
      }),
    },
    background: {
      type: new GraphQLInputObjectType({
        name: 'AdvancedMulticolorBackgroundInput',
        fields: {
          primary: { type: GraphQLString },
          secondary: { type: GraphQLString },
        },
      }),
    },
  },
});

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
            left: { type: new GraphQLList(GraphQLString) },
            right: { type: new GraphQLList(GraphQLString) },
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
            columnWidth: {
              type: new GraphQLInputObjectType({
                name: 'ColumnWidthInput',
                fields: {
                  left: { type: GraphQLInt, defaultValue: 50 },
                  right: { type: GraphQLInt, defaultValue: 50 },
                },
              }),
            },
          },
        }),
      },
      //colors
      colors: {
        type: new GraphQLInputObjectType({
          name: 'ColorsInput',
          fields: {
            mode: {
              type: new GraphQLEnumType({
                name: 'Mode',
                values: {
                  basic: { value: 'basic' },
                  advanced: { value: 'advanced' },
                },
              }),
              defaultValue: 'basic',
            },
            //basic
            basic: {
              type: new GraphQLInputObjectType({
                name: 'BasicInput',
                fields: {
                  selected:{
                    type: new GraphQLEnumType({
                      name: 'BasicSelected',
                      values: {
                        accent: { value: 'accent' },
                        multicolor: { value: 'multicolor' },
                      },
                    }),
                    defaultValue: 'accent',
                  },
                  accent: { type: GraphQLString },
                  multicolor: {
                    type: BasicMulticolorInput,
                  },
                },
              }),
            },
            //advanced
            advanced: {
              type: new GraphQLInputObjectType({
                name: 'AdvancedInput',
                fields: {
                  selected:{
                    type: new GraphQLEnumType({
                      name: 'AdvancedSelected',
                      values: {
                        accent: { value: 'accent' },
                        multicolor: { value: 'multicolor' },
                      },
                    }),
                    defaultValue: 'accent',
                  },
                  accent: { type: GraphQLString },
                  multicolor: {
                    type: AdvancedMulticolorInput,
                  },
                },
              }),
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
          colors: args.colors,
        },
        { new: true }
      );
    },
  },
};
