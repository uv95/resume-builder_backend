const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const ProfessionalExperience = require('../../models/ProfessionalExperience');
const { ProfessionalExperienceType } = require('../types');

exports.professionalExperienceMutations = {
  addProfessionalExperience: {
    type: ProfessionalExperienceType,
    args: {
      jobTitle: { type: GraphQLNonNull(GraphQLString) },
      employer: { type: GraphQLString },
      city: { type: GraphQLString },
      country: { type: GraphQLString },
      startDate: { type: GraphQLString },
      endDate: { type: GraphQLString },
      description: { type: GraphQLString },
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const professionalExperience = new ProfessionalExperience(args);
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
      jobTitle: { type: GraphQLString },
      employer: { type: GraphQLString },
      city: { type: GraphQLString },
      country: { type: GraphQLString },
      startDate: { type: GraphQLString },
      endDate: { type: GraphQLString },
      description: { type: GraphQLString },
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
