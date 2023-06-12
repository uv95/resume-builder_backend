const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
} = require('graphql');
const PersonalDetails = require('../../models/PersonalDetails');
const Resume = require('../../models/Resume');
const { PersonalDetailsType } = require('../types/types');

const personalDetailsScalarProps = {
  fullName: { type: GraphQLNonNull(GraphQLString) },
  jobTitle: { type: GraphQLNonNull(GraphQLString) },
  email: { type: GraphQLString },
  phone: { type: GraphQLString },
  address: { type: GraphQLString },
};

const personalDetailsMutations = {
  addPersonalDetails: {
    type: PersonalDetailsType,
    args: {
      ...personalDetailsScalarProps,
      additionalInfo: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'AdditionalInfoInput',
            fields: {
              name: { type: GraphQLString },
              input: { type: GraphQLString },
            },
          })
        ),
      },
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const personalDetails = new PersonalDetails({
        fullName: args.fullName,
        jobTitle: args.jobTitle,
        email: args.email,
        phone: args.phone,
        address: args.address,
        additionalInfo: args.additionalInfo || [],
        resumeId: args.resumeId,
      });
      const resume = await Resume.findById(args.resumeId);
      if (!resume) throw new Error('Resume does not exist!');
      return personalDetails.save();
    },
  },

  updatePersonalDetails: {
    type: PersonalDetailsType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      ...personalDetailsScalarProps,
      additionalInfo: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'AdditionalInfoUpdate',
            fields: {
              name: { type: GraphQLString },
              input: { type: GraphQLString },
            },
          })
        ),
      },
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
          additionalInfo: args.additionalInfo,
        },
        { new: true }
      );
    },
  },
};

module.exports = { personalDetailsScalarProps, personalDetailsMutations };
