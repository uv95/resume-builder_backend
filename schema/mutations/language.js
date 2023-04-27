const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
} = require('graphql');

const Language = require('../../models/Language');
const Resume = require('../../models/Resume');
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
            default: {
              value: '',
            },
          },
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
            default: {
              value: '',
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
