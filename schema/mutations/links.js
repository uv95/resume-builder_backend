const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const Links = require('../../models/Links');
const PersonalDetails = require('../../models/PersonalDetails');
const { LinksType } = require('../types');

exports.linksMutations = {
  addLink: {
    type: LinksType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      link: { type: GraphQLNonNull(GraphQLString) },
      personalDetailsId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const links = new Links(args);
      const personalDetails = await PersonalDetails.findById(
        args.personalDetailsId
      );
      if (!personalDetails)
        throw new Error('Please add your full name and job title first!');
      return links.save();
    },
  },

  deleteLink: {
    type: LinksType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Links.findByIdAndRemove(args.id);
    },
  },

  updateLink: {
    type: LinksType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      link: { type: GraphQLString },
    },
    resolve(parent, args) {
      return Links.findByIdAndUpdate(
        args.id,
        {
          name: args.name,
          link: args.link,
        },
        { new: true }
      );
    },
  },
};
