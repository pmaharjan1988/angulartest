const express = require('express');
const express_graphql = require('express-graphql');
const { schema, resolver } = require('./server')
var cors = require('cors');

//create an express server and grapql endpoint

const app = express();
app.use(cors())
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
}));

app.listen(3000, () => console.log('express graphql server runing on localhost:3000/graphql'))

