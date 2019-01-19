import express, { Request, Response, NextFunction } from 'express';
import Home from '../controllers/Home/home';
import passportService from '../controllers/middleware/passport';
import { signUp, validateSignUp } from '../controllers/auth/signUp';
import { signIn } from '../controllers/auth/signIn';
import {
   getUserById,
   uploadAvatar,
   resizeAvatar,
   updateUser,
   getUsers,
   getUserAccount,
   deleteUser,
   addFollowing,
   addFollower,
   deleteFollower,
   deleteFollowing,
   getUserUnFollow,
} from '../controllers/user';
import {
   getPosts,
   uploadImage,
   resizeImage,
   addPost,
   deletePost,
   getPostsByUser,
   toggleLike,
   toggleComment,
} from '../controllers/post';
import signOut from '../controllers/auth/signOut';
import verifyUser from '../controllers/middleware/verifyUser';

const router = express.Router();
passportService();

/* Error handler for async / await functions */
const catchErrors = (fn: any) => {
   return (req: Request, res: Response, next: NextFunction) => {
      return fn(req, res, next).catch(next);
   };
};

router.post('/', Home);

router.post('/signup', validateSignUp, catchErrors(signUp));
router.post('/signin', signIn);
router.post('/signout', signOut);

router.post('/users', verifyUser, getUsers);
router.post('/users/getunfollow', verifyUser, getUserUnFollow);
router.post('/users/profile/:userId', verifyUser, getUserById);
router.post('/users/account/:userId', verifyUser, getUserAccount);
router.post(
   '/users/update/:userId',
   verifyUser,
   uploadAvatar,
   catchErrors(resizeAvatar),
   catchErrors(updateUser),
);
router.post('/users/delete/:userId', verifyUser, deleteUser);
router.post('/users/follow', verifyUser, addFollowing, addFollower);
router.post('/users/unfollow', verifyUser, deleteFollowing, deleteFollower);

router.post('/posts', verifyUser, getPosts);
router.post(
   '/posts/new',
   verifyUser,
   uploadImage,
   catchErrors(resizeImage),
   catchErrors(addPost),
);
router.post('/posts/delete/:postId', verifyUser, catchErrors(deletePost));
router.post('/posts/by/:userId', verifyUser, getPostsByUser);
router.post('/posts/like', verifyUser, catchErrors(toggleLike));
router.post('/posts/unlike', verifyUser, catchErrors(toggleLike));
router.post("/api/posts/comment", verifyUser, catchErrors(toggleComment));
router.post("/api/posts/uncomment", verifyUser, catchErrors(toggleComment));

export default router;
