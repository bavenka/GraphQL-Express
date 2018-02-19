import {
    GraphQLObjectType,
} from 'graphql';

import {
    addUser,
    editUser,
    deleteUser,
} from './user-mutations';
import  {
    addCompany,
} from './company-mutations';

const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser,
        editUser,
        deleteUser,
        addCompany,
    }
});

export default rootMutation;
