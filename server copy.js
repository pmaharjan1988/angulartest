const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql')

//schema
const schema = buildSchema(`
    type Query{
        message:String
    }
`);

//root resolver
const resolver = {
    message: () => 'Hello World!'
}

//create an express server and grapql endpoint

const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
}));

app.listen(3000, () => console.log('express graphql server runing on localhost:3000/graphql'))

