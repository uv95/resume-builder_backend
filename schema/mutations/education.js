const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const Education = require('../../models/Education');
const Resume = require('../../models/Resume');
const { EducationType } = require('../types/types');

const educationScalarProps = {
  degree: { type: GraphQLNonNull(GraphQLString) },
  school: { type: GraphQLNonNull(GraphQLString) },
  city: { type: GraphQLString },
  country: { type: GraphQLString },
  startDate: { type: GraphQLString },
  endDate: { type: GraphQLString },
  description: { type: GraphQLString },
};

const educationMutations = {
  addEducation: {
    type: EducationType,
    args: {
      ...educationScalarProps,
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const education = new Education({
        degree: args.degree,
        school: args.school,
        city: args.city || '',
        country: args.country || '',
        startDate: args.startDate || '',
        endDate: args.endDate || '',
        description: args.description || '',
        resumeId: args.resumeId,
      });
      const resume = await Resume.findById(args.resumeId);
      if (!resume) throw new Error('Resume does not exist!');
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
      ...educationScalarProps,
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

module.exports = { educationScalarProps, educationMutations };
