import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './notes.css'
import {FaGithub} from 'react-icons/fa'
import {AiFillBook} from 'react-icons/ai'
import Me from '../../assets/myphoto.jpg'
import NotesPhoto from '../../assets/notesPhoto.jpg'
import Layout from '../Layout/Layout'
import {useSelector, useDispatch} from 'react-redux'
import { getFrontTopics, getNotesByParent } from '../../reducers/notesUserReducer'
import { generatePublicURL } from '../../urlConfig'
import monkey from '../../assets/sorryMonkey.png'

function Notes() {
  const notes = useSelector((state) => state.uNotes);
  const auth = useSelector((state) => state.auth);
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadNotes = (parentId) => {
    dispatch(getNotesByParent(parentId));
  }

  useEffect(() => {
    // if(!auth.authenticate)
    // {
    //   navigate('/signin')
    // }

    dispatch(getFrontTopics());
  }, [])

  return (
    <Layout>
      <section id='notes'>
        <h5 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Get All Notes</h5>
        <h2>If you have any kind of notes, do share!</h2>

        {
          notes.loading ?
            <div id='loader' className='w-full mx-auto'></div> :
            notes.notesTopics.length == 0 ?
            <div className={`text-center`}>
                <img src={monkey} alt="not available"  className='w-[200px] h-[200px] inline'/>
                <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Notes not availble!</div>
            </div> :
          <div className="container note-container">
            {
              notes.notesTopics.map((item, index) => {
                return (
                  <article key={index} className={`${mode.mode == 'light' ? 'hover:bg-black' : 'hover:bg-transparent'} note-item`}>
                    <div className="note-item-image">
                      <img className='note-photo' src={generatePublicURL(item.notesImage)} alt={item.title} />
                    </div>
                    <h3>{item.title}</h3>
                    <Link to={`/notes/pid1=${item._id}`} className="btn btn-primary">See Notes<span><AiFillBook className="notePhoto"/></span></Link>
                  </article>
                )
              })
            }
          </div>

        }
      </section>
    </Layout>
  )
}

export default Notes