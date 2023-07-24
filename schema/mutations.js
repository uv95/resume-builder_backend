const { GraphQLObjectType } = require('graphql');
const {  
  skillsMutations,
  educationMutations,
  projectMutations,
  professionalExperienceMutations,
  languageMutations,
  profileMutations,
  personalDetailsMutations } = require('./mutations/content');
const { resumeMutations } = require('./mutations/resume');
const { 
  subtitleMutations, 
  colorsMutations, 
  headerMutations, 
  headingMutations,
  layoutMutations,
  spacingMutations,
  settingsMutations } = require('./mutations/settings');

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
