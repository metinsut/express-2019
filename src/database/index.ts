import mongoose from 'mongoose';

export const database = () => {
   mongoose.connect(
      'mongodb://auth:A123456@ds253960.mlab.com:53960/auth',
      { useNewUrlParser: true },
   );

   mongoose.connection.on('error', (err) => {
      console.log('MongoDB: Error', err);
   });

   mongoose.connection.once('open', () => {
      console.log('we\'re connected! ');
   });

   mongoose.Promise = global.Promise;
};
