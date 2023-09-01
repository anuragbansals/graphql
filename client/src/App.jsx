import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login"
import Register from "./pages/Register"
import MenuBar from "./components/MenuBar"
import { Container } from 'semantic-ui-react'

import './App.css'

function App() {

  return (
    <Container>
      <MenuBar/>
      <h1>Hi World!</h1>
      <Outlet/>
    </Container>
  )
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      }
    ]
  }
])

export default App
