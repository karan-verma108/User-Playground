const mongoose = require('mongoose');
let { MongoClient } = require('mongodb');
let mongoUrl = `mongodb+srv://<username>:<password>@cluster0.37hosfn.mongodb.net/<database_name>?retryWrites=true&w=majority`;
let client = new MongoClient(mongoUrl);

const dbConnect = async () => {
    try {
        await client.connect();
        console.log('Connection to the database is successfull!');
    } catch (error) {
        console.log(error);
    }
}

let db = client.db('test');

const getData = async (colName, query) => {
    let output = [];
    try {
        let dataFound = await db.collection(colName).find(query);
        for await (const data of dataFound) {
            output.push(data);
        }
        dataFound.closed
    } catch (error) {
        output.push({ 'Error': 'No data found!' });
    }
    return output;
}

module.exports = { dbConnect, getData };