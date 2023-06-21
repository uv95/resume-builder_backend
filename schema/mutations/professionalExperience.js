const {
  GraphQLString,
  GraphQLNonNull,

  GraphQLInt,

} = require('graphql');
const { ProfessionalExperience, ProfessionalExperienceItem } = require('../../models/ProfessionalExperience');
const { ProfessionalExperienceType, ProfessionalExperienceItemType } = require('../types/types');
const { updateOrder, updateOne, deleteOne, addOne, updateSectionName } = require('./handlerFactory');

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
const argsList = [
  'jobTitle',
  'employer',
  'city',
  'country',
  'startDate',
  'endDate',
  'description',
  'index',
];

const professionalExperienceMutations = {
  updateSectionNameProfessionalExperience: updateSectionName({
    type: ProfessionalExperienceType,
    Model: ProfessionalExperience
  }),

  addProfessionalExperience: addOne({
    type: ProfessionalExperienceItemType,
    fields: {
      ...professionalExperienceScalarProps
    },
    argsList,
    Model: ProfessionalExperienceItem
  }
  ),

  deleteProfessionalExperience: deleteOne({
    type: ProfessionalExperienceItemType,
    Model: ProfessionalExperienceItem
  }),

  updateProfessionalExperience: updateOne({
    type: ProfessionalExperienceItemType,
    fields: {
      ...professionalExperienceScalarProps
    },
    argsList,
    Model: ProfessionalExperienceItem
  }),

  updateProfessionalExperienceOrder: updateOrder({
    type: ProfessionalExperienceType,
    inputTypeName: 'ProfessionalExperienceTypeAll',
    fields: {
      ...professionalExperienceScalarProps,
    },
    argsList,
    Model: ProfessionalExperience,
  }),
};

module.exports = {
  professionalExperienceScalarProps,
  professionalExperienceMutations,
};
