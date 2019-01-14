import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';

export interface IUser extends Document {
   email: string;
   name: string;
   password: string;
   avatar: object;
   about: string;
   following: any[];
   followers: any[];
}

const userSchema = new Schema(
   {
      email: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         required: 'Email is required',
      },
      name: {
         type: String,
         trim: true,
         unique: true,
         minlength: 4,
         maxlength: 10,
         required: 'Name is required',
      },
      password: {
         type: String,
         trim: true,
         minlength: 4,
         maxlength: 20,
         required: 'Password is required',
      },
      avatar: {
         type: String,
         required: 'Avatar image is required',
         default: '/static/images/profile-image.jpg',
      },
      about: {
         type: String,
         trim: true,
      },
      /* we wrap 'following' and 'followers' in array so that when they are populated as objects,
      they are put in an array (to more easily iterate over them) */
      following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   },
   /* gives us "createdAt" and "updatedAt" fields automatically */
   { timestamps: true },
);
userSchema.pre('save', function(this: any, next: NextFunction) {
   bcrypt.genSalt(10, (err, salt) => {
      if (err) {
         return next(err);
      }
      bcrypt.hash(this.password, salt, (error: Error, hash: any) => {
         if (error) {
            return next(error);
         }
         this.password = hash;
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

export const User = model<IUser>('user', userSchema);
