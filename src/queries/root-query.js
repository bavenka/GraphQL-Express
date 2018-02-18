import {
    GraphQLObjectType,
} from 'graphql';

import {
    company,
} from './company-queries';

import {
    customer,
    customers,
} from './customer-queries';


const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer,
        company,
        customers,
    },
});

export default rootQuery;
