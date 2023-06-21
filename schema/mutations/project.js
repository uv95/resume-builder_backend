const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');
const { Project, ProjectItem } = require('../../models/Project');
const { ProjectType, ProjectItemType } = require('../types/types');
const { updateOrder, updateOne, deleteOne, addOne, updateSectionName } = require('./handlerFactory');

const projectScalarProps = {
  title: { type: GraphQLNonNull(GraphQLString) },
  startDate: { type: GraphQLString },
  endDate: { type: GraphQLString },
  description: { type: GraphQLString },
  index: { type: GraphQLInt },
};
const argsList = ['title', 'startDate', 'endDate', 'description', 'index']

const projectMutations = {
  updateSectionNameProject: updateSectionName({
    type: ProjectType,
    Model: Project
  }),

  addProject: addOne({
    type: ProjectItemType,
    fields: {
      ...projectScalarProps
    },
    argsList,
    Model: ProjectItem
  }
  ),


  deleteProject: deleteOne({
    type: ProjectItemType,
    Model: ProjectItem
  }),

  updateProject: updateOne({
    type: ProjectItemType,
    fields: {
      ...projectScalarProps
    },
    argsList,
    Model: ProjectItem
  }),

  updateProjectsOrder: updateOrder({
    type: ProjectType,
    inputTypeName: 'ProjectTypeAll',
    fields: {
      ...projectScalarProps,
    },
    argsList,
    Model: Project,
  }),
};

module.exports = { projectScalarProps, projectMutations };
