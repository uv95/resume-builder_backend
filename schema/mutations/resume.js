const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const Content = require('../../models/Content');
const { Education, EducationItem } = require('../../models/Education');
const { Language, LanguageItem } = require('../../models/Language');
const PersonalDetails = require('../../models/PersonalDetails');
const { ProfessionalExperience, ProfessionalExperienceItem } = require('../../models/ProfessionalExperience');
const { Profile, ProfileItem } = require('../../models/Profile');
const { Project, ProjectItem } = require('../../models/Project');
const Resume = require('../../models/Resume');
const Layout  = require("../../models/Settings/Layout/Layout");
const Colors  = require("../../models/Settings/Colors/Colors");
const Header  = require("../../models/Settings/Header/Header");
const Heading  = require("../../models/Settings/Heading/Heading");
const Spacing  = require("../../models/Settings/Spacing/Spacing");
const Subtitle = require("../../models/Settings/Subtitle/Subtitle");
const { Skills, SkillsItem } = require('../../models/Skills');
const { ResumeType } = require('../types/resume/resume');
const Settings = require('../../models/Settings/Settings');

exports.resumeMutations = {
  addResume: {
    type: ResumeType,
    resolve() {
      const resume = new Resume()
     
      const newDocs = [
        Settings, 
        Colors, 
        Heading,
        Header,
        Subtitle, 
        Spacing, 
        Layout, 
        Content, 
        PersonalDetails, 
        Skills, 
        Education, 
        Project, 
        Language, 
        ProfessionalExperience, 
        Profile];
      
      for (Model of newDocs) {
        const newDoc = new Model({
          resumeId: resume._id
        })
        newDoc.save()
      }

      return resume.save();
    },
  },

  deleteResume: {
    type: ResumeType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const docsToDelete = [
        Profile, 
        Language, 
        Education,
        ProfessionalExperience,
        PersonalDetails,
        Settings,
        Content,
        Project,
        Skills, 
        ProfileItem, 
        LanguageItem, 
        EducationItem, 
        ProfessionalExperienceItem, 
        Colors,
        Spacing, 
        Layout,
        Heading,
        Header,
        Subtitle,
        ProjectItem, 
        SkillsItem];

      for (Model of docsToDelete) {
         Model.find({ resumeId: args.id }).then((Model) =>
          Model.forEach((item) => item.deleteOne()))
      }

      return Resume.findByIdAndRemove(args.id);
    },
  },

  updateResume: {
    type: ResumeType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
    },
    resolve(parent, args) {
      return Resume.findByIdAndUpdate(
        args.id,
        {
          name: args.name,
        },
        { new: true }
      );
    },
  },
};
