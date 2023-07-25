const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLBoolean,
} = require('graphql');

const Settings = require('../../../models/settings/Settings');
const { SettingsType } = require('../../types/settings/settings');

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

const SkillsSettingsInput = new GraphQLInputObjectType({
  name: 'SkillsSettingsInput',
  fields: {
    format: {
      type: new GraphQLEnumType({
        name: 'SkillsFormat',
        values: {
          grid: { value: 'grid' },
          level: { value: 'level' },
          text: { value: 'text' },
          bubble: { value: 'bubble' },
        },
      }),
      defaultValue: 'level',
    },
    gridCols: {
      type: new GraphQLEnumType({
        name: 'SkillsGridCols',
        values: {
          one: { value: 'one' },
          two: { value: 'two' },
          three: { value: 'three' },
          four: { value: 'four' },
        },
      }),
      defaultValue: 'four',
    },
    textFormat: {
      type: new GraphQLEnumType({
        name: 'SkillsTextFormat',
        values: {
          bullet: { value: 'bullet' },
          pipe: { value: 'pipe' },
          wrap: { value: 'wrap' },
        },
      }),
      defaultValue: 'bullet',
    },
    infoItalic: { type: GraphQLBoolean, defaultValue: false },
  },
});

const LanguageSettingsInput = new GraphQLInputObjectType({
  name: 'LanguageSettingsInput',
  fields: {
    format: {
      type: new GraphQLEnumType({
        name: 'LanguageFormat',
        values: {
          grid: { value: 'grid' },
          level: { value: 'level' },
          text: { value: 'text' },
          bubble: { value: 'bubble' },
        },
      }),
      defaultValue: 'level',
    },
    gridCols: {
      type: new GraphQLEnumType({
        name: 'LanguageGridCols',
        values: {
          one: { value: 'one' },
          two: { value: 'two' },
          three: { value: 'three' },
          four: { value: 'four' },
        },
      }),
      defaultValue: 'four',
    },
    textFormat: {
      type: new GraphQLEnumType({
        name: 'LanguageTextFormat',
        values: {
          bullet: { value: 'bullet' },
          pipe: { value: 'pipe' },
          wrap: { value: 'wrap' },
        },
      }),
      defaultValue: 'bullet',
    },
    infoItalic: { type: GraphQLBoolean, defaultValue: false },
  },
});

const ProfileSettingsInput = new GraphQLInputObjectType({
  name: 'ProfileSettingsInput',
  fields: {
    showHeading: { type: GraphQLBoolean, defaultValue: true },
  },
});

const EducationSettingsInput = new GraphQLInputObjectType({
  name: 'EducationSettingsInput',
  fields: {
    degreeFirst: { type: GraphQLBoolean, defaultValue: true },
  },
});

const ProfessionalExperienceSettingsInput = new GraphQLInputObjectType({
  name: 'ProfessionalExperienceSettingsInput',
  fields: {
    jobTitleFirst: { type: GraphQLBoolean, defaultValue: true },
  },
});

exports.settingsMutations = {
  updateSettings: {
    type: SettingsType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
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
      font: { type: FontInput },
      name: { type: NameInput },
      jobTitle: { type: JobTitleInput },
      date: { type: DateInput },
      skills: { type: SkillsSettingsInput },
      language: { type: LanguageSettingsInput },
      profile: { type: ProfileSettingsInput },
      education: { type: EducationSettingsInput },
      professionalExperience: { type: ProfessionalExperienceSettingsInput },
    },
    resolve(parent, args) {
      return Settings.findByIdAndUpdate(
        args.id,
        {
          sectionsOrder: args.sectionsOrder,
          font: args.font,
          name: args.name,
          jobTitle: args.jobTitle,
          date: args.date,
          skills: args.skills,
          language: args.language,
          profile: args.profile,
          education: args.education,
          professionalExperience: args.professionalExperience,
        },
        { new: true }
      );
    },
  },
};
