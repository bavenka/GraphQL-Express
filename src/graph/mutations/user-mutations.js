import axios from 'axios';
import {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql';

import userType from '../types/UserType';

export const addUser = {
    type: userType,
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
        return axios.post(`http://localhost:3000/users`, args)
            .then(res => res.data);
    }
};

export const editUser = {
    type: userType,
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
        return axios.patch(`http://localhost:3000/users/${args.id}`, args)
            .then(res => res.data);
    }
};

export const deleteUser = {
    type: userType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:3000/users/${id}`)
            .then(res => res.data);
    }
};
