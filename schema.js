const axios = require('axios');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

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
        customers: {
            type: new GraphQLList(customerType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/customers`)
                    .then(res => res.data);
            }
        }
    }),
});

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

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: customerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return axios.get(`http://localhost:3000/customers/${id}`)
                    .then(res => res.data);
            }
        },
        company: {
            type: companyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return axios.get(`http://localhost:3000/companies/${id}`)
                    .then(res => res.data);
            }
        },
        customers: {
            type: new GraphQLList(customerType),
            resolve(parentValue) {
                return axios.get(`http://localhost:3000/customers`)
                    .then(res => res.data);
            }
        },

    },
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: customerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parentValue, args) {
                return axios.post(`http://localhost:3000/customers`, args)
                    .then(res => res.data);
            }
        },
        deleteCustomer: {
            type: customerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, { id }) {
                return axios.delete(`http://localhost:3000/customers/${id}`)
                    .then(res => res.data);
            }
        },
        editCustomer: {
            type: customerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3000/customers/${args.id}`, args)
                    .then(res => res.data);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation,
});
