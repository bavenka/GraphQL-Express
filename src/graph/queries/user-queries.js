import axios from 'axios';
import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from 'graphql';

import userType from '../types/UserType';

export const user = {
    type: userType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(parentValue, {
        id
    }) {
        return axios.get(`http://localhost:3000/users/${id}`)
            .then(res => res.data);
    }
};

export const users = {
    type: new GraphQLList(userType),
    resolve(parentValue) {
        return axios.get(`http://localhost:3000/users`)
            .then(res => res.data);
    }
};
