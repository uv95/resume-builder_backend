const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql');

//Mongoose models
const { ProjectItem, Project } = require('../../models/Project');
const { Education, EducationItem } = require('../../models/Education');
const PersonalDetails = require('../../models/PersonalDetails');
const { Profile, ProfileItem } = require('../../models/Profile');
const { Language, LanguageItem } = require('../../models/Language');
const { Skills, SkillsItem } = require('../../models/Skills');
const { ProfessionalExperience, ProfessionalExperienceItem } = require('../../models/ProfessionalExperience');
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

const ProjectItemType = new GraphQLObjectType({
  name: 'ProjectItem',
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

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    sectionName: { type: GraphQLString },
    items: {
      type: new GraphQLList(ProjectItemType),
      resolve(parent) {
        return ProjectItem.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    }
  }),
})

const EducationItemType = new GraphQLObjectType({
  name: 'EducationItem',
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

const EducationType = new GraphQLObjectType({
  name: 'Education',
  fields: () => ({
    id: { type: GraphQLID },
    sectionName: { type: GraphQLString },
    items: {
      type: new GraphQLList(EducationItemType),
      resolve(parent) {
        return EducationItem.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    }
  }),
})

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
            isLink: { type: GraphQLBoolean },
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

const ProfessionalExperienceItemType = new GraphQLObjectType({
  name: 'ProfessionalExperienceItem',
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

const ProfessionalExperienceType = new GraphQLObjectType({
  name: 'ProfessionalExperience',
  fields: () => ({
    id: { type: GraphQLID },
    sectionName: { type: GraphQLString },
    items: {
      type: new GraphQLList(ProfessionalExperienceItemType),
      resolve(parent) {
        return ProfessionalExperienceItem.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    }
  }),
})

const SkillsItemType = new GraphQLObjectType({
  name: 'SkillsItem',
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

const SkillsType = new GraphQLObjectType({
  name: 'Skills',
  fields: () => ({
    id: { type: GraphQLID },
    sectionName: { type: GraphQLString },
    items: {
      type: new GraphQLList(SkillsItemType),
      async resolve(parent) {
        return await SkillsItem.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    }
  }),
})

const LanguageItemType = new GraphQLObjectType({
  name: 'LanguageItem',
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

const LanguageType = new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    id: { type: GraphQLID },
    sectionName: { type: GraphQLString },
    items: {
      type: new GraphQLList(LanguageItemType),
      resolve(parent) {
        return LanguageItem.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    }
  }),
})

const ProfileItemType = new GraphQLObjectType({
  name: 'ProfileItem',
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

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: GraphQLID },
    sectionName: { type: GraphQLString },
    items: {
      type: new GraphQLList(ProfileItemType),
      resolve(parent) {
        return ProfileItem.find({ resumeId: parent.resumeId }).sort({
          index: 'ascending',
        });
      },
    }
  }),
})

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
      type: SkillsType,
      resolve(parent) {
        return Skills.findOne({ resumeId: parent.resumeId });
      },
    },
    language: {
      type: LanguageType,
      resolve(parent) {
        return Language.findOne({ resumeId: parent.resumeId })
      },
    },
    professionalExperience: {
      type: ProfessionalExperienceType,
      resolve(parent) {
        return ProfessionalExperience.findOne({ resumeId: parent.resumeId })
      },
    },
    profile: {
      type: ProfileType,
      resolve(parent) {
        return Profile.findOne({ resumeId: parent.resumeId })
      },
    },
    education: {
      type: EducationType,
      resolve(parent) {
        return Education.findOne({ resumeId: parent.resumeId })
      },
    },
    project: {
      type: ProjectType,
      resolve(parent) {
        return Project.findOne({ resumeId: parent.resumeId })
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
  ProjectItemType,
  ProjectType,
  EducationItemType,
  EducationType,
  PersonalDetailsType,
  ProfessionalExperienceItemType,
  ProfessionalExperienceType,
  SkillsItemType,
  SkillsType,
  LanguageItemType,
  LanguageType,
  ProfileItemType,
  ProfileType,
  ResumeType,
  SettingsType,
  ContentType,
};
