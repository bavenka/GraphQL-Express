import express from'express';
import graphqlHTTP from 'express-graphql';

import schema from './shema';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000);
