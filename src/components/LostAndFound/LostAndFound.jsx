import React, { useState, useEffect } from 'react'
import LFLayout from './LFLayout/LFLaoyout'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getAllItems } from '../../reducers/itemReducer'
import { generatePublicURL } from '../../urlConfig'
import { AiFillBook } from 'react-icons/ai'
import { HiTemplate } from 'react-icons/hi'
import monkey from '../../assets/sorryMonkey.png'

const LostAndFound = () => {
    const auth = useSelector((state) => state.auth);
    const mode = useSelector((state) => state.mode);
    const item = useSelector((state) => state.item)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const lostItems = item.items.filter((itemm, index) => {
        return itemm.itemType === 'lost' && itemm.itemStatus === 'Reported';
    })

    const foundItems = item.items.filter((itemm, index) => {
        return itemm.itemType === 'found' && itemm.itemStatus === 'Reported';
    })

    const recoveredItems = item.items.filter((itemm, index) => {
        return itemm.itemStatus === 'Recovered';
    })

    console.log(lostItems, "lost")
    console.log(foundItems, "found")

    useEffect(() => {
        dispatch(getAllItems());
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
                <h5 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>All Lost and Found Items</h5>
                <h2>Do Share with your friends!</h2>

                <h2>LOST ITEMS</h2>
                {
                    item.loading ?
                    <div id='loader' className='w-full mx-auto'></div> :
                    lostItems.length == 0 ?
                    <div className={`text-center`}>
                        <img src={monkey} alt="not available"  className='w-[200px] h-[200px] inline'/>
                        <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>No Lost Items Reported!</div>
                    </div> :
                    <div className="container note-container">
                        {
                            lostItems.map((itemm, index) => {
                                return (
                                    <article key={index} className={`${mode.mode == 'light' ? 'hover:bg-black' : 'hover:bg-transparent'} note-item overflow-hidden`}>
                                        <div className="note-item-image">
                                            <img className='note-photo' src={generatePublicURL(itemm.itemImages[0].img)} alt={item.title} />
                                        </div>
                                        <h3 className='mb-2'>{itemm.itemName}</h3>
                                        <p className='break-words'><strong className='text-[#4db5ff]'>Description: </strong>{itemm.description}</p>
                                        <h2 className='mb-2'><strong className='text-[#4db5ff]'>Date: </strong>{formatDate(itemm.date)}</h2>
                                        <Link to={`/lost-and-found/items/itemId=${itemm._id}`} className="btn btn-primary">See Item<span><HiTemplate className="notePhoto" /></span></Link>
                                    </article>
                                )
                            })
                        }
                    </div>
                }

                <h2 className='mt-5'>FOUND ITEMS</h2>
                {
                    item.loading ?
                    <div id='loader' className='w-full mx-auto'></div> :
                    foundItems.length == 0 ?
                    <div className={`text-center`}>
                        <img src={monkey} alt="not available"  className='w-[200px] h-[200px] inline'/>
                        <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>No Found Items Reported!</div>
                    </div> :
                    <div className="container note-container">
                        {
                            foundItems.map((itemm, index) => {
                                return (
                                    <article key={index} className={`${mode.mode == 'light' ? 'hover:bg-black' : 'hover:bg-transparent'} note-item overflow-hidden`}>
                                        <div className="note-item-image">
                                            <img className='note-photo' src={generatePublicURL(itemm.itemImages[0].img)} alt={item.title} />
                                        </div>
                                        <h3 className='mb-2'>{itemm.itemName}</h3>
                                        <p className={`${mode.mode === 'light' && 'hover:text-black'} break-word`}><strong className='text-[#4db5ff]'>Description: </strong>{itemm.description}</p>
                                        <h2 className='mb-2'><strong className='text-[#4db5ff]'>Date: </strong>{formatDate(itemm.date)}</h2>
                                        <Link to={`/lost-and-found/items/itemId=${itemm._id}`} className="btn btn-primary">See Item<span><HiTemplate className="notePhoto" /></span></Link>
                                    </article>
                                )
                            })
                        }
                    </div>
                }

                <h2 className='mt-5'>RECOVERED ITEMS</h2>
                {
                    item.loading ?
                    <div id='loader' className='w-full mx-auto'></div> :
                    recoveredItems.length == 0 ?
                    <div className={`text-center`}>
                        <img src={monkey} alt="not available"  className='w-[200px] h-[200px] inline'/>
                        <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>No Recovered Items Till Now!</div>
                    </div> :
                    <div className="container note-container">
                        {
                            recoveredItems.map((itemm, index) => {
                                return (
                                    <article key={index} className={`${mode.mode == 'light' ? 'hover:bg-black' : 'hover:bg-transparent'} note-item overflow-hidden`}>
                                        <div className="note-item-image">
                                            <img className='note-photo' src={generatePublicURL(itemm.itemImages[0].img)} alt={item.title} />
                                        </div>
                                        <h3 className='mb-2'>{itemm.itemName}</h3>
                                        <p className='break-words'><strong className='text-[#4db5ff]'>Description: </strong>{itemm.description}</p>
                                        <h2 className='mb-2'><strong className='text-[#4db5ff]'>Date: </strong>{formatDate(itemm.date)}</h2>
                                        <h2 className='mb-2'><strong className='text-[#4db5ff]'>Type: </strong>{capitalize(itemm.itemType)}</h2>
                                        {/* <Link to={`/lost-and-found/items/itemId=${itemm._id}`} className="btn btn-primary">See Item<span><HiTemplate className="notePhoto" /></span></Link> */}
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

export default LostAndFound