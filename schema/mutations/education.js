const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} = require('graphql');
const Education = require('../../models/Education');
const Resume = require('../../models/Resume');
const { EducationType } = require('../types/types');
const { updateAll } = require('./handlerFactory');

const educationScalarProps = {
  degree: { type: GraphQLNonNull(GraphQLString) },
  school: { type: GraphQLNonNull(GraphQLString) },
  city: { type: GraphQLString },
  country: { type: GraphQLString },
  startDate: { type: GraphQLString },
  endDate: { type: GraphQLString },
  description: { type: GraphQLString },
  index: { type: GraphQLInt },
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
        index: args.index,
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
          index: args.index,
        },
        { new: true }
      );
    },
  },

  updateAllEducations: updateAll({
    type: EducationType,
    inputTypeName: 'EducationTypeAll',
    fields: {
      ...educationScalarProps,
    },
    argsList: [
      'degree',
      'school',
      'city',
      'country',
      'startDate',
      'endDate',
      'description',
      'index',
    ],
    Model: Education,
  }),
};

module.exports = { educationScalarProps, educationMutations };
