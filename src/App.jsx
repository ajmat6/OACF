import './App.css';
import React, {useEffect} from "react";
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Home from './components/Home/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Notes from './components/Notes/Notes';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import UserProfile from './components/UserProfile/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './reducers/userAuthReducer';
import NotesByTopic from './components/NotesByTopic/NotesByTopic';
import NotesTwoDeep from './components/NotesTwoDeep/NotesTwoDeep';
import LostAndFound from './components/LostAndFound/LostAndFound';
import YourItems from './components/LostAndFound/YourItems/YourItems';
import UserItemDetail from './components/LostAndFound/UserItemDetail/UserItemDetail';
import YourResponses from './components/LostAndFound/YourResponses/YourResponses';
import EmailVerify from './components/VerifyEmail/EmailVerify';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ForgotPasswordUser from './components/ForgotPassword/ForgotPasswordUser.jsx/ForgotPasswordUser';


const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, [])

  return (
    <>
    <div className='app'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/notes' element={<Notes />}/>
            <Route path='/signin' element={<Signin />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/verify-email' element={<EmailVerify />}/>
            <Route path='/forgot-password' element={<ForgotPassword />}/>
            <Route path='/forgot-password/:token/:userId' element={<ForgotPasswordUser />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/myProfile' element={<UserProfile />}/>
            <Route path='/lost-and-found/allItems' element={<LostAndFound />}/>
            <Route path='/lost-and-found/yourItems' element={<YourItems />}/>
            <Route path='/lost-and-found/your-responses' element={<YourResponses />}/>
            <Route path='/lost-and-found/items/:itemId' element={<UserItemDetail />}/>
            <Route path='/notes/:note' element={<NotesByTopic />}/>
            <Route path='/notes/:note1/:note2' element={<NotesTwoDeep />}/>
          </Routes>
    </div>      
    </>
  )
}

export default App;

