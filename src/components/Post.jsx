import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
//actions
import { getPost } from '../actions/getPost';
import firebase from '../firebase/config';

const Post = props => {
  const loginSelector = useSelector(state => state.logIn);
  const signinSelector = useSelector(state => state.signIn);

  const [timer, setTimer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userState, setUserState] = useState(null);

  const [defaultTitle, setDefaultTitle] = useState('');
  const [defaultContent, setDefaultContent] = useState('');
  const [fileref, setFileRef] = useState('');

  const [routeRedirect, setRedirect] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const fileRef = useRef(null);

  const [postid, setPostId] = useState('');

  const getPostSelector = useSelector(state => state.post);
  const dispatch = useDispatch();

  const getPostAction = postid => dispatch(getPost(postid));
  const updatePostAction = (postid, post) => dispatch(getPost(postid, post));
  const deletePostAction = (postid, fileref) => dispatch(getPost(postid, fileref));

  let currentPost;
  let editButton;
  let deleteButton;

  useEffect(() => {
    setPostId(props.match.params.id);
    getPostAction(props.match.params.id);

    firebase.getUserState().then(user => {
      if (user) {
        setUserState(user);
      }
    });

    //setTimeout(() => setTimer(false,1000));
  }, []);

  const redirect = routeRedirect;
  if (redirect) {
    return <Redirect to="/" />;
  }

  const updateCurrentPost = async e => {
    e.preventDefault();
  };

  //edit

  //delete
  const deleteCurrentPost = async () => {
    console.log('post delete');
  };

  let updateForm;
  if (editMode) {
    if (
      loginSelector.user.hasOwnProperty('user') ||
      signinSelector.user.hasOwnProperty('user') ||
      (userState != null && isBusy === false)
    ) {
      deleteButton = (
        <button className="delete" onClick={e => deleteCurrentPost()}>
          Delete Post
        </button>
      );
    }
    if (isBusy) {
      updateForm = (
        <div className="processing">
          <p>Request is being processed</p>
          <div className="loader">Loading..</div>
        </div>
      );
    } else {
      updateForm = (
        <React.Fragment>
          <form className="editForm" onSubmit={updateCurrentPost}>
            <p>Update the current Post</p>
            <label htmlFor="title">Post Title:</label>
            <input type="text" name="title" onChange={e => setDefaultTitle(e.target.value)} />

            <label htmlFor="content">Post Content:</label>
            <textarea name="content" onChange={e => setDefaultContent(e.target.value)} />

            <label htmlFor="cover" className="cover">
              Cover:
            </label>
            <input type="file" onChange={e => setFileRef(e.target.value)} />
          </form>
        </React.Fragment>
      );
    }
  }

  if (timer) {
    currentPost = <div className="loader">Loading..</div>;
  } else {
    if (loginSelector.user.hasOwnProperty('user') || signinSelector.user.hasOwnProperty('user') || userState != null) {
      editButton = <button className="edit">Edit Post</button>;
    }
  }

  return <React.Fragment></React.Fragment>;
};

export default Post;
