const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNoneNull,
} = require('graphql');

const customers = [{
        id: '1',
        name: 'pavel',
        email: 'pavel@mail.ru',
        age: 22
    },
    {
        id: '2',
        name: 'nascia',
        email: 'bavenka@mail.ru',
        age: 19,
    },
];

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
                return customers.find(customer => customer.id === args.id );
            }
        },
        customers: {
            type: new GraphQLList(customerType),
            resolve(parentValue, args) {
                return customers;
            }
        }
    },
});


module.exports = new GraphQLSchema({
    query: rootQuery,
});