const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const AdditionalInfo = require('../../models/AdditionalInfo');
const { AdditionalInfoType } = require('../types');

exports.additionalInfoMutations = {
  addAdditionalInfo: {
    type: AdditionalInfoType,
    args: {
      dateOfBirth: { type: GraphQLString },
      drivingLicense: { type: GraphQLString },
      gender: { type: GraphQLString },
      personalDetailsId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const additionalInfo = new AdditionalInfo(args);
      return additionalInfo.save();
    },
  },

  deleteAdditionalInfo: {
    type: AdditionalInfoType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return AdditionalInfo.findByIdAndRemove(args.id);
    },
  },

  updateAdditionalInfo: {
    type: AdditionalInfoType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      dateOfBirth: { type: GraphQLString },
      drivingLicense: { type: GraphQLString },
      gender: { type: GraphQLString },
    },
    resolve(parent, args) {
      return AdditionalInfo.findByIdAndUpdate(
        args.id,
        {
          dateOfBirth: args.dateOfBirth,
          drivingLicense: args.drivingLicense,
          gender: args.gender,
        },
        { new: true }
      );
    },
  },
};
