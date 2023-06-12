const { GraphQLObjectType } = require('graphql');
const { educationMutations } = require('./mutations/education');
const { profileMutations } = require('./mutations/profile');
const { resumeMutations } = require('./mutations/resume');
const { personalDetailsMutations } = require('./mutations/personalDetails');
const { skillsMutations } = require('./mutations/skills');
const { languageMutations } = require('./mutations/language');
const {
  professionalExperienceMutations,
} = require('./mutations/professionalExperience');
const { projectMutations } = require('./mutations/project');
const { settingsMutations } = require('./mutations/settings');
const { contentMutations } = require('./mutations/content');

const allMutations = {
  ...educationMutations,
  ...resumeMutations,
  ...profileMutations,
  ...personalDetailsMutations,
  ...skillsMutations,
  ...languageMutations,
  ...projectMutations,
  ...professionalExperienceMutations,
  ...settingsMutations,
  ...contentMutations,
};

exports.mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: allMutations,
});
