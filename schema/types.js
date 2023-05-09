const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
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
const Links = require('../models/Links');
const AdditionalInfo = require('../models/AdditionalInfo');
const Settings = require('../models/Settings');

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
      type: new GraphQLList(AdditionalInfoType),
      resolve(parent) {
        return AdditionalInfo.find({
          personalDetailsId: parent._id,
        });
      },
    },
    links: {
      type: new GraphQLList(LinksType),
      resolve(parent) {
        return Links.find({ personalDetailsId: parent._id });
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

//AdditionalInfo Type
const AdditionalInfoType = new GraphQLObjectType({
  name: 'AdditionalInfo',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    info: { type: GraphQLString },
    personalDetails: {
      type: PersonalDetailsType,
      resolve(parent) {
        return PersonalDetails.findById(parent.personalDetailsId);
      },
    },
  }),
});

//Links Type
const LinksType = new GraphQLObjectType({
  name: 'Links',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    link: { type: GraphQLString },
    personalDetails: {
      type: PersonalDetailsType,
      resolve(parent) {
        return PersonalDetails.findById(parent.personalDetailsId);
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
    resumeId: {
      type: ResumeType,
      async resolve(parent) {
        console.log(await Resume.findById(parent.resumeId), '🌱');
        return await Resume.findById(parent.resumeId);
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

//Settings Type
const SettingsType = new GraphQLObjectType({
  name: 'ResumeSettings',
  fields: () => ({
    id: { type: GraphQLID },
    sectionsOrder: { type: new GraphQLList(GraphQLString) },
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
    personalDetails: {
      type: PersonalDetailsType,
      resolve(parent) {
        return PersonalDetails.findOne({ resumeId: parent._id });
      },
    },
    skills: {
      type: new GraphQLList(SkillsType),
      resolve(parent) {
        return Skills.find({ resumeId: parent._id });
      },
    },
    language: {
      type: new GraphQLList(LanguageType),
      resolve(parent) {
        return Language.find({ resumeId: parent._id });
      },
    },
    professionalExperience: {
      type: new GraphQLList(ProfessionalExperienceType),
      resolve(parent) {
        return ProfessionalExperience.find({ resumeId: parent._id });
      },
    },
    profile: {
      type: new GraphQLList(ProfileType),
      resolve(parent) {
        return Profile.find({ resumeId: parent._id });
      },
    },
    education: {
      type: new GraphQLList(EducationType),
      resolve(parent) {
        return Education.find({ resumeId: parent._id });
      },
    },
    project: {
      type: new GraphQLList(ProjectType),
      resolve(parent) {
        return Project.find({ resumeId: parent._id });
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
  AdditionalInfoType,
  LinksType,
  PersonalDetailsType,
  ProfessionalExperienceType,
  SkillsType,
  LanguageType,
  ProfileType,
  ResumeType,
  SettingsType,
};
