import React, {useEffect} from 'react'
import Layout from '../Layout/Layout'
import './notebytopic.css'
import {AiFillBook} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import { getNotesByParent } from '../../reducers/notesUserReducer'
import {Link, useNavigate} from 'react-router-dom'
import { generatePublicURL } from '../../urlConfig'
import {useParams} from 'react-router-dom'
import monkey from '../../assets/sorryMonkey.png'

const NotesByTopic = (props) => {
  const notes = useSelector((state) => state.uNotes);
  const mode = useSelector((state) => state.mode)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slug = useParams();
  const topic = slug.note; // console it and  will give /notes/rtu ka rtu
  console.log(topic);
  const parentId = topic.split('=')[1]
  console.log(parentId)

  useEffect(() => {
    dispatch(getNotesByParent(parentId))
  }, [])

  return (
    <Layout>
      <section id='notes'>
        <h5 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Get All Notes</h5>
        <h2>If you have any kind of notes, do share!</h2>

        {
          notes.loading ?
          <div id='loader' className='w-full mx-auto'></div> :
          notes.notesByParent.length == 0 ?
          <div className={`text-center`}>
              <img src={monkey} alt="not available"  className='w-[200px] h-[200px] inline'/>
              <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Notes not availble!</div>
          </div> :
          <div className="container note-container">
            {
              notes.notesByParent.map((item, index) => {
                return (
                  <article key={index} className={`${mode.mode == 'light' ? 'hover:bg-black' : 'hover:bg-transparent'} note-item`}>
                    <div className="note-item-image">
                      <img className='note-photo' src={generatePublicURL(item.notesImage)} alt={item.title} />
                    </div>
                    <h3>{item.title}</h3>
                    <Link to={item.notesLink.split('/')[1] === 'notes' ? `/notes/pid1=${parentId}/pid2=${item._id}` : item.notesLink} className="btn btn-primary">See Notes<span><AiFillBook className="notePhoto"/></span></Link>
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

export default NotesByTopic