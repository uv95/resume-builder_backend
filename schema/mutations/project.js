const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} = require('graphql');
const Project = require('../../models/Project');
const Resume = require('../../models/Resume');
const { ProjectType } = require('../types/types');
const { updateAll } = require('./handlerFactory');

const projectScalarProps = {
  title: { type: GraphQLNonNull(GraphQLString) },
  startDate: { type: GraphQLString },
  endDate: { type: GraphQLString },
  description: { type: GraphQLString },
  index: { type: GraphQLInt },
};

const projectMutations = {
  addProject: {
    type: ProjectType,
    args: {
      ...projectScalarProps,
      resumeId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const project = new Project({
        title: args.title,
        startDate: args.startDate || '',
        endDate: args.endDate || '',
        description: args.description || '',
        index: args.index,
        resumeId: args.resumeId,
      });
      const resume = await Resume.findById(args.resumeId);
      if (!resume) throw new Error('Resume does not exist!');
      return project.save();
    },
  },

  deleteProject: {
    type: ProjectType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Project.findByIdAndRemove(args.id);
    },
  },

  updateProject: {
    type: ProjectType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      ...projectScalarProps,
    },
    resolve(parent, args) {
      return Project.findByIdAndUpdate(
        args.id,
        {
          title: args.title,
          startDate: args.startDate,
          endDate: args.endDate,
          description: args.description,
          index: args.index,
        },
        { new: true }
      );
    },
  },

  updateAllProjects: updateAll({
    type: ProjectType,
    inputTypeName: 'ProjectTypeAll',
    fields: {
      ...projectScalarProps,
    },
    argsList: ['title', 'startDate', 'endDate', 'description', 'index'],
    Model: Project,
  }),
};

module.exports = { projectScalarProps, projectMutations };
