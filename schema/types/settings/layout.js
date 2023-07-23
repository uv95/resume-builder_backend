const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID } = require("graphql");

exports.LayoutType = new GraphQLObjectType({
    name: 'Layout',
    fields: () => ({
      id: { type: GraphQLID },
      columns: { type: GraphQLInt },
      position: { type: GraphQLString },
      columnWidth: {
        type: new GraphQLObjectType({
          name: 'ColumnWidth',
          fields: () => ({
            left: { type: GraphQLInt },
            right: { type: GraphQLInt },
          }),
        }),
      },
    }),
  });