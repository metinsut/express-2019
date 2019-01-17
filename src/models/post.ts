import { Schema, Document, model } from 'mongoose';
import { NextFunction } from 'express';

export interface IPost extends Document {
   title: string;
   content: string;
   image: string;
   likes: any[];
   comments: any[];
   postedBy: object;
   createdAt: Date;
}

const postSchema = new Schema(
   {
      title: {
         type: String,
         required: 'Post title is required',
      },
      content: {
         type: String,
         required: 'Post content is required',
      },
      image: {
         type: String,
      },
      likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      comments: [
         {
            text: String,
            createdAt: { type: Date, default: Date.now },
            postedBy: { type: Schema.Types.ObjectId, ref: 'user' },
         },
      ],
      postedBy: { type: Schema.Types.ObjectId, ref: 'user' },
      createdAt: {
         type: Date,
         default: Date.now,
      },
   },
   { autoIndex: false },
);

const autoPopulatePostedBy = function (next: NextFunction) {
   this.populate('postedBy', '_id name avatar');
   this.populate('comments.postedBy', '_id name avatar');
   next();
};

postSchema
   .pre('findOne', autoPopulatePostedBy)
   .pre('find', autoPopulatePostedBy);

postSchema.index({ postedBy: 1, createdAt: 1 });

export const Post = model<IPost>('post', postSchema);