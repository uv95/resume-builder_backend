const { GraphQLNonNull, GraphQLID, GraphQLObjectType } = require('graphql');
const Resume = require('../../models/Resume');
const { ResumeType, PersonalDetailsType } = require('../types');

exports.resumeMutations = {
  addResume: {
    type: ResumeType,
    resolve(parent, args) {
      const resume = new Resume({});
      return resume.save();
    },
  },

  deleteResume: {
    type: ResumeType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Resume.findByIdAndRemove(args.id);
    },
  },
};
