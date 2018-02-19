import {
    GraphQLObjectType,
} from 'graphql';

import {
    company,
} from './company-queries';

import {
    user,
    users,
} from './user-queries';


const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user,
        company,
        users,
    },
});

export default rootQuery;
