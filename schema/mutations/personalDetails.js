const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
} = require('graphql');
const PersonalDetails = require('../../models/PersonalDetails');
const { PersonalDetailsType } = require('../types');
const Resume = require('../../models/Resume');

exports.personalDetailsMutations = {
  addPersonalDetails: {
    type: PersonalDetailsType,
    args: {
      fullName: { type: GraphQLNonNull(GraphQLString) },
      jobTitle: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      address: { type: GraphQLString },
      additionalInfo: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'AdditionalInfoInput',
            fields: {
              name: { type: GraphQLString },
              info: { type: GraphQLString },
            },
          })
        ),
      },
      links: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'LinksInput',
            fields: {
              name: { type: GraphQLString },
              link: { type: GraphQLString },
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
        email: args.email || '',
        phone: args.phone || '',
        address: args.address || '',
        additionalInfo: args.additionalInfo || [],
        links: args.links || [],
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
      fullName: { type: GraphQLString },
      jobTitle: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      address: { type: GraphQLString },
      additionalInfo: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'AdditionalInfoUpdate',
            fields: {
              name: { type: GraphQLString },
              info: { type: GraphQLString },
            },
          })
        ),
      },
      links: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'LinksUpdate',
            fields: {
              name: { type: GraphQLString },
              link: { type: GraphQLString },
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
          links: args.links,
        },
        { new: true }
      );
    },
  },
};
