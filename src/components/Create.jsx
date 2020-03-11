import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Container, Form, Placeholder } from 'semantic-ui-react';
import { createPost } from '../actions/create';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState('');
  const [routeRedirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const createPostAction = post => dispatch(createPost(post));

  const redirect = routeRedirect;

  if (redirect) {
    return <Redirect to="/" />;
  }

  const addPost = async e => {
    e.preventDefault();
    setLoading(true);
    let post = {
      title,
      content,
      cover: cover[0]
    };

    await createPostAction(post);
    setLoading(false);
    setRedirect(true);
  };

  let form;
  if (loading) {
    form = (
      <Placeholder fluid>
        <Placeholder.Header>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    );
  } else {
    form = (
      <Form onSubmit={addPost}>
        <Form.Field>
          <label>Film Adı</label>
          <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Açıklama</label>
          <textarea name="content" onChange={e => setContent(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="cover">Fotoğraf Seç</label>
          <input type="file" onChange={e => setCover(e.target.files)} />
        </Form.Field>
        <Button type="submit">Ekle</Button>
      </Form>
    );
  }

  return <Container>{form}</Container>;
};

export default Create;
