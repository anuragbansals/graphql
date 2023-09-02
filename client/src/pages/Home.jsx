import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
// import gql from 'graphql-tag';

import { Grid, Image } from "semantic-ui-react";
import PostCard from "../components/PostCard";

function Home() {
  const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      if (data.getPosts) {
        setPosts(data.getPosts);
      }
    }
  }, [data]);

  // const {getPosts: posts} = data;
  console.log(posts,'zz dd')

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title" >
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{marginBottom:20}} >
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
