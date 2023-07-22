const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const Content = require('../../models/Content');
const { Education } = require('../../models/Education');
const { Language } = require('../../models/Language');
const PersonalDetails = require('../../models/PersonalDetails');
const { ProfessionalExperience } = require('../../models/ProfessionalExperience');
const { Profile } = require('../../models/Profile');
const { Project } = require('../../models/Project');
const Resume = require('../../models/Resume');
const Settings = require('../../models/Settings');
const { Skills } = require('../../models/Skills');
const { ResumeType } = require('../types/resume/resume');

exports.resumeMutations = {
  addResume: {
    type: ResumeType,
    resolve() {
      const resume = new Resume()
      const newDocs = [Settings, Content, PersonalDetails, Skills, Education, Project, Language, ProfessionalExperience, Profile];
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
      Profile.find({ resumeId: args.id }).then((profile) =>
        profile.forEach((p) => p.deleteOne())
      );
      Language.find({ resumeId: args.id }).then((languages) =>
        languages.forEach((l) => l.deleteOne())
      );
      Education.find({ resumeId: args.id }).then((educations) =>
        educations.forEach((e) => e.deleteOne())
      );
      ProfessionalExperience.find({ resumeId: args.id }).then((profExp) =>
        profExp.forEach((p) => p.deleteOne())
      );
      PersonalDetails.find({ resumeId: args.id }).then((pd) =>
        pd.forEach((p) => p.deleteOne())
      );
      Settings.find({ resumeId: args.id }).then((settings) =>
        settings.forEach((s) => s.deleteOne())
      );
      Content.find({ resumeId: args.id }).then((content) =>
        content.forEach((c) => c.deleteOne())
      );
      Project.find({ resumeId: args.id }).then((projects) =>
        projects.forEach((p) => p.deleteOne())
      );
      Skills.find({ resumeId: args.id }).then((skills) =>
        skills.forEach((s) => s.deleteOne())
      );

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
