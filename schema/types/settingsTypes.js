const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
} = require('graphql');

const SectionsOrderType = new GraphQLObjectType({
  name: 'SectionsOrder',
  fields: () => ({
    top: { type: new GraphQLList(GraphQLString) },
    left: { type: new GraphQLList(GraphQLString) },
    right: { type: new GraphQLList(GraphQLString) },
  }),
});

//Layout type
const LayoutType = new GraphQLObjectType({
  name: 'Layout',
  fields: () => ({
    columns: { type: GraphQLInt },
    position: { type: GraphQLString },
    columnWidth: {
      type: new GraphQLObjectType({
        name: 'ColumnWidth',
        fields: () => ({
          left: { type: GraphQLInt },
          right: { type: GraphQLInt },
        }),
      }),
    },
  }),
});

//Basic Multicolor Type
const BasicMulticolorType = new GraphQLObjectType({
  name: 'BasicMulticolor',
  fields: () => ({
    accent: { type: GraphQLString },
    font: { type: GraphQLString },
    background: { type: GraphQLString },
  }),
});

//Advanced Multicolor Type
const AdvancedMulticolorType = new GraphQLObjectType({
  name: 'AdvancedMulticolor',
  fields: () => ({
    primary: {
      type: new GraphQLObjectType({
        name: 'AdvancedMulticolorPrimary',
        fields: () => ({
          accent: { type: GraphQLString },
          font: { type: GraphQLString },
          background: { type: GraphQLString },
        }),
      }),
    },
    secondary: {
      type: new GraphQLObjectType({
        name: 'AdvancedMulticolorSecondary',
        fields: () => ({
          accent: { type: GraphQLString },
          font: { type: GraphQLString },
          background: { type: GraphQLString },
        }),
      }),
    },
  }),
});

//ApplyAccentColor Type
const ApplyAccentColorType = new GraphQLObjectType({
  name: 'ApplyAccentColor',
  fields: () => ({
    name: { type: GraphQLBoolean },
    dots: { type: GraphQLBoolean },
    headings: { type: GraphQLBoolean },
    dates: { type: GraphQLBoolean },
    headingsLine: { type: GraphQLBoolean },
    linkIcons: { type: GraphQLBoolean },
    headerIcons: { type: GraphQLBoolean },
  }),
});

//Colors Type
const ColorsType = new GraphQLObjectType({
  name: 'Colors',
  fields: () => ({
    mode: { type: GraphQLString },
    //basic
    basic: {
      type: new GraphQLObjectType({
        name: 'Basic',
        fields: () => ({
          selected: { type: GraphQLString },
          accent: { type: GraphQLString },
          multicolor: {
            type: BasicMulticolorType,
          },
        }),
      }),
    },
    //advanced
    advanced: {
      type: new GraphQLObjectType({
        name: 'Advanced',
        fields: () => ({
          selected: { type: GraphQLString },
          accent: { type: GraphQLString },
          multicolor: {
            type: AdvancedMulticolorType,
          },
        }),
      }),
    },
    //applyAccentColor
    applyAccentColor: { type: ApplyAccentColorType },
  }),
});

const SpacingType = new GraphQLObjectType({
  name: 'Spacing',
  fields: () => ({
    fontSize: { type: GraphQLFloat },
    lineHeight: { type: GraphQLFloat },
    leftRightMargin: { type: GraphQLInt },
    topBottomMargin: { type: GraphQLInt },
    spaceBetweenSections: { type: GraphQLInt },
  }),
});

const FontType = new GraphQLObjectType({
  name: 'Font',
  fields: () => ({
    type: { type: GraphQLString },
    font: { type: GraphQLString },
  }),
});

const HeadingType = new GraphQLObjectType({
  name: 'Heading',
  fields: () => ({
    style: { type: GraphQLString },
    uppercase: { type: GraphQLBoolean },
    size: { type: GraphQLString },
  }),
});

const SubtitleType = new GraphQLObjectType({
  name: 'Subtitle',
  fields: () => ({
    style: { type: GraphQLString },
    position: { type: GraphQLString },
  }),
});

const HeaderType = new GraphQLObjectType({
  name: 'Header',
  fields: () => ({
    position: { type: GraphQLString },
    additionalInfoStyle: { type: GraphQLString },
    additionalInfoOrder: { type: new GraphQLList(GraphQLString) },
  }),
});

const NameType = new GraphQLObjectType({
  name: 'Name',
  fields: () => ({
    size: { type: GraphQLString },
    style: { type: GraphQLString },
  }),
});

const JobTitleType = new GraphQLObjectType({
  name: 'JobTitle',
  fields: () => ({
    size: { type: GraphQLString },
    style: { type: GraphQLString },
  }),
});

const DateType = new GraphQLObjectType({
  name: 'Date',
  fields: () => ({
    month: { type: GraphQLString },
    delimiter: { type: GraphQLString },
  }),
});

const SkillsSettingsType = new GraphQLObjectType({
  name: 'SkillsSettings',
  fields: () => ({
    format: { type: GraphQLString },
    gridCols: { type: GraphQLString },
    textFormat: { type: GraphQLString },
    infoItalic: { type: GraphQLBoolean },
  }),
});

const LanguageSettingsType = new GraphQLObjectType({
  name: 'LanguageSettings',
  fields: () => ({
    format: { type: GraphQLString },
    gridCols: { type: GraphQLString },
    textFormat: { type: GraphQLString },
    infoItalic: { type: GraphQLBoolean },
  }),
});

const ProfileSettingsType = new GraphQLObjectType({
  name: 'ProfileSettings',
  fields: () => ({
    showHeading: { type: GraphQLBoolean },
  }),
});

const EducationSettingsType = new GraphQLObjectType({
  name: 'EducationSettings',
  fields: () => ({
    degreeFirst: { type: GraphQLBoolean },
  }),
});

const ProfessionalExperienceSettingsType = new GraphQLObjectType({
  name: 'ProfessionalExperienceSettings',
  fields: () => ({
    jobTitleFirst: { type: GraphQLBoolean },
  }),
});

module.exports = {
  SectionsOrderType,
  LayoutType,
  ColorsType,
  SpacingType,
  FontType,
  HeadingType,
  SubtitleType,
  HeaderType,
  NameType,
  JobTitleType,
  DateType,
  SkillsSettingsType,
  LanguageSettingsType,
  ProfileSettingsType,
  EducationSettingsType,
  ProfessionalExperienceSettingsType,
};
