import axios from 'axios';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} from 'graphql';

import companyType from './CompanyType';


const customerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        company: {
            type: companyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data);
            }
        }
    }),
});

export default customerType;