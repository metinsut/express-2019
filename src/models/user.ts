import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
   email: string;
   password: string;
}

export const userSchema = new Schema({
   email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
});

userSchema.pre('save', function (next) {
   const user: any = this;
   bcrypt.genSalt(10, (err, salt) => {
      if (err) {
         return next(err);
      }

      bcrypt.hash(user.password, salt, (error, hash) => {
         if (error) {
            return next(error);
         }
         user.password = hash;
         next();
      });
   });
});

userSchema.methods.comparePassword = (
   candidatePassword: any,
   callback: any,
) => {
   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
         return callback(err);
      }
      callback(null, isMatch);
   });
};

const User = mongoose.model<IUser>('user', userSchema);
export default User;
