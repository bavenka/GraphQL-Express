import axios from 'axios';
import {
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

import companyType from '../types/CompanyType';

export const company = {
    type: companyType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve(parentValue, {
        id
    }) {
        return axios.get(`http://localhost:3000/companies/${id}`)
            .then(res => res.data);
    }
}