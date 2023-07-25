const { GraphQLInputObjectType, GraphQLString, GraphQLBoolean, GraphQLEnumType, GraphQLNonNull, GraphQLID } = require("graphql");
const Colors = require("../../../../models/Settings/Colors/Colors");
const { ColorsType } = require("../../../types/settings/colors/colors");

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

  const selectedValues = {
    accent: { value: 'accent' },
    multicolor: { value: 'multicolor' },
  };

  exports.colorsMutations = {
    updateColors: {
      type: ColorsType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
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
      resolve(parent, args) {
        return Colors.findByIdAndUpdate(
          args.id,
          {
            mode: args.mode,
            basic: args.basic,
            advanced: args.advanced,
            applyAccentColor: args.applyAccentColor,
          },
          { new: true }
        );
      },
    },
  };