const axios = require('axios');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} = require('graphql');


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
    }),
});

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: customerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/customers/${args.id}`)
                    .then(res => res.data);
            }
        },
        customers: {
            type: new GraphQLList(customerType),
            args: {
                id: { type: GraphQLString }
            },
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
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parentValue, args) {
                return axios.post(`http://localhost:3000/customers`, args)
                    .then(res => res.data);
            }
        },
        deleteCustomer: {
            type: customerType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios.delete(`http://localhost:3000/customers/${args.id}`)
                    .then(res => res.data);
            }
        },
        editCustomer: {
            type: customerType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parentValue, args) {
                return axios.put(`http://localhost:3000/customers/${args.id}`, args)
                    .then(res => res.data);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation,
});
