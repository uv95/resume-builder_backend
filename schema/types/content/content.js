const { GraphQLObjectType,  GraphQLID } = require("graphql");
const Resume = require("../../../models/Resume");
const { EducationType } = require("./education");
const { LanguageType } = require("./language");
const { PersonalDetailsType } = require("./personalDetails");
const { ProfessionalExperienceType } = require("./professionalExperience");
const { ProfileType } = require("./profile");
const PersonalDetails=require('../../../models/PersonalDetails');
const {Skills} = require('../../../models/Skills');
const {Language} = require('../../../models/Language');
const {ProfessionalExperience} = require('../../../models/ProfessionalExperience');
const {Profile} = require('../../../models/Profile');
const {Project} = require('../../../models/Project');
const {Education} = require('../../../models/Education');
const { SkillsType } = require("./skills");
const { ProjectType } = require("./project");

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
        type: require('../resume/resume').ResumeType,
        resolve(parent, args) {
          return Resume.findById(parent.resumeId);
        },
    }
    }),
  });

  module.exports={ContentType}