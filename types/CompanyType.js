import axios from 'axios';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from 'graphql';

import customerType from './CustomerType';


const commpanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        customers: {
            type: new GraphQLList(customerType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/customers`)
                    .then(res => res.data);
            }
        }
    }),
});

export default commpanyType;