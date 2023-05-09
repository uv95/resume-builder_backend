const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
} = require('graphql');
const Resume = require('../../models/Resume');

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
            default: { value: '' },
          },
        }),
        defaultValue: '',
      },
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const skills = new Skills({
        skill: args.skill,
        info: args.info || '',
        skillLevel: args.skillLevel,
        resumeId: args.resumeId,
      });
      const resume = await Resume.findById(args.resumeId);
      if (!resume) throw new Error('Resume does not exist!');
      console.log(resume, 'resume');
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
            default: { value: '' },
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
