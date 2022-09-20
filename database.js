const mongoDB = require('mongodb').MongoClient;
const todo = {};
let dbName;
// let initial = ()=>{

// }
todo.connection = () => {
  return new Promise((resolve) => {
    mongoDB.connect('mongodb://localhost:27017', (err, tempDB) => {
      if (err) {
        resolve('No DB Found');
      } else {
        dbName = tempDB.db('userdetails');
        resolve('success');
      }
    });
  });
};
todo.userDetailsInsert = (req) => {
  return new Promise((resolve) => {
    let temp = dbName.collection('data');
    temp.insertOne(req, (err, res) => {
      if (err) {
        resolve('Not Inserted');
      } else {
        resolve(res);
      }
    });
  });
};
todo.userDetailsLogin = (req) => {
  return new Promise((resolve) => {
    let temp = dbName.collection('data');
    temp.find(req).toArray((err, res) => {
      if (err) {
        resolve('No data found');
      } else {
        resolve(res);
      }
    });
  });
};
todo.userDetailsUpdate = (req) => {
  return new Promise((resolve) => {
    let temp = dbName.collection('data');
    let filter = {
      name: req.name,
    };
    let data = {
      $set: { name: req.newName },
    };
    temp.updateOne(filter, data, (err, res) => {
      if (err) {
        resolve('Data Not found');
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = todo;
