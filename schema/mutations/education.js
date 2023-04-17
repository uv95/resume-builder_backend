const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const Education = require('../../models/Education');
const { EducationType } = require('../types');

exports.educationMutations = {
  addEducation: {
    type: EducationType,
    args: {
      degree: { type: GraphQLNonNull(GraphQLString) },
      school: { type: GraphQLNonNull(GraphQLString) },
      city: { type: GraphQLString },
      country: { type: GraphQLString },
      startDate: { type: GraphQLString },
      endDate: { type: GraphQLString },
      description: { type: GraphQLString },
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const education = new Education(args);
      return education.save();
    },
  },

  deleteEducation: {
    type: EducationType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Education.findByIdAndRemove(args.id);
    },
  },

  updateEducation: {
    type: EducationType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      degree: { type: GraphQLNonNull(GraphQLString) },
      school: { type: GraphQLNonNull(GraphQLString) },
      city: { type: GraphQLString },
      country: { type: GraphQLString },
      startDate: { type: GraphQLString },
      endDate: { type: GraphQLString },
      description: { type: GraphQLString },
    },
    resolve(parent, args) {
      return Education.findByIdAndUpdate(
        args.id,
        {
          degree: args.degree,
          school: args.school,
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
