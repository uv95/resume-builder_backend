const {
   GraphQLNonNull,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLEnumType,
  } = require('graphql');
const { Layout } = require('../../../models/Settings');
const { LayoutType } = require('../../types/settings/layout');

  
  exports.layoutMutations = {
    updateLayout: {
      type: LayoutType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        columns: { type: GraphQLInt, defaultValue: 1 },
        position: {
          type: new GraphQLEnumType({
            name: 'Position',
            values: {
              top: { value: 'top' },
              left: { value: 'left' },
              right: { value: 'right' },
            },
          }),
          defaultValue: 'top',
        },
        columnWidth: {
          type: new GraphQLInputObjectType({
            name: 'ColumnWidthInput',
            fields: {
              left: { type: GraphQLInt, defaultValue: 50 },
              right: { type: GraphQLInt, defaultValue: 50 },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Layout.findByIdAndUpdate(
          args.id,
          {
            columns: args.columns,
            position: args.position,
            columnWidth: args.columnWidth,
          },
          { new: true }
        );
      },
    },
  };
  