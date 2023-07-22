const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');
const { Education, EducationItem } = require('../../models/Education');
const { EducationType, EducationItemType } = require('../types/content/education');
const { updateOrder, updateOne, deleteOne, addOne, updateSectionName } = require('./handlerFactory');

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

const argsList = [
  'degree',
  'school',
  'city',
  'country',
  'startDate',
  'endDate',
  'description',
  'index',
]

const educationMutations = {
  updateSectionNameEducation: updateSectionName({
    type: EducationType,
    Model: Education
  }),

  addEducation: addOne({
    type: EducationItemType,
    fields: {
      ...educationScalarProps
    },
    argsList,
    Model: EducationItem
  }
  ),

  deleteEducation: deleteOne({
    type: EducationItemType,
    Model: EducationItem
  }),

  updateEducation: updateOne({
    type: EducationItemType,
    fields: {
      ...educationScalarProps
    },
    argsList,
    Model: EducationItem
  }),

  updateEducationOrder: updateOrder({
    type: EducationItemType,
    inputTypeName: 'EducationOrder',
    fields: {
      ...educationScalarProps,
    },
    argsList,
    Model: EducationItem,
  }),
};

module.exports = { educationScalarProps, educationMutations };
