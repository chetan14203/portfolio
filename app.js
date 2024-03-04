const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const graphqlResolver = require('./graphql/resolver');
const graphqlSchema = require('./graphql/schema');
const auth = require("./middleware/isAuth");
const app = express();

app.use(bodyParser.json());
app.use(auth);
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true,
    rootValue: graphqlResolver,
    customFormatErrorFn: (error) => {
        const message = error.message || 'An unknown error occurred.';
        const code = error.originalError ? error.originalError.code || 500 : 500;
        const data = error.originalError ? error.originalError.data : undefined;
        return { message: message, data: data, status: code };
    }
}));

mongoose.connect('mongodb+srv://choudharyc355:Pass12345@cluster0.oqr2rgt.mongodb.net/Test?retryWrites=true&w=majority&appName=Cluster0')
.then(result => {
    app.listen(4000);
    console.log(`Server is live.`);
})
.catch(error => {
    console.log(error);
})