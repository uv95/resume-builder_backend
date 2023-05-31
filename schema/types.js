const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
} = require('graphql');

//Mongoose models
const Project = require('../models/Project');
const Education = require('../models/Education');
const PersonalDetails = require('../models/PersonalDetails');
const Profile = require('../models/Profile');
const Language = require('../models/Language');
const Skills = require('../models/Skills');
const ProfessionalExperience = require('../models/ProfessionalExperience');
const Resume = require('../models/Resume');
const Settings = require('../models/Settings');
const Content = require('../models/Content');

//Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    description: { type: GraphQLString },
    resume: {
      type: ResumeType,
      resolve(parent, args) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

//Education Type
const EducationType = new GraphQLObjectType({
  name: 'Education',
  fields: () => ({
    id: { type: GraphQLID },
    degree: { type: GraphQLString },
    school: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    description: { type: GraphQLString },
    resume: {
      type: ResumeType,
      resolve(parent, args) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

//PersonalDetails Type
const PersonalDetailsType = new GraphQLObjectType({
  name: 'PersonalDetails',
  fields: () => ({
    id: { type: GraphQLID },
    fullName: { type: GraphQLString },
    jobTitle: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    additionalInfo: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'AdditionalInfo',
          fields: () => ({
            name: { type: GraphQLString },
            input: { type: GraphQLString },
          }),
        })
      ),
    },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

//ProfessionalExperience Type
const ProfessionalExperienceType = new GraphQLObjectType({
  name: 'ProfessionalExperience',
  fields: () => ({
    id: { type: GraphQLID },
    jobTitle: { type: GraphQLString },
    employer: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    description: { type: GraphQLString },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

//Skills Type
const SkillsType = new GraphQLObjectType({
  name: 'Skills',
  fields: () => ({
    id: { type: GraphQLID },
    skill: { type: GraphQLString },
    info: { type: GraphQLString },
    skillLevel: {
      type: GraphQLString,
    },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

//Language Type
const LanguageType = new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    id: { type: GraphQLID },
    language: { type: GraphQLString },
    info: { type: GraphQLString },
    languageLevel: {
      type: GraphQLString,
    },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

//Profile Type
const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

//SectionsOrderType
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

//Spacing Type
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

//Font Type
const FontType = new GraphQLObjectType({
  name: 'Font',
  fields: () => ({
    type: { type: GraphQLString },
    font: { type: GraphQLString },
  }),
});

//Heading Type
const HeadingType = new GraphQLObjectType({
  name: 'Heading',
  fields: () => ({
    style: { type: GraphQLString },
    uppercase: { type: GraphQLBoolean },
    size: { type: GraphQLString },
  }),
});

//Subtitle Type
const SubtitleType = new GraphQLObjectType({
  name: 'Subtitle',
  fields: () => ({
    style: { type: GraphQLString },
    position: { type: GraphQLString },
  }),
});

//Header Type
const HeaderType = new GraphQLObjectType({
  name: 'Header',
  fields: () => ({
    position: { type: GraphQLString },
    additionalInfoStyle: { type: GraphQLString },
    additionalInfoOrder: { type: new GraphQLList(GraphQLString) },
  }),
});

//Name Type
const NameType = new GraphQLObjectType({
  name: 'Name',
  fields: () => ({
    size: { type: GraphQLString },
    style: { type: GraphQLString },
  }),
});

//JobTitle Type
const JobTitleType = new GraphQLObjectType({
  name: 'JobTitle',
  fields: () => ({
    size: { type: GraphQLString },
    style: { type: GraphQLString },
  }),
});

//Settings Type
const SettingsType = new GraphQLObjectType({
  name: 'Settings',
  fields: () => ({
    id: { type: GraphQLID },
    sectionsOrder: { type: SectionsOrderType },
    layout: { type: LayoutType },
    colors: { type: ColorsType },
    spacing: { type: SpacingType },
    font: { type: FontType },
    heading: { type: HeadingType },
    subtitle: { type: SubtitleType },
    header: { type: HeaderType },
    name: { type: NameType },
    jobTitle: { type: JobTitleType },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

//Content Type
const ContentType = new GraphQLObjectType({
  name: 'Content',
  fields: () => ({
    id: { type: GraphQLID },
    personalDetails: {
      type: PersonalDetailsType,
      resolve(parent) {
        return PersonalDetails.findOne({ resumeId: parent.resumeId });
      },
    },
    skills: {
      type: new GraphQLList(SkillsType),
      resolve(parent) {
        return Skills.find({ resumeId: parent.resumeId });
      },
    },
    language: {
      type: new GraphQLList(LanguageType),
      resolve(parent) {
        return Language.find({ resumeId: parent.resumeId });
      },
    },
    professionalExperience: {
      type: new GraphQLList(ProfessionalExperienceType),
      resolve(parent) {
        return ProfessionalExperience.find({ resumeId: parent.resumeId });
      },
    },
    profile: {
      type: new GraphQLList(ProfileType),
      resolve(parent) {
        return Profile.find({ resumeId: parent.resumeId });
      },
    },
    education: {
      type: new GraphQLList(EducationType),
      resolve(parent) {
        return Education.find({ resumeId: parent.resumeId });
      },
    },
    project: {
      type: new GraphQLList(ProjectType),
      resolve(parent) {
        return Project.find({ resumeId: parent.resumeId });
      },
    },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

//Resume Type
const ResumeType = new GraphQLObjectType({
  name: 'Resume',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    content: {
      type: ContentType,
      resolve(parent) {
        return Content.findOne({ resumeId: parent._id });
      },
    },
    settings: {
      type: SettingsType,
      resolve(parent) {
        return Settings.findOne({ resumeId: parent._id });
      },
    },
  }),
});

module.exports = {
  ProjectType,
  EducationType,
  PersonalDetailsType,
  ProfessionalExperienceType,
  SkillsType,
  LanguageType,
  ProfileType,
  ResumeType,
  SettingsType,
};
