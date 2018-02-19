import axios from 'axios';
import {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql';

import userType from '../types/UserType';

import User from '../../models/User';

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
        const user = new User(args);
        return user.save();
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
        return User.findByIdAndUpdate(args.id, args, {new: true})
            .then(user => user)
    }
};

export const deleteUser = {
    type: userType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:3000/users/${id}`)
            .then(res => res);
    }
};
