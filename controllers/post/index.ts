import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import multer from 'multer';
import jimp from 'jimp';
import { Post } from './../../models/post';

const imageUploadOptions = {
   storage: multer.memoryStorage(),
   limits: {
      fileSize: 1024 * 1024 * 1,
   },
   fileFilter: (req: Request, file: any, next: any) => {
      if (file.mimetype.startsWith('image/')) {
         next(null, true);
      } else {
         next(null, false);
      }
   },
};

const uploadImage = multer(imageUploadOptions).single('image');

const resizeImage = async (req: Request, res: Response, next: NextFunction) => {
   if (!req.file) {
      return next();
   }
   const fileName = req.file.mimetype.split('/')[0];
   const extension = req.file.mimetype.split('/')[1];
   req.body.image = `/static/uploads/posts/${req.user._id}/${fileName}-${Date.now()}.${extension}`;
   const image = await jimp.read(req.file.buffer);
   await image.resize(750, jimp.AUTO);
   await image.write(`./${req.body.image}`);
   next();
};

const addPost = async (req: Request, res: Response) => {
   req.body.postedBy = req.user._id;
   const postData = await new Post(req.body).save();
   Post.populate(postData, {
      path: 'postedBy',
      select: '_id name avatar',
   });
   res.json({
      error: null,
      success: {
         post: postData,
      },
   });
};

const getPosts = () => {
   console.log('test');
};

const deletePost = async (req: Request, res: Response) => {
   const { postId } = req.params;
   const post = await Post.findOne({ _id: postId });
   const postOwnerId = Types.ObjectId(post.postedBy._id);
   const ownerId = Types.ObjectId(req.user._id);
   if (postOwnerId.toString() !== ownerId.toString()) {
      return res.status(400).json({
         error: {
            message: 'You are not authorized to perform this action',
         },
         success: null,
      });
   } else {
      Post.findOneAndDelete({ _id: postId })
         .then((data) => {
            res.json({
               error: null,
               success: {
                  message: 'Your post successfully deleted.',
               },
            });
         })
         .catch((err) => {
            res.json({
               error: {
                  message: 'Error',
                  error: err,
               },
               success: null,
            });
         });
   }

};

export { getPosts, uploadImage, resizeImage, addPost, deletePost };
