const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLBoolean,
} = require('graphql');

const Settings = require('../../models/Settings');
const { SettingsType } = require('../types');

const BasicMulticolorInput = new GraphQLInputObjectType({
  name: 'BasicMulticolorInput',
  fields: {
    accent: { type: GraphQLString },
    font: { type: GraphQLString },
    background: { type: GraphQLString },
  },
});

const AdvancedMulticolorInput = new GraphQLInputObjectType({
  name: 'AdvancedMulticolorInput',
  fields: {
    primary: {
      type: new GraphQLInputObjectType({
        name: 'AdvancedMulticolorPrimaryInput',
        fields: {
          accent: { type: GraphQLString },
          font: { type: GraphQLString },
          background: { type: GraphQLString },
        },
      }),
    },
    secondary: {
      type: new GraphQLInputObjectType({
        name: 'AdvancedMulticolorSecondaryInput',
        fields: {
          accent: { type: GraphQLString },
          font: { type: GraphQLString },
          background: { type: GraphQLString },
        },
      }),
    },
  },
});

const ApplyAccentColorInput = new GraphQLInputObjectType({
  name: 'ApplyAccentColorInput',
  fields: {
    name: { type: GraphQLBoolean, defaultValue: true },
    dots: { type: GraphQLBoolean, defaultValue: false },
    headings: { type: GraphQLBoolean, defaultValue: true },
    dates: { type: GraphQLBoolean, defaultValue: false },
    headingsLine: { type: GraphQLBoolean, defaultValue: true },
    linkIcons: { type: GraphQLBoolean, defaultValue: false },
    headerIcons: { type: GraphQLBoolean, defaultValue: false },
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
                  selected: {
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
                  selected: {
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
            //applyAccentColor
            applyAccentColor: { type: ApplyAccentColorInput },
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
