import {
    GraphQLObjectType,
} from 'graphql';

import {
    addCustomer,
    editCustomer,
    deleteCustomer,
} from './customer-mutations';

const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer,
        editCustomer,
        deleteCustomer,
    }
});

export default rootMutation;