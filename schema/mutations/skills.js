const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
} = require('graphql');
const { Skills, SkillsItem } = require('../../models/Skills');
const { SkillsType, SkillsItemType } = require('../types/types');
const { updateOrder, updateOne, deleteOne, addOne, updateSectionName } = require('./handlerFactory');

const skillsScalarProps = {
  skill: { type: GraphQLNonNull(GraphQLString) },
  info: { type: GraphQLString },
  index: { type: GraphQLInt },
};
const argsList = ['skill', 'info', 'skillLevel', 'index']
const skillsLevelEnumValues = {
  novice: { value: 'Novice' },
  beginner: { value: 'Beginner' },
  skillful: { value: 'Skillful' },
  experienced: { value: 'Experienced' },
  expert: { value: 'Expert' },
  default: { value: '' },
};

const skillsMutations = {
  updateSectionNameSkills: updateSectionName({
    type: SkillsType,
    Model: Skills
  }),

  addSkill: addOne({
    type: SkillsItemType,
    fields: {
      ...skillsScalarProps,
      skillLevel: {
        type: new GraphQLEnumType({
          name: 'SkillLevel',
          values: skillsLevelEnumValues,
        }),
        defaultValue: '',
      }
    },
    argsList,
    Model: SkillsItem
  }
  ),

  deleteSkill: deleteOne({
    type: SkillsItemType,
    Model: SkillsItem
  }),

  updateSkill: updateOne({
    type: SkillsItemType,
    fields: {
      ...skillsScalarProps,
      skillLevel: {
        type: new GraphQLEnumType({
          name: 'SkillLevelUpdate',
          values: skillsLevelEnumValues,
        }),
      }
    },
    argsList,
    Model: SkillsItem
  }),

  updateSkillsOrder: updateOrder({
    type: SkillsItemType,
    inputTypeName: 'SkillsOrder',
    fields: {
      ...skillsScalarProps,
      skillLevel: {
        type: new GraphQLEnumType({
          name: 'SkillLevelUpdateOrder',
          values: skillsLevelEnumValues,
        }),
      },
    },
    argsList,
    Model: SkillsItem,
  }),
};

module.exports = { skillsScalarProps, skillsLevelEnumValues, skillsMutations };
