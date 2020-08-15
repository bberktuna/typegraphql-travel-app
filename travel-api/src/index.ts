import "reflect-metadata";
import {createConnection, getConnectionOptions} from "typeorm";
import express from "express"
import session from "express-session"
import connectSqlite3 from "connect-sqlite3"
import { ApolloServer } from "apollo-server-express"
import {buildSchema} from "type-graphql"
import { PlaceResolver } from "./resolvers/PlaceResolver";
import * as path from 'path';

const SQLiteStore = connectSqlite3(session)

async function bootstrap(){
    const app = express()

    app.use(
        session({
            store: new SQLiteStore({
                db: "database.sqlite",
                concurrentDB: true
            }),
            name: "qid",
            secret: process.env.SESSION_SECRET || "random_secret_wqdvqw",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365
            }
        })
    )
    //get config options from ormconfig.js
    const dbOptions = await getConnectionOptions(
        process.env.NODE_ENC || "development"
    )


createConnection({ ...dbOptions, name: "default"})
.then(async () => {
    // 1) BUILD SERVER SCHEMA
    const schema = await buildSchema({
        // add all typescript resolvers
        // __dirname + '/resolvers/*.ts'
        resolvers: [PlaceResolver],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql')
      });
      
      // Create GraphQL server
      const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        introspection: true,
        // enable GraphQL Playground
        playground: true
      });
      
      apolloServer.applyMiddleware({ app, cors: true });
      
      const port = process.env.PORT || 4000;
      // Start the server
      app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}/graphql`);
      });
})
  .catch(error => console.log(error));
}

bootstrap()