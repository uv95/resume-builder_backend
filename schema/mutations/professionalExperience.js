const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
} = require('graphql');
const ProfessionalExperience = require('../../models/ProfessionalExperience');
const Resume = require('../../models/Resume');
const { ProfessionalExperienceType } = require('../types/types');
const { updateAll } = require('./handlerFactory');

const professionalExperienceScalarProps = {
  jobTitle: { type: GraphQLNonNull(GraphQLString) },
  employer: { type: GraphQLString },
  city: { type: GraphQLString },
  country: { type: GraphQLString },
  startDate: { type: GraphQLString },
  endDate: { type: GraphQLString },
  description: { type: GraphQLString },
  index: { type: GraphQLInt },
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
        index: args.index,
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
          index: args.index,
        },
        { new: true }
      );
    },
  },

  updateAllProfessionalExperience: updateAll({
    type: ProfessionalExperienceType,
    inputTypeName: 'ProfessionalExperienceTypeAll',
    fields: {
      ...professionalExperienceScalarProps,
    },
    argsList: [
      'jobTitle',
      'employer',
      'city',
      'country',
      'startDate',
      'endDate',
      'description',
      'index',
    ],
    Model: ProfessionalExperience,
  }),
};

module.exports = {
  professionalExperienceScalarProps,
  professionalExperienceMutations,
};
