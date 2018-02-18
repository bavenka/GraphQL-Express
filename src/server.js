import express from'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import schema from './shema';
import config from '../config';

const port = 4000;
const { MONGO_URI } = config;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

mongoose.connect(MONGO_URI);
mongoose.Promise = global.Promise;
mongoose.connection
  .on('error', console.error.bind(console, 'MongoDB connection error:'))
  .once('open', () => {
    app.listen(port);
    console.log(`We are live on ${port}`)
  });



