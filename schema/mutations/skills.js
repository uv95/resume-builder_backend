const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
} = require('graphql');

const Skills = require('../../models/Skills');
const { SkillsType } = require('../types');

exports.skillsMutations = {
  addSkill: {
    type: SkillsType,
    args: {
      skill: { type: GraphQLNonNull(GraphQLString) },
      info: { type: GraphQLString },
      skillLevel: {
        type: new GraphQLEnumType({
          name: 'SkillLevel',
          values: {
            novice: { value: 'Novice' },
            beginner: { value: 'Beginner' },
            skillful: { value: 'Skillful' },
            experienced: { value: 'Experienced' },
            expert: { value: 'Expert' },
          },
        }),
      },
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const skills = new Skills(args);
      return skills.save();
    },
  },

  deleteSkill: {
    type: SkillsType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Skills.findByIdAndRemove(args.id);
    },
  },

  updateSkill: {
    type: SkillsType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      skill: { type: GraphQLString },
      info: { type: GraphQLString },
      skillLevel: {
        type: new GraphQLEnumType({
          name: 'SkillLevelUpdate',
          values: {
            novice: { value: 'Novice' },
            beginner: { value: 'Beginner' },
            skillful: { value: 'Skillful' },
            experienced: { value: 'Experienced' },
            expert: { value: 'Expert' },
          },
        }),
      },
    },
    resolve(parent, args) {
      return Skills.findByIdAndUpdate(
        args.id,
        {
          skill: args.skill,
          info: args.info,
          skillLevel: args.skillLevel,
        },
        { new: true }
      );
    },
  },
};
