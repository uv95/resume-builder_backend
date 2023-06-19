const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql');

const Language = require('../../models/Language');
const Resume = require('../../models/Resume');
const { LanguageType } = require('../types/types');
const { updateAll } = require('./handlerFactory');

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

const languageMutations = {
  addLanguage: {
    type: LanguageType,
    args: {
      ...languageScalarProps,
      languageLevel: {
        type: new GraphQLEnumType({
          name: 'LanguageLevel',
          values: languageLevelEnumValues,
        }),
        defaultValue: '',
      },
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const language = new Language({
        language: args.language,
        info: args.info || '',
        languageLevel: args.languageLevel,
        index: args.index,
        resumeId: args.resumeId,
      });
      const resume = await Resume.findById(args.resumeId);
      if (!resume) throw new Error('Resume does not exist!');
      return language.save();
    },
  },

  deleteLanguage: {
    type: LanguageType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Language.findByIdAndRemove(args.id);
    },
  },

  updateLanguage: {
    type: LanguageType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      ...languageScalarProps,
      languageLevel: {
        type: new GraphQLEnumType({
          name: 'LanguageLevelUpdate',
          values: languageLevelEnumValues,
        }),
      },
    },
    resolve(parent, args) {
      return Language.findByIdAndUpdate(
        args.id,
        {
          language: args.language,
          info: args.info,
          languageLevel: args.languageLevel,
          index: args.index,
        },
        { new: true }
      );
    },
  },

  updateAllLanguages: updateAll({
    type: LanguageType,
    inputTypeName: 'LanguageTypeAll',
    fields: {
      ...languageScalarProps,
      skillLevel: {
        type: new GraphQLEnumType({
          name: 'LanguageLevelUpdateAll',
          values: languageLevelEnumValues,
        }),
      },
    },
    argsList: ['language', 'info', 'languageLevel', 'index'],
    Model: Language,
  }),
};

module.exports = {
  languageScalarProps,
  languageLevelEnumValues,
  languageMutations,
};
