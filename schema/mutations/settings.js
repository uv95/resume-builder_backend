const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const Settings = require('../../models/Settings');
const Resume = require('../../models/Resume');
const { SettingsType } = require('../types');

exports.settingsMutations = {
  updateSettings: {
    type: SettingsType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      sectionsOrder: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return Settings.findByIdAndUpdate(
        args.id,
        {
          sectionsOrder: args.sectionsOrder,
        },
        { new: true }
      );
    },
  },
};
