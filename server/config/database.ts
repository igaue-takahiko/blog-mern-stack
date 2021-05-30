import mongoose from 'mongoose';

const URL = process.env.MONGODB_URL

mongoose.connect(`${URL}`, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error) => {
  if (error) {
    throw error
  }
  console.log('MongoDB connection.');
})
