import {
    GraphQLObjectType,
} from 'graphql';

import {
    addUser,
    editUser,
    deleteUser,
} from './user-mutations';

const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser,
        editUser,
        deleteUser,
    }
});

export default rootMutation;
