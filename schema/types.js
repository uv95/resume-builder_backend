const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

//Mongoose models
const Project = require('../models/Project');
const Education = require('../models/Education');
const PersonalDetails = require('../models/PersonalDetails');
const Profile = require('../models/Profile');
const Language = require('../models/Language');
const Skills = require('../models/Skills');
const ProfessionalExperience = require('../models/ProfessionalExperience');

//Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    description: { type: GraphQLString },
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
  }),
});

const AdditionalInfoType = new GraphQLObjectType({
  name: 'AdditionalInfo',
  fields: () => ({
    dateOfBirth: { type: GraphQLString },
    drivingLicense: { type: GraphQLString },
    gender: { type: GraphQLString },
  }),
});

const LinksType = new GraphQLObjectType({
  name: 'Links',
  fields: () => ({
    website: { type: GraphQLString },
    github: { type: GraphQLString },
    skype: { type: GraphQLString },
    telegram: { type: GraphQLString },
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
    additionalInfo: { type: AdditionalInfoType },
    links: { type: LinksType },
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
  }),
});

//Profile Type
const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    text: { type: GraphQLString },
  }),
});

//Resume Type
const ResumeType = new GraphQLObjectType({
  name: 'Resume',
  fields: () => ({
    id: { type: GraphQLID },
    personalDetails: {
      type: PersonalDetailsType,
      resolve(parent) {
        return PersonalDetails.findById(parent.personalDetailsId);
      },
    },
    skills: {
      type: SkillsType,
      resolve(parent) {
        return Skills.findById(parent.skillsId);
      },
    },
    language: {
      type: LanguageType,
      resolve(parent) {
        return Language.findById(parent.languageId);
      },
    },
    professionalExperience: {
      type: ProfessionalExperienceType,
      resolve(parent) {
        return ProfessionalExperience.findById(parent.professionalExperienceId);
      },
    },
    profile: {
      type: ProfileType,
      resolve(parent) {
        return Profile.findById(parent.profileId);
      },
    },
    education: {
      type: EducationType,
      resolve(parent) {
        return Education.findById(parent.educationId);
      },
    },
    project: {
      type: ProjectType,
      resolve(parent) {
        return Project.findById(parent.projectId);
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
