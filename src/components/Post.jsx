import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Form, Grid, Image, Loader, Message } from 'semantic-ui-react';
//actions
import { getPost } from '../actions/getPost';
import CommonButton from '../components/Buttons/CommonButton';
import firebase from '../firebase/config';

const Post = props => {
  const loginSelector = useSelector(state => state.logIn);
  const signinSelector = useSelector(state => state.signIn);

  const [timer, setTimer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userState, setUserState] = useState(null);

  const [defaultTitle, setDefaultTitle] = useState('');
  const [defaultContent, setDefaultContent] = useState('');
  const [defaultDescription, setDefaultDescription] = useState('');
  const [fileref, setFileRef] = useState('');
  const [defaultActors, setDefaultActors] = useState('');
  const [defaultDirector, setDefaultDirector] = useState('');
  const [defaultProduction, setDefaultProduction] = useState('');
  const [defaultType, setDefaultType] = useState('');
  const [defaultCategory, setDefaultCategory] = useState('');
  const [defaultTime, setDefaultTime] = useState('');
  const [defaultLanguage, setDefaultLanguage] = useState('');

  const [routeRedirect, setRedirect] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const fileRef = useRef(null);
  const descriptionRef = useRef(null);
  const actorsRef = useRef(null);
  const directorRef = useRef(null);
  const productionRef = useRef(null);
  const typeRef = useRef(null);
  const categoryRef = useRef(null);
  const timeRef = useRef(null);
  const languageRef = useRef(null);

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
    setTimer(true);
    setPostId(props.match.params.id);
    getPostAction(props.match.params.id);

    firebase.getUserState().then(user => {
      if (user) {
        setUserState(user);
      }
    });

    setTimeout(() => setTimer(false, 1000));
  }, []);

  const redirect = routeRedirect;
  if (redirect) {
    return <Redirect to="/" />;
  }

  const updateCurrentPost = async e => {
    e.preventDefault();
    setIsBusy(true);

    const post = {
      id: postid,
      title: titleRef.current.value,
      content: contentRef.current.value,
      description: descriptionRef.current.value,
      actors: actorsRef.current.value,
      director: directorRef.current.value,
      production: productionRef.current.value,
      type: typeRef.current.value,
      category: categoryRef.current.value,
      time: timeRef.current.value,
      language: languageRef.current.value
    };

    if (fileRef.current.files.lenght > 0) {
      post['cover'] = fileRef.current.files[0];
      post['oldcover'] = getPostSelector.post.fileref;
    }

    await updatePostAction(postid, post);
    setIsBusy(false);
    setRedirect(true);
  };

  //edit
  const editPost = async () => {
    setDefaultTitle(getPostSelector.post.title);
    setDefaultContent(getPostSelector.post.content);
    setFileRef(getPostSelector.post.fileref);
    setDefaultDescription(getPostSelector.post.description);
    setDefaultActors(getPostSelector.post.actors);
    setDefaultDirector(getPostSelector.post.director);
    setDefaultProduction(getPostSelector.post.production);
    setDefaultType(getPostSelector.post.type);
    setDefaultCategory(getPostSelector.post.category);
    setDefaultTime(getPostSelector.post.time);
    setDefaultLanguage(getPostSelector.post.language);

    setEditMode(!editMode);
  };

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
        <CommonButton name="Filmi Sil" icon="delete" type="submit" color="red" onClick={e => deleteCurrentPost()} />
      );
    }
    if (isBusy) {
      updateForm = (
        <div className="processing">
          <p>İstek işleniyor</p>
          <Loader active inline="centered" content="Loading" size="huge" />
        </div>
      );
    } else {
      updateForm = (
        <React.Fragment>
          <Form style={{ marginTop: 20 }} onSubmit={updateCurrentPost}>
            <Form.Field>
              <label>Film Adı Güncelle</label>
              <input type="text" name="title" defaultValue={defaultTitle} ref={titleRef} />
            </Form.Field>
            <Form.Field>
              <label>İçerik Güncelle</label>
              <input name="content" defaultValue={defaultContent} ref={contentRef} />
            </Form.Field>
            <Form.Field>
              <label>Oyuncular</label>
              <input name="actors" defaultValue={defaultActors} ref={actorsRef} />
            </Form.Field>
            <Form.Field>
              <label>Yönetmen</label>
              <input name="director" defaultValue={defaultDirector} ref={directorRef} />
            </Form.Field>
            <Form.Field>
              <label>Yapım</label>
              <input name="production" defaultValue={defaultProduction} ref={productionRef} />
            </Form.Field>
            <Form.Field>
              <label>Tür</label>
              <input name="type" defaultValue={defaultType} ref={typeRef} />
            </Form.Field>
            <Form.Field>
              <label>Kategory</label>
              <input name="category" defaultValue={defaultCategory} ref={categoryRef} />
            </Form.Field>
            <Form.Field>
              <label>Süre</label>
              <input name="time" defaultValue={defaultTime} ref={timeRef} />
            </Form.Field>
            <Form.Field>
              <label>Dil</label>
              <input name="language" defaultValue={defaultLanguage} ref={languageRef} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="cover">Fotoğraf Seç</label>
              <input type="file" ref={fileRef} />
            </Form.Field>
            <Form.Field>
              <label>Açıklama Güncelle</label>
              <textarea name="content" defaultValue={defaultDescription} ref={descriptionRef} />
            </Form.Field>
            <CommonButton name="Güncelle" icon="save" type="submit" color="green" />
          </Form>
        </React.Fragment>
      );
    }
  }

  if (timer) {
    currentPost = <Loader active inline="centered" content="Loading" size="huge" />;
  } else {
    if (loginSelector.user.hasOwnProperty('user') || signinSelector.user.hasOwnProperty('user') || userState != null) {
      editButton = <CommonButton name="Düzenle" icon="edit" type="submit" color="orange" onClick={e => editPost()} />;
    }

    currentPost = (
      <Container>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image src={getPostSelector.post.cover} fluid />
            </Grid.Column>
            <Grid.Column>
              <Message info>
                <Message.Header>Film Adı:</Message.Header>
                <p>{getPostSelector.post.title}</p>
                <Message.Header>İçerik:</Message.Header>
                <p>{getPostSelector.post.content}</p>
                <Message.Header>Oyuncular:</Message.Header>
                <p>{getPostSelector.post.actors}</p>
                <Message.Header>Yönetmen:</Message.Header>
                <p>{getPostSelector.post.director}</p>
                <Message.Header>Yapım:</Message.Header>
                <p>{getPostSelector.post.production}</p>
                <Message.Header>Tür:</Message.Header>
                <p>{getPostSelector.post.type}</p>
                <Message.Header>Kategory:</Message.Header>
                <p>{getPostSelector.post.category}</p>
                <Message.Header>Süre:</Message.Header>
                <p>{getPostSelector.post.type}</p>
                <Message.Header>Dil:</Message.Header>
                <p>{getPostSelector.post.language}</p>
                <Message.Header>Açıklama:</Message.Header>
                <p style={{ marginBottom: 20 }}>{getPostSelector.post.description}</p>
                {editButton}
                {updateForm}
                <div style={{ marginTop: 10 }}>{deleteButton}</div>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <p>{currentPost}</p>
    </React.Fragment>
  );
};

export default Post;
