const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const Links = require('../../models/Links');
const { LinksType } = require('../types');

exports.linksMutations = {
  addLink: {
    type: LinksType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      link: { type: GraphQLNonNull(GraphQLString) },
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
