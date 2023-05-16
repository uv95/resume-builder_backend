const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
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

//Settings Type
const SettingsType = new GraphQLObjectType({
  name: 'ResumeSettings',
  fields: () => ({
    id: { type: GraphQLID },
    sectionsOrder: {
      type: SectionsOrderType,
    },
    layout: {
      type: LayoutType,
    },
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
