const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

exports.LayoutType = new GraphQLObjectType({
    name: 'Layout',
    fields: () => ({
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