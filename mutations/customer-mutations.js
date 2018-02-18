import axios from 'axios';
import {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql';

import customerType from '../types/CustomerType';

export const addCustomer = {
    type: customerType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        age: {
            type: new GraphQLNonNull(GraphQLInt)
        },
    },
    resolve(parentValue, args) {
        return axios.post(`http://localhost:3000/customers`, args)
            .then(res => res.data);
    }
}

export const editCustomer = {
    type: customerType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        age: {
            type: new GraphQLNonNull(GraphQLInt)
        },
    },
    resolve(parentValue, args) {
        return axios.patch(`http://localhost:3000/customers/${args.id}`, args)
            .then(res => res.data);
    }
}

export const deleteCustomer = {
    type: customerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:3000/customers/${id}`)
            .then(res => res.data);
    }
}