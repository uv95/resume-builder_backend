const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const AdditionalInfo = require('../../models/AdditionalInfo');
const PersonalDetails = require('../../models/PersonalDetails');
const { AdditionalInfoType } = require('../types');

exports.additionalInfoMutations = {
  addAdditionalInfo: {
    type: AdditionalInfoType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      info: { type: GraphQLNonNull(GraphQLString) },
      personalDetailsId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const additionalInfo = new AdditionalInfo(args);
      const personalDetails = await PersonalDetails.findById(
        args.personalDetailsId
      );
      if (!personalDetails)
        throw new Error('Please add your full name and job title first!');
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
      name: { type: GraphQLString },
      info: { type: GraphQLString },
    },
    resolve(parent, args) {
      return AdditionalInfo.findByIdAndUpdate(
        args.id,
        {
          name: args.name,
          info: args.info,
        },
        { new: true }
      );
    },
  },
};
