const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const url = mongodb://127.0.0.1:27017;
const urlMongoDocker = 'mongodb://mongodb:27017';
const dbName = 'todoListDB';
const collectionName = 'tasks';

const schema = buildSchema(`
  type Task {
    _id: ID!
    task: String!
    completed: Boolean!
    completedTime: String
    creationTime: String!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    addTask(task: String!): Task!
    deleteTask(id: ID!): Boolean!
    updateTaskCompletion(id: ID!): Boolean!
  }
`);

const client = new MongoClient(url, { useUnifiedTopology: true });

const root = {
  tasks: async () => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const tasks = await collection.find().toArray();
      return tasks;
    } catch (err) {
      console.error('Error retrieving tasks:', err);
      throw err;
    } finally {
      await client.close();
    }
  },
  addTask: async ({ task }) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const newTask = {
        task,
        completed: false,
        completedTime: null,
        creationTime: new Date().toISOString(),
      };
      const result = await collection.insertOne(newTask);
      return { ...newTask, _id: result.insertedId.toString() };
    } catch (err) {
      console.error('Error adding task:', err);
      throw err;
    } finally {
      await client.close();
    }
  },
  deleteTask: async ({ id }) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (err) {
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      await client.close();
    }
  },
  updateTaskCompletion: async ({ id }) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { completed: true, completedTime: new Date().toISOString() } }
      );
      return 1;
    } catch (err) {
      console.error('Error completing task:', err);
      throw err;
    } finally {
      await client.close();
    }
  },
};

const app = express();

// Allow cross-origin requests
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('GraphQL server running at http://localhost:4000/graphql');
});
