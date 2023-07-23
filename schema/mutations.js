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
const { colorsMutations } = require('./mutations/settings/colors');
const { spacingMutations } = require('./mutations/settings/spacing');

const allMutations = {
  ...spacingMutations,
  ...colorsMutations,
  ...educationMutations,
  ...resumeMutations,
  ...profileMutations,
  ...personalDetailsMutations,
  ...skillsMutations,
  ...languageMutations,
  ...projectMutations,
  ...professionalExperienceMutations,
  ...settingsMutations,
};

exports.mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: allMutations,
});
