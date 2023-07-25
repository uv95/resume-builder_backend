const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const Content = require("../../../models/Content");
const Settings = require("../../../models/Settings/Settings");
const { ContentType } = require("../content/content");
const { SettingsType } = require("../settings/settings");

exports.ResumeType = new GraphQLObjectType({
    name: 'Resume',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      content: {
        type: ContentType,
        resolve(parent) {
          return Content.findOne({ resumeId: parent._id });
        },
      },
      settings: {
        type: SettingsType,
        resolve(parent) {
          return Settings.findOne({ resumeId: parent._id });
        },
      },
    }),
  });