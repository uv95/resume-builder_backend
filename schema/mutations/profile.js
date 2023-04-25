const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');

const Profile = require('../../models/Profile');
const Resume = require('../../models/Resume');
const { ProfileType } = require('../types');

exports.profileMutations = {
  addProfile: {
    type: ProfileType,
    args: {
      text: { type: GraphQLNonNull(GraphQLString) },
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const profile = new Profile(args);
      const resume = await Resume.findById(args.resumeId);
      if (!resume) throw new Error('Resume does not exist!');
      return profile.save();
    },
  },

  deleteProfile: {
    type: ProfileType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Profile.findByIdAndRemove(args.id);
    },
  },

  updateProfile: {
    type: ProfileType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      text: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return Profile.findByIdAndUpdate(
        args.id,
        {
          text: args.text,
        },
        { new: true }
      );
    },
  },
};
