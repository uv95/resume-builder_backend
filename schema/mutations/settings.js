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
    type: {
      type: new GraphQLEnumType({
        name: 'FontType',
        values: {
          serif: { value: 'serif' },
          sans: { value: 'sans' },
        },
      }),
      defaultValue: 'serif',
    },
    font: { type: GraphQLString, defaultValue: 'Times New Roman' },
  },
});

const HeadingInput = new GraphQLInputObjectType({
  name: 'HeadingInput',
  fields: {
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
    uppercase: { type: GraphQLBoolean, defaultValue: false },
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
});

const SubtitleInput = new GraphQLInputObjectType({
  name: 'SubtitleInput',
  fields: {
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
});

const HeaderInput = new GraphQLInputObjectType({
  name: 'HeaderInput',
  fields: {
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
});

const NameInput = new GraphQLInputObjectType({
  name: 'NameInput',
  fields: {
    size: {
      type: new GraphQLEnumType({
        name: 'NameSizeType',
        values: {
          s: { value: 's' },
          m: { value: 'm' },
          l: { value: 'l' },
        },
      }),
      defaultValue: 'm',
    },
    style: {
      type: new GraphQLEnumType({
        name: 'NameStyleType',
        values: {
          normal: { value: 'normal' },
          bold: { value: 'bold' },
        },
      }),
      defaultValue: 'bold',
    },
  },
});

const JobTitleInput = new GraphQLInputObjectType({
  name: 'JobTitleInput',
  fields: {
    size: {
      type: new GraphQLEnumType({
        name: 'JobTitleSizeType',
        values: {
          s: { value: 's' },
          m: { value: 'm' },
          l: { value: 'l' },
        },
      }),
      defaultValue: 'm',
    },
    style: {
      type: new GraphQLEnumType({
        name: 'JobTitleStyleType',
        values: {
          normal: { value: 'normal' },
          bold: { value: 'bold' },
          italic: { value: 'italic' },
        },
      }),
      defaultValue: 'italic',
    },
  },
});

const DateInput = new GraphQLInputObjectType({
  name: 'DateInput',
  fields: {
    month: {
      type: new GraphQLEnumType({
        name: 'Month',
        values: {
          digits: { value: 'digits' },
          short: { value: 'short' },
          long: { value: 'long' },
        },
      }),
      defaultValue: 'digits',
    },
    delimiter: {
      type: new GraphQLEnumType({
        name: 'Delimiter',
        values: {
          slash: { value: '/ Slash' },
          hyphen: { value: '- Hyphen' },
          dot: { value: '. Dot' },
        },
      }),
      defaultValue: '/ Slash',
    },
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
      spacing: { type: SpacingInput },
      font: { type: FontInput },
      heading: { type: HeadingInput },
      subtitle: { type: SubtitleInput },
      header: { type: HeaderInput },
      name: { type: NameInput },
      jobTitle: { type: JobTitleInput },
      date: { type: DateInput },
    },
    resolve(parent, args) {
      return Settings.findByIdAndUpdate(
        args.id,
        {
          sectionsOrder: args.sectionsOrder,
          layout: args.layout,
          colors: args.colors,
          spacing: args.spacing,
          font: args.font,
          heading: args.heading,
          subtitle: args.subtitle,
          header: args.header,
          name: args.name,
          jobTitle: args.jobTitle,
          date: args.date,
        },
        { new: true }
      );
    },
  },
};
