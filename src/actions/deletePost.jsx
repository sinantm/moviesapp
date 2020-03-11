import firebase from '../firebase/config';

export const deletePost = (postid, fileref) => {
  return async function(dispatch) {
    const post = await firebase.updatePost(postid, fileref);
    dispatch({ type: 'DELETE_POST', payload: post });
  };
};
