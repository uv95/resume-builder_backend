const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

//Mongoose models
const Project = require('../../models/Project');
const Education = require('../../models/Education');
const PersonalDetails = require('../../models/PersonalDetails');
const Profile = require('../../models/Profile');
const Language = require('../../models/Language');
const Skills = require('../../models/Skills');
const ProfessionalExperience = require('../../models/ProfessionalExperience');
const Resume = require('../../models/Resume');
const Settings = require('../../models/Settings');
const Content = require('../../models/Content');
const {
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
} = require('./settingsTypes');

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    description: { type: GraphQLString },
    index: { type: GraphQLInt },
    resume: {
      type: ResumeType,
      resolve(parent, args) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

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
    index: { type: GraphQLInt },
    resume: {
      type: ResumeType,
      resolve(parent, args) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

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
    index: { type: GraphQLInt },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

const SkillsType = new GraphQLObjectType({
  name: 'Skills',
  fields: () => ({
    id: { type: GraphQLID },
    skill: { type: GraphQLString },
    info: { type: GraphQLString },
    skillLevel: {
      type: GraphQLString,
    },
    index: { type: GraphQLInt },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});
//SORT ARRAYS OF CONTENT BASED ON INDEX PROP!! FOR PROPER FRONTEND

const LanguageType = new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    id: { type: GraphQLID },
    language: { type: GraphQLString },
    info: { type: GraphQLString },
    languageLevel: {
      type: GraphQLString,
    },
    index: { type: GraphQLInt },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    index: { type: GraphQLInt },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

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
    date: { type: DateType },
    skills: { type: SkillsSettingsType },
    language: { type: LanguageSettingsType },
    profile: { type: ProfileSettingsType },
    education: { type: EducationSettingsType },
    professionalExperience: { type: ProfessionalExperienceSettingsType },
    resume: {
      type: ResumeType,
      resolve(parent) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

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
        return Skills.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    },
    language: {
      type: new GraphQLList(LanguageType),
      resolve(parent) {
        return Language.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    },
    professionalExperience: {
      type: new GraphQLList(ProfessionalExperienceType),
      resolve(parent) {
        return ProfessionalExperience.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    },
    profile: {
      type: new GraphQLList(ProfileType),
      resolve(parent) {
        return Profile.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    },
    education: {
      type: new GraphQLList(EducationType),
      resolve(parent) {
        return Education.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    },
    project: {
      type: new GraphQLList(ProjectType),
      resolve(parent) {
        return Project.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
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
  ContentType,
};
