const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const Project = require('../../models/Project');
const Resume = require('../../models/Resume');
const { ProjectType } = require('../types/types');

const projectScalarProps = {
  title: { type: GraphQLNonNull(GraphQLString) },
  startDate: { type: GraphQLString },
  endDate: { type: GraphQLString },
  description: { type: GraphQLString },
};

exports.projectMutations = {
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
        },
        { new: true }
      );
    },
  },
};

module.exports = { projectScalarProps };
