const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const Education = require('../../models/Education');
const Language = require('../../models/Language');
const PersonalDetails = require('../../models/PersonalDetails');
const ProfessionalExperience = require('../../models/ProfessionalExperience');
const Profile = require('../../models/Profile');
const Project = require('../../models/Project');
const Resume = require('../../models/Resume');
const Skills = require('../../models/Skills');
const { ResumeType } = require('../types');

exports.resumeMutations = {
  addResume: {
    type: ResumeType,
    resolve(parent, args) {
      const resume = new Resume({ name: 'My Resume' });
      return resume.save();
    },
  },

  deleteResume: {
    type: ResumeType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      Profile.find().then((profile) => profile.forEach((p) => p.deleteOne()));
      Language.find().then((languages) =>
        languages.forEach((l) => l.deleteOne())
      );
      Education.find().then((educations) =>
        educations.forEach((e) => e.deleteOne())
      );
      ProfessionalExperience.find().then((profExp) =>
        profExp.forEach((p) => p.deleteOne())
      );
      PersonalDetails.find().then((pd) => pd.forEach((p) => p.deleteOne()));
      Project.find().then((projects) => projects.forEach((p) => p.deleteOne()));
      Skills.find().then((skills) => skills.forEach((s) => s.deleteOne()));

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
