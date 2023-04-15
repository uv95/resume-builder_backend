const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const port = process.env.PORT || 5000;
const connectDB = require('./db');
const app = express();

connectDB();

app.use(cors());
