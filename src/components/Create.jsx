import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Container, Form, Placeholder } from 'semantic-ui-react';
import { createPost } from '../actions/create';

const Create = () => {
  const [title, setTitle] = useState(''); //Başlık
  const [content, setContent] = useState(''); //İçerik
  const [cover, setCover] = useState(''); //Fotograf
  const [description, setDescription] = useState(''); //Açıklama
  const [actors, setActors] = useState(''); //Oyuncular
  const [director, setDirector] = useState(''); //Yönetmen
  const [production, setProduction] = useState(''); //Yapım
  const [type, setType] = useState(''); //Film tipi
  const [category, setCategory] = useState(''); // Kategori
  const [time, setTime] = useState(''); // Süre
  const [language, setLanguage] = useState(''); //Dil
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
      description,
      actors,
      director,
      production,
      type,
      category,
      time,
      language,
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
          <label>İçerik</label>
          <input name="content" onChange={e => setContent(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Oyuncular</label>
          <input name="actors" onChange={e => setActors(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Yönetmen</label>
          <input name="director" onChange={e => setDirector(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Yapım</label>
          <input name="production" onChange={e => setProduction(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Tip</label>
          <input name="type" onChange={e => setType(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Kategori</label>
          <input name="category" onChange={e => setCategory(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Süre</label>
          <input name="time" onChange={e => setTime(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Dil</label>
          <input name="language" onChange={e => setLanguage(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="cover">Fotoğraf Seç</label>
          <input type="file" onChange={e => setCover(e.target.files)} />
        </Form.Field>
        <Form.Field>
          <label>Açıklama</label>
          <textarea name="description" onChange={e => setDescription(e.target.value)} />
        </Form.Field>
        <Button type="submit">Ekle</Button>
      </Form>
    );
  }

  return <Container>{form}</Container>;
};

export default Create;
