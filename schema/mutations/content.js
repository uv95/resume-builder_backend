const {
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType,
} = require('graphql');

const { ContentType } = require('../types/types');
const { languageScalarProps, languageLevelEnumValues } = require('./language');
const { personalDetailsScalarProps } = require('./personalDetails');
const { skillsScalarProps, skillsLevelEnumValues } = require('./skills');
const {
  professionalExperienceScalarProps,
} = require('./professionalExperience');
const { educationScalarProps } = require('./education');
const { projectScalarProps } = require('./project');

exports.contentMutations = {
  updateContent: {
    type: ContentType,
    args: {
      id: { type: GraphQLID },
      personalDetails: {
        type: new GraphQLInputObjectType({
          name: 'PersonalDetailsInput',
          fields: {
            ...personalDetailsScalarProps,
            additionalInfo: {
              type: new GraphQLList(
                new GraphQLInputObjectType({
                  name: 'ContentAdditionalInfoInput',
                  fields: {
                    name: { type: GraphQLString },
                    input: { type: GraphQLString },
                  },
                })
              ),
            },
          },
        }),
      },
      skills: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'SkillsInput',
            fields: {
              ...skillsScalarProps,
              skillLevel: {
                type: new GraphQLEnumType({
                  name: 'ContentSkillLevelUpdate',
                  values: skillsLevelEnumValues,
                }),
              },
            },
          })
        ),
      },
      language: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'LanguageInput',
            fields: {
              ...languageScalarProps,
              languageLevel: {
                type: new GraphQLEnumType({
                  name: 'ContentLanguageLevelUpdate',
                  values: languageLevelEnumValues,
                }),
              },
            },
          })
        ),
      },
      professionalExperience: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'ProfessionalExperienceInput',
            fields: { ...professionalExperienceScalarProps },
          })
        ),
      },
      profile: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'ProfileInput',
            fields: {
              text: { type: GraphQLNonNull(GraphQLString) },
            },
          })
        ),
      },
      education: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'EducationInput',
            fields: { ...educationScalarProps },
          })
        ),
      },
      project: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'ProjectInput',
            fields: { ...projectScalarProps },
          })
        ),
      },
    },
    resolve(parent, args) {
      return Profile.findByIdAndUpdate(
        args.id,
        {
          personalDetails: args.personalDetails,
          skills: args.skills,
          language: args.language,
          professionalExperience: args.professionalExperience,
          profile: args.profile,
          education: args.education,
          project: args.project,
        },
        { new: true }
      );
    },
  },
};
