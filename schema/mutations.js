const { GraphQLObjectType } = require('graphql');
const { resumeMutations } = require('./mutations/resume');
const { settingsMutations } = require('./mutations/settings/settings');
const { headerMutations } = require('./mutations/settings/header/header');
const { subtitleMutations } = require('./mutations/settings/subtitle/subtitle');
const { headingMutations } = require('./mutations/settings/heading/heading');
const { layoutMutations } = require('./mutations/settings/layout/layout');
const { spacingMutations } = require('./mutations/settings/spacing/spacing');
const { colorsMutations } = require('./mutations/settings/colors/colors');
const { educationMutations } = require('./mutations/content/education/education');
const { profileMutations } = require('./mutations/content/profile/profile');
const { personalDetailsMutations } = require('./mutations/content/personalDetails/personalDetails');
const { skillsMutations } = require('./mutations/content/skills/skills');
const { languageMutations } = require('./mutations/content/language/language');
const { projectMutations } = require('./mutations/content/project/project');
const { professionalExperienceMutations } = require('./mutations/content/professionalExperience/professionalExperience');


const allMutations = {
  ...headerMutations,
  ...subtitleMutations,
  ...headingMutations,
  ...layoutMutations,
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
