const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://pj441595:Vidit121@cluster0.w8lhgc5.mongodb.net/foodapp?retryWrites=true&w=majority';

const usersCollectionName = 'users';

const MongoDb = async () => {
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true });
    console.log('Connected to MongoDB');

    const fetchedData = await mongoose.connection.db.collection(usersCollectionName);
    const data = await fetchedData.find({}).toArray();
    // console.log(data);
    global.users = data;
    // console.log(global.users);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = MongoDb;
