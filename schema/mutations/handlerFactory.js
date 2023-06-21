const {
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} = require('graphql');
const Resume = require('../../models/Resume');

exports.addOne = ({ type, fields, argsList, Model }) => {
  const mutation = {
    type,
    args: {
      resumeId: { type: GraphQLNonNull(GraphQLID) },
      ...fields
    },
    async resolve(parent, args) {
      const newItem = new Model({
        ...argsList.reduce((acc, cur) => {
          acc = { ...acc, [cur]: args[cur] };
          return acc;
        }, {}),
        resumeId: args.resumeId,
      });
      const resume = Resume.findById(args.resumeId);
      if (!resume) throw new Error('Resume does not exist!');
      return newItem.save();
    },
  }

  return mutation
}

exports.updateSectionName = ({ type, Model }) => {
  const mutation = {
    type,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      sectionName: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
      return Model.findByIdAndUpdate(
        args.id,
        {
          sectionName: args.sectionName
        },
        { new: true }
      )
    }
  }
  return mutation
}

exports.updateOrder = ({ type, inputTypeName, fields, argsList, Model }) => {
  const mutation = {
    type: new GraphQLList(type),
    args: {
      items: {
        type: new GraphQLList(
          new GraphQLInputObjectType({
            name: inputTypeName,
            fields: {
              id: { type: GraphQLNonNull(GraphQLID) },
              ...fields,
            },
          })
        ),
      },
    },
    resolve(parent, args) {
      let itemsList = [];
      args.items.forEach((arg) => {
        const item = Model.findByIdAndUpdate(
          arg.id,
          {
            ...argsList.reduce((acc, cur) => {
              acc = { ...acc, [cur]: arg[cur] };
              return acc;
            }, {}),
          },
          { new: true }
        );
        itemsList.push(item);
      });

      return itemsList;
    },
  };

  return mutation;
};

exports.updateOne = ({ type, fields, argsList, Model }) => {
  const mutation = {
    type,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      ...fields
    },
    resolve(parent, args) {
      return Model.findByIdAndUpdate(
        args.id,
        {
          ...argsList.reduce((acc, cur) => {
            acc = { ...acc, [cur]: args[cur] };
            return acc;
          }, {}),
        },
        { new: true }
      );
    }
  }
  return mutation;

}

exports.deleteOne = ({ type, Model }) => {
  const mutation = {
    type,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Model.findByIdAndRemove(args.id);
    },
  }
  return mutation;

}
