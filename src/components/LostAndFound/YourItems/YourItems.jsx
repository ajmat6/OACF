import React, { useState, useEffect } from 'react'
import LFLayout from './../LFLayout/LFLaoyout'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { generatePublicURL } from '../../../urlConfig'
import { HiTemplate } from 'react-icons/hi'
import { getItemsByUser } from '../../../reducers/itemReducer'
import monkey from '../../../assets/sorryMonkey.png'

const YourItems = () => {
    const auth = useSelector((state) => state.auth);
    const mode = useSelector((state) => state.mode)
    const item = useSelector((state) => state.item)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItemsByUser());
    }, [])

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
        }
    }

    const capitalize = (word) => {
        let character = word.charAt(0).toUpperCase();
        return character + word.slice(1)
    }

    return (
        <LFLayout>
            <section id='notes'>
                <h5 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Your Items</h5>
                <h2>Do Share with your friends!</h2>

                {
                    item.loading ?
                    <div id='loader' className='w-full mx-auto'></div> :
                    item.userItems.length == 0 ?
                    <div className={`text-center`}>
                        <img src={monkey} alt="not available"  className='w-[200px] h-[200px] inline'/>
                        <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>You have Reported Zero Items!</div>
                    </div> :
                    <div className="container note-container">
                        {
                            item.userItems.map((itemm, index) => {
                                return (
                                    // below hidden in note-item and break-words in p tag are used to move description text down if it is long
                                    <article key={index} className={`${mode.mode == 'light' ? 'hover:bg-black' : 'hover:bg-transparent'} note-item overflow-hidden`}> 
                                        <div className="note-item-image">
                                            <img className='note-photo' src={generatePublicURL(itemm.itemImages[0].img)} alt={itemm.itemName} />
                                        </div>
                                        <h3 className='mb-2'>{itemm.itemName}</h3>
                                        <p className='break-words'><strong className='text-[#4db5ff]'>Description: </strong>{itemm.description}</p>
                                        <p><strong className='text-[#4db5ff]'>Type: </strong>{capitalize(itemm.itemType)}</p>
                                        <h2 className='mb-2'><strong className='text-[#4db5ff]'>Date: </strong>{formatDate(itemm.date)}</h2>
                                        {
                                            // itemm.itemStatus !== 'Recovered' ?
                                            <Link to={`/lost-and-found/items/itemId=${itemm._id}`} className="btn btn-primary">See Item<span><HiTemplate className="notePhoto" /></span></Link>
                                            // :
                                            // <div>Item Recovered!</div>
                                        }
                                    </article>
                                )
                            })
                        }
                    </div>
                }
            </section>
        </LFLayout>
    )
}

export default YourItems