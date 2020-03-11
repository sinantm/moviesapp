import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Container, Image } from 'semantic-ui-react';
import { getPosts } from '../actions/getPosts';

const Main = () => {
  const getPostsSelector = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const getPostsAction = () => dispatch(getPosts());

  useEffect(() => {
    getPostsAction();
  }, []);

  return (
    <React.Fragment>
      <Container textAlign="justified">
        <div className="posts">
          <Card.Group>
            {getPostsSelector.posts.map(post => {
              return (
                <Card key={post.id}>
                  <Image src={post.data.cover} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>
                      <Link to={'post/' + post.id}>
                        <p>{post.data.title}</p>
                      </Link>
                    </Card.Header>
                    <Card.Meta>
                      <span className="date">1978 Yapım</span>
                    </Card.Meta>
                    <Card.Description>{post.data.content}</Card.Description>
                  </Card.Content>
                  <Card.Content extra></Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Main;
