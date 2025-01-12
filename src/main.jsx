import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { AddPost, AllPosts, EditPost, Home, Login, Post, Signup } from './pages/index'
import { Provider } from 'react-redux'
import store from './store/store';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { AuthLayout } from './components/index';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='' element={<Home />}/>
      <Route path='login' element={<Login />}/>
      <Route path='signup' element={(
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      )}/>
      <Route path='all-posts' element={(
        <AuthLayout authentication>
          {" "}
          <AllPosts />
        </AuthLayout>
      )}/>
      <Route path='add-post' element={(
        <AuthLayout authentication>
          {" "}
          <AddPost />
        </AuthLayout>
      )}/>
      <Route path='edit-post/:slug' element={(
        <AuthLayout authentication>
          {" "}
          <EditPost />
        </AuthLayout>
      )}/>
      <Route path='post/:slug' element={<Post />}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)