const {
  GraphQLString,
  GraphQLNonNull,

  GraphQLInt,

} = require('graphql');

const { Profile, ProfileItem } = require('../../../../models/Profile');
const { ProfileType, ProfileItemType } = require('../../../types/content/profile/profile');
const { updateOrder, updateOne, deleteOne, addOne, updateSectionName } = require('../../handlerFactory');

const argsList = ['text', 'index']

exports.profileMutations = {
  updateSectionNameProfile: updateSectionName({
    type: ProfileType,
    Model: Profile
  }),

  addProfile: addOne({
    type: ProfileItemType,
    fields: {
      text: { type: GraphQLNonNull(GraphQLString) },
      index: { type: GraphQLInt }
    },
    argsList,
    Model: ProfileItem
  }
  ),

  deleteProfile: deleteOne({
    type: ProfileItemType,
    Model: ProfileItem
  }),

  updateProfile: updateOne({
    type: ProfileItemType,
    fields: {
      text: { type: GraphQLNonNull(GraphQLString) },
      index: { type: GraphQLInt }
    },
    argsList,
    Model: ProfileItem
  }),

  updateProfileOrder: updateOrder({
    type: ProfileItemType,
    inputTypeName: 'ProfileOrder',
    fields: {
      text: { type: GraphQLNonNull(GraphQLString) },
      index: { type: GraphQLInt },
    },
    argsList,
    Model: ProfileItem,
  }),
};
