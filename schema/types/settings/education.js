const { GraphQLObjectType, GraphQLBoolean } = require("graphql");

exports.EducationSettingsType = new GraphQLObjectType({
    name: 'EducationSettings',
    fields: () => ({
      degreeFirst: { type: GraphQLBoolean },
    }),
  });