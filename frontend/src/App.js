import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import { message } from 'antd';

import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import MoodChoice from './Components/MoodChoice';
import TimeRecord from './Components/TimeRecord';
import PostShare from './Components/PostShare';
import LightBulb from './Components/LightBulb';
import Damn from './Components/Damn';
import PositivePost from './Components/PositivePost';
import Blank from './Components/Blank';

const App = () => {
  const [me, setMe] = useState("");
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg, duration: 3 }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }
  return (
    <div className="App">
        <Routes>
              <Route path='/' element={<LogIn setMe={setMe} displayStatus={displayStatus}/>} />
              <Route path='/sign-in' element={<LogIn setMe={setMe} displayStatus={displayStatus}/>} />
              <Route path='/sign-up' element={<SignUp setMe={setMe} displayStatus={displayStatus}/>} /> 
              <Route path='/mood-choice' element={<MoodChoice />} />
              <Route path='/time-record' element={<TimeRecord me={me} displayStatus={displayStatus}/>} />
              <Route path='/post-share' element={<PostShare me={me} displayStatus={displayStatus}/>} />
              <Route path='/light-bulb' element = {<LightBulb/>} />
              <Route path='/damn' element={<Damn me={me} displayStatus={displayStatus}/>} />
              <Route path='/positive-post' element={<PositivePost me={me}/>} />
              <Route path='/blank-mind' element={<Blank/>} />
        </Routes>
    </div>
  );
};

export default App;