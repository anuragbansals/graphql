import React from 'react'
import { useQuery , gql} from '@apollo/client';
// import gql from 'graphql-tag';

function Home() {
  const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);
  console.log(error, 'zzz errr')

  if (data) {
    console.log(data)
  }
  return (
    <div>Home</div>
  )
}

const FETCH_POSTS_QUERY = gql`
query{
  getPosts{
    id body createdAt username likeCount
    likes {
      username
    }
    commentCount
    comments{
      id username createdAt body
      }
    } 
}
    
`

export default Home