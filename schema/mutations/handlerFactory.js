const {
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');

exports.updateAll = ({ type, inputTypeName, fields, argsList, Model }) => {
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
