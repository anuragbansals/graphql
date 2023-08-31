import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import ApolloProvider from './ApolloProvider';

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <ApolloProvider />
// )


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(ApolloProvider)