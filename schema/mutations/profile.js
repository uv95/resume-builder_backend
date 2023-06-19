const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
} = require('graphql');

const Profile = require('../../models/Profile');
const Resume = require('../../models/Resume');
const { ProfileType } = require('../types/types');
const { updateAll } = require('./handlerFactory');

exports.profileMutations = {
  addProfile: {
    type: ProfileType,
    args: {
      text: { type: GraphQLNonNull(GraphQLString) },
      index: { type: GraphQLInt },
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
      index: { type: GraphQLInt },
    },
    resolve(parent, args) {
      return Profile.findByIdAndUpdate(
        args.id,
        {
          text: args.text,
          index: args.index,
        },
        { new: true }
      );
    },
  },

  updateAllProfiles: updateAll({
    type: ProfileType,
    inputTypeName: 'ProfileTypeAll',
    fields: {
      text: { type: GraphQLNonNull(GraphQLString) },
      index: { type: GraphQLInt },
    },
    argsList: ['text', 'index'],
    Model: Profile,
  }),
};
