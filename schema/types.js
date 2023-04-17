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
    fullName: { type: GraphQLString },
    jobTitle: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    additionalInfo: {
      type: AdditionalInfoType,
      resolve(parent) {
        return AdditionalInfo.findOne({
          personalDetails: parent.personalDetailsId,
        });
      },
    },
    links: {
      type: LinksType,
      resolve(parent) {
        return Links.findOne({ personalDetails: parent.personalDetailsId });
      },
    },
    resume: {
      type: ResumeType,
      resolve(parent, args) {
        return Resume.findById(parent.resumeId);
      },
    },
  }),
});

//AdditionalInfo Type
const AdditionalInfoType = new GraphQLObjectType({
  name: 'AdditionalInfo',
  fields: () => ({
    dateOfBirth: { type: GraphQLString },
    drivingLicense: { type: GraphQLString },
    gender: { type: GraphQLString },
    personalDetails: {
      type: PersonalDetailsType,
      resolve(parent, args) {
        return PersonalDetails.findById(parent.personalDetailsId);
      },
    },
  }),
});

//Links Type
const LinksType = new GraphQLObjectType({
  name: 'Links',
  fields: () => ({
    website: { type: GraphQLString },
    github: { type: GraphQLString },
    skype: { type: GraphQLString },
    telegram: { type: GraphQLString },
    personalDetails: {
      type: PersonalDetailsType,
      resolve(parent, args) {
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
      resolve(parent, args) {
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
      resolve(parent, args) {
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
      resolve(parent, args) {
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
      resolve(parent, args) {
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
        return PersonalDetails.findOne({ resume: parent.resumeId });
      },
    },
    skills: {
      type: new GraphQLList(SkillsType),
      resolve() {
        return Skills.find();
      },
    },
    language: {
      type: new GraphQLList(LanguageType),
      resolve() {
        return Language.find();
      },
    },
    professionalExperience: {
      type: new GraphQLList(ProfessionalExperienceType),
      resolve() {
        return ProfessionalExperience.find();
      },
    },
    profile: {
      type: new GraphQLList(ProfileType),
      async resolve(parent) {
        return await Profile.find();
      },
    },
    education: {
      type: new GraphQLList(EducationType),
      resolve() {
        return Education.find();
      },
    },
    project: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find();
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
};
