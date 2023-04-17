const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const Links = require('../../models/Links');
const { LinksType } = require('../types');

exports.linksMutations = {
  addLinks: {
    type: LinksType,
    args: {
      website: { type: GraphQLString },
      github: { type: GraphQLString },
      skype: { type: GraphQLString },
      telegram: { type: GraphQLString },
      personalDetailsId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const links = new Links(args);
      return links.save();
    },
  },

  deleteLinks: {
    type: LinksType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Links.findByIdAndRemove(args.id);
    },
  },

  updateLinks: {
    type: LinksType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      website: { type: GraphQLString },
      github: { type: GraphQLString },
      skype: { type: GraphQLString },
      telegram: { type: GraphQLString },
    },
    resolve(parent, args) {
      return Links.findByIdAndUpdate(
        args.id,
        {
          website: args.website,
          github: args.github,
          skype: args.skype,
          telegram: args.telegram,
        },
        { new: true }
      );
    },
  },
};
