const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const PersonalDetails = require('../../models/PersonalDetails');
const { PersonalDetailsType } = require('../types');

exports.personalDetailsMutations = {
  addPersonalDetails: {
    type: PersonalDetailsType,
    args: {
      fullName: { type: GraphQLNonNull(GraphQLString) },
      jobTitle: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      address: { type: GraphQLString },
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const personalDetails = new PersonalDetails(args);
      return personalDetails.save();
    },
  },

  updatePersonalDetails: {
    type: PersonalDetailsType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      fullName: { type: GraphQLString },
      jobTitle: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      address: { type: GraphQLString },
    },
    resolve(parent, args) {
      return PersonalDetails.findByIdAndUpdate(
        args.id,
        {
          fullName: args.fullName,
          jobTitle: args.jobTitle,
          email: args.email,
          phone: args.phone,
          address: args.address,
        },
        { new: true }
      );
    },
  },
};
