const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
} = require('graphql');
const Resume = require('../../models/Resume');

const Skills = require('../../models/Skills');
const { SkillsType } = require('../types/types');

const skillsScalarProps = {
  skill: { type: GraphQLNonNull(GraphQLString) },
  info: { type: GraphQLString },
};
const skillsLevelEnumValues = {
  novice: { value: 'Novice' },
  beginner: { value: 'Beginner' },
  skillful: { value: 'Skillful' },
  experienced: { value: 'Experienced' },
  expert: { value: 'Expert' },
  default: { value: '' },
};

exports.skillsMutations = {
  addSkill: {
    type: SkillsType,
    args: {
      ...skillsScalarProps,
      skillLevel: {
        type: new GraphQLEnumType({
          name: 'SkillLevel',
          values: skillsLevelEnumValues,
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
      ...skillsScalarProps,
      skillLevel: {
        type: new GraphQLEnumType({
          name: 'SkillLevelUpdate',
          values: skillsLevelEnumValues,
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

module.exports = { skillsScalarProps, skillsLevelEnumValues };
