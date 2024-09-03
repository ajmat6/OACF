import React, {useEffect} from 'react'
import LFLayout from '../LFLayout/LFLaoyout'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { generatePublicURL } from '../../../urlConfig'
import { deleteResponsee, getAllItems } from '../../../reducers/itemReducer'
import monkey from '../../../assets/sorryMonkey.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YourResponses = () => {
    const item = useSelector((state) => state.item)
    const mode = useSelector((state) => state.mode)
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllItems());
    }, [item.deletingItem]) 

    let lostItemResponses = [];
    let foundItemResponses = [];

    item.items.map((item) => 
        item.responses.map((response) => {
            if(item.itemType === 'lost' && response.resUserId === auth.userInfo._id) lostItemResponses.push({itemId: item._id, responseId: response._id, image: item.itemImages[0], itemName: item.itemName, response:response.response, status:response.status, question:item.question})
            else if(item.itemType === 'found' && response.resUserId === auth.userInfo._id) foundItemResponses.push({itemId: item._id, responseId: response._id, image: item.itemImages[0], itemName: item.itemName, response:response.response, status:response.status, question:item.question});
        })
    )

    // console.log(foundItemResponses, "found")

    const deleteResponse = (itemId, responseId) => {
        const form = {
            itemId: itemId,
            id: responseId
        }

        dispatch(deleteResponsee(form))
        .then((result) => {
            console.log(result, "delete response")
            if(result.type === 'deleteResponse/fulfilled') toast("Response deleted successfully!")
            else toast("Ooppss! some error occurred!")
        })
    }

    const showOwnerEmail = (itemId) => {
        const thisItem = item.items.find(itemm => itemm._id === itemId);
        alert(`The Owner of this item is '${thisItem.userId.email}'. You can contact the owner with this Email`)
    }

    return (
        <LFLayout>
            <section id='notes'>
                <h5 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Your Items</h5>
                <h2>Do Share with your friends!</h2>

                <h2>LOST ITEM RESPONSES</h2>
                {
                    item.loading ?
                    <div id='loader' className='w-full mx-auto'></div> :
                    lostItemResponses.length == 0 ?
                    <div className={`text-center`}>
                        <img src={monkey} alt="not available"  className='w-[200px] h-[200px] inline'/>
                        <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>You Didn't Responded to any Lost Item!</div>
                    </div> :
                    <div className="container note-container">
                        {
                            lostItemResponses.length > 0 ?
                            lostItemResponses.map((itemm, index) => {
                                return (
                                    <article key={index} className={`${mode.mode == 'light' ? 'hover:bg-black' : 'hover:bg-transparent'} note-item overflow-hidden`}>
                                        <div className="note-item-image">
                                            <img className='note-photo' src={generatePublicURL(itemm.image.img)} alt={itemm.itemName} />
                                        </div>
                                        <h3 className='mb-2'>{itemm.itemName}</h3>
                                        <p className='break-words'><strong className='text-[#4db5ff]'>Question: </strong>{itemm.question}</p>
                                        <p className='break-words'><strong className='text-[#4db5ff]'>Your Answer: </strong>{itemm.response}</p>
                                        <p><strong className='text-[#4db5ff]'>Status: </strong>{itemm.status}</p>
                                        {
                                            itemm.status === 'Pending' ?
                                            <button className='btn btn-primary mt-3' onClick={() => deleteResponse(itemm.itemId, itemm.responseId)}>Delete</button> 
                                            :
                                            itemm.status === 'Accepted' &&
                                            <button className='btn btn-primary mt-3' onClick={() => showOwnerEmail(itemm.itemId)}>Show Owner Email</button>
                                        }
                                    </article>
                                )
                            }) :
                            <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>No Responses!!</div>
                        }
                    </div>
                }

                <h2 className='mt-5'>FOUND ITEM RESPONSES</h2>
                {
                    item.loading ?
                    <div id='loader' className='w-full mx-auto'></div> :
                    foundItemResponses.length == 0 ?
                    <div className={`text-center`}>
                        <img src={monkey} alt="not available"  className='w-[200px] h-[200px] inline'/>
                        <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>You Didn't Responded to any Found Item!</div>
                    </div> :
                    <div className="container note-container">
                        {
                            foundItemResponses.length > 0 ?
                            foundItemResponses.map((itemm, index) => {
                                return (
                                    <article key={index} className={`${mode.mode == 'light' ? 'hover:bg-black' : 'hover:bg-transparent'} note-item overflow-hidden`}>
                                        <div className="note-item-image">
                                            <img className='note-photo' src={generatePublicURL(itemm.image.img)} alt={itemm.itemName} />
                                        </div>
                                        <h3 className='mb-2'>{itemm.itemName}</h3>
                                        <p className='break-words'><strong className='text-[#4db5ff]'>Question: </strong>{itemm.question}</p>
                                        <p className='break-words'><strong className='text-[#4db5ff]'>Your Answer: </strong>{itemm.response}</p>
                                        <p><strong className='text-[#4db5ff]'>Status: </strong>{itemm.status}</p>
                                        {
                                            itemm.status === 'Pending' ?
                                            <button className='btn btn-primary mt-3' onClick={() => deleteResponse(itemm.itemId, itemm.responseId)}>Delete</button>
                                            :
                                            itemm.status === "Accepted" &&
                                            <button className='btn btn-primary mt-3' onClick={() => showOwnerEmail(itemm.itemId)}>Show Owner Email</button>
                                        }
                                    </article>
                                )
                            }) :
                            <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>No Responses!!</div>
                        }
                    </div>
                }
                <ToastContainer
                    theme='dark'
                />
            </section>
        </LFLayout>
    )
}

export default YourResponses