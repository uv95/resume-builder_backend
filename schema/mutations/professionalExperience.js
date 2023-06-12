const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const ProfessionalExperience = require('../../models/ProfessionalExperience');
const Resume = require('../../models/Resume');
const { ProfessionalExperienceType } = require('../types/types');

const professionalExperienceScalarProps = {
  jobTitle: { type: GraphQLNonNull(GraphQLString) },
  employer: { type: GraphQLString },
  city: { type: GraphQLString },
  country: { type: GraphQLString },
  startDate: { type: GraphQLString },
  endDate: { type: GraphQLString },
  description: { type: GraphQLString },
};

const professionalExperienceMutations = {
  addProfessionalExperience: {
    type: ProfessionalExperienceType,
    args: {
      ...professionalExperienceScalarProps,
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const professionalExperience = new ProfessionalExperience({
        jobTitle: args.jobTitle,
        employer: args.employer || '',
        city: args.city || '',
        country: args.country || '',
        startDate: args.startDate || '',
        endDate: args.endDate || '',
        description: args.description || '',
        resumeId: args.resumeId,
      });
      const resume = await Resume.findById(args.resumeId);
      if (!resume) throw new Error('Resume does not exist!');
      return professionalExperience.save();
    },
  },

  deleteProfessionalExperience: {
    type: ProfessionalExperienceType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return ProfessionalExperience.findByIdAndRemove(args.id);
    },
  },

  updateProfessionalExperience: {
    type: ProfessionalExperienceType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      ...professionalExperienceScalarProps,
    },
    resolve(parent, args) {
      return ProfessionalExperience.findByIdAndUpdate(
        args.id,
        {
          jobTitle: args.jobTitle,
          employer: args.employer,
          city: args.city,
          country: args.country,
          startDate: args.startDate,
          endDate: args.endDate,
          description: args.description,
        },
        { new: true }
      );
    },
  },
};

module.exports = {
  professionalExperienceScalarProps,
  professionalExperienceMutations,
};
