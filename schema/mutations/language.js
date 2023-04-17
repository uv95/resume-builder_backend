const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
} = require('graphql');

const Language = require('../../models/Language');
const { LanguageType } = require('../types');

exports.languageMutations = {
  addLanguage: {
    type: LanguageType,
    args: {
      language: { type: GraphQLNonNull(GraphQLString) },
      info: { type: GraphQLString },
      languageLevel: {
        type: new GraphQLEnumType({
          name: 'LanguageLevel',
          values: {
            beginner: { value: 'Beginner (A1)' },
            elementary: { value: 'Elementary (A2)' },
            limited: { value: 'Limited working proficiency (B1)' },
            highlyProficient: { value: 'Highly proficient (B2-C1)' },
            fullProficiency: {
              value: 'Native / full working proficiency (C2)',
            },
          },
        }),
      },
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const language = new Language(args);
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
      language: { type: GraphQLString },
      info: { type: GraphQLString },
      languageLevel: {
        type: new GraphQLEnumType({
          name: 'LanguageLevelUpdate',
          values: {
            beginner: { value: 'Beginner (A1)' },
            elementary: { value: 'Elementary (A2)' },
            limited: { value: 'Limited working proficiency (B1)' },
            highlyProficient: { value: 'Highly proficient (B2-C1)' },
            fullProficiency: {
              value: 'Native / full working proficiency (C2)',
            },
          },
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
        },
        { new: true }
      );
    },
  },
};
