import './App.css';
import {Login} from "./Pages/LoginPage/Login";
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './components/form components/Navbar/Navbar';
import Sidebar from './components/form components/Sidebar/Sidebar';
import { Layout } from './Layout/Layout';
import { Footer } from './components/form components/Footer/Footer';
import { Profile } from './Pages/ProfilePage/Profile';
import React from 'react';


function App() {
  const [file,setFile] = React.useState();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          {/* <Route path='/layout' element={<Layout file={file}/>} /> */}
          <Route path='/profile' element={<Profile file={file} setFile={setFile}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
