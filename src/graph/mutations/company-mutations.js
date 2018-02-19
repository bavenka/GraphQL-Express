import {
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

import companyType from '../types/CompanyType';

import Company from '../../models/Company';

export const addCompany = {
    type: companyType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve(parentValue, args) {
        const company = new Company(args);
        return company.save();
    }
};
