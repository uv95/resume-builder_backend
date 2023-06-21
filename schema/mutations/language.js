const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql');

const { Language, LanguageItem } = require('../../models/Language');
const { LanguageType, LanguageItemType } = require('../types/types');
const { updateOrder, updateOne, deleteOne, addOne, updateSectionName } = require('./handlerFactory');

const languageScalarProps = {
  language: { type: GraphQLNonNull(GraphQLString) },
  info: { type: GraphQLString },
  index: { type: GraphQLInt },
};
const languageLevelEnumValues = {
  beginner: { value: 'Beginner (A1)' },
  elementary: { value: 'Elementary (A2)' },
  limited: { value: 'Limited working proficiency (B1)' },
  highlyProficient: { value: 'Highly proficient (B2-C1)' },
  fullProficiency: {
    value: 'Native / full working proficiency (C2)',
  },
  default: {
    value: '',
  },
};
const argsList = ['language', 'info', 'languageLevel', 'index'];

const languageMutations = {
  updateSectionNameLanguage: updateSectionName({
    type: LanguageType,
    Model: Language
  }),

  addLanguage: addOne({
    type: LanguageItemType,
    fields: {
      ...languageScalarProps,
      languageLevel: {
        type: new GraphQLEnumType({
          name: 'LanguageLevel',
          values: languageLevelEnumValues,
        }),
        defaultValue: '',
      }
    },
    argsList,
    Model: LanguageItem
  }
  ),

  deleteLanguage: deleteOne({
    type: LanguageItemType,
    Model: LanguageItem
  }),

  updateLanguage: updateOne({
    type: LanguageItemType,
    fields: {
      ...languageScalarProps,
      languageLevel: {
        type: new GraphQLEnumType({
          name: 'LanguageLevelUpdate',
          values: languageLevelEnumValues,
        }),
      }
    },
    argsList,
    Model: LanguageItem
  }),

  updateLanguagesOrder: updateOrder({
    type: LanguageType,
    inputTypeName: 'LanguagesOrder',
    fields: {
      ...languageScalarProps,
      languageLevel: {
        type: new GraphQLEnumType({
          name: 'LanguageLevelUpdateOrder',
          values: languageLevelEnumValues,
        }),
      },
    },
    argsList,
    Model: Language,
  }),
};

module.exports = {
  languageScalarProps,
  languageLevelEnumValues,
  languageMutations,
};
