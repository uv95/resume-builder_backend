const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLBoolean,
} = require('graphql');
const PersonalDetails = require('../../models/PersonalDetails');
const { PersonalDetailsType } = require('../types/types');
const { updateOne, } = require('./handlerFactory');

const personalDetailsScalarProps = {
  fullName: { type: GraphQLNonNull(GraphQLString) },
  jobTitle: { type: GraphQLNonNull(GraphQLString) },
  email: { type: GraphQLString },
  phone: { type: GraphQLString },
  address: { type: GraphQLString },
};
const argsList = ['fullName',
  'jobTitle',
  'email',
  'phone',
  'address',
  'additionalInfo']

const personalDetailsMutations = {
  updatePersonalDetails: updateOne({
    type: PersonalDetailsType,
    fields: {
      ...personalDetailsScalarProps,
      additionalInfo: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: 'AdditionalInfoUpdate',
            fields: {
              name: { type: GraphQLString },
              input: { type: GraphQLString },
              isLink: { type: GraphQLBoolean },
            },
          })
        ),
      }
    },
    argsList,
    Model: PersonalDetails
  }),
};

module.exports = { personalDetailsScalarProps, personalDetailsMutations };
