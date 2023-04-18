const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const Links = require('../../models/Links');
const { LinksType } = require('../types');

exports.linksMutations = {
  addLink: {
    type: LinksType,
    args: {
      link: { type: GraphQLString },
      personalDetailsId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const links = new Links(args);
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
      link: { type: GraphQLString },
    },
    resolve(parent, args) {
      return Links.findByIdAndUpdate(
        args.id,
        {
          link: args.link,
        },
        { new: true }
      );
    },
  },
};
