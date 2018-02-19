import axios from 'axios';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from 'graphql';

import userType from './UserType';


const companyType = new GraphQLObjectType({
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
        users: {
            type: new GraphQLList(userType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(res => res.data);
            }
        }
    }),
});

export default companyType;
