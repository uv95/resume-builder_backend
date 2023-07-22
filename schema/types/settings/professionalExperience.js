const { GraphQLObjectType, GraphQLBoolean } = require("graphql");

 exports.ProfessionalExperienceSettingsType = new GraphQLObjectType({
    name: 'ProfessionalExperienceSettings',
    fields: () => ({
      jobTitleFirst: { type: GraphQLBoolean },
    }),
  });