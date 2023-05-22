const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLFloat,
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

const SpacingInput = new GraphQLInputObjectType({
  name: 'SpacingInput',
  fields: {
    fontSize: { type: GraphQLFloat, defaultValue: 16 },
    lineHeight: { type: GraphQLFloat, defaultValue: 1.3 },
    leftRightMargin: { type: GraphQLInt, defaultValue: 18 },
    topBottomMargin: { type: GraphQLInt, defaultValue: 18 },
    spaceBetweenSections: { type: GraphQLInt, defaultValue: 15 },
  },
});

const FontInput = new GraphQLInputObjectType({
  name: 'FontInput',
  fields: {
    type: { type: GraphQLString, defaultValue: 'serif' },
    font: { type: GraphQLString, defaultValue: 'Times New Roman' },
  },
});

const selectedValues = {
  accent: { value: 'accent' },
  multicolor: { value: 'multicolor' },
};

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
                      values: selectedValues,
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
                      values: selectedValues,
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
      //spacing
      spacing: { type: SpacingInput },
      //font
      font: { type: FontInput },
    },
    //resolve
    resolve(parent, args) {
      return Settings.findByIdAndUpdate(
        args.id,
        {
          sectionsOrder: args.sectionsOrder,
          layout: args.layout,
          colors: args.colors,
          spacing: args.spacing,
          font: args.font,
        },
        { new: true }
      );
    },
  },
};
