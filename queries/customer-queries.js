import axios from 'axios';
import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from 'graphql';

import customerType from '../types/CustomerType';

export const customer = {
    type: customerType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(parentValue, {
        id
    }) {
        return axios.get(`http://localhost:3000/customers/${id}`)
            .then(res => res.data);
    }
}

export const customers = {
    type: new GraphQLList(customerType),
    resolve(parentValue) {
        return axios.get(`http://localhost:3000/customers`)
            .then(res => res.data);
    }
};