
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './others/PrivateRoute';

import Register from './assets/Pages/Register';
import Login from './assets/Pages/Login';
import Dashboard from './assets/Pages/Dashboard';
import PostView from './assets/Pages/PostView';
import CreatePost from './assets/Pages/CreatePost';

function App() {

  return (
    <Router>


      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/sample" element={<Sample />} /> */}

        <Route element={<PrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/dash-board" element={<Dashboard />} />
          <Route path='/posts/:id' element={<PostView />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
