import { combineReducers } from 'redux';
import createPost from './create';
import deletePost from './deletePost';
import getPost from './getPost';
import getPosts from './getPosts';
import loginUser from './login';
import logoutUser from './logout';
import createUser from './signin';
import updatePost from './updatePost';

const ruducers = combineReducers({
  signIn: createUser,
  logIn: loginUser,
  logOut: logoutUser,
  create: createPost,
  posts: getPosts,
  post: getPost,
  update: updatePost,
  delete: deletePost
});

export default ruducers;
