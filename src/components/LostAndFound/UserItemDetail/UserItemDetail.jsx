import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, editItem, foundItem, getItemById, responseReply } from '../../../reducers/itemReducer';
import { useParams, useNavigate } from 'react-router-dom'
import LFLayout from '../LFLayout/LFLaoyout';
import { generatePublicURL } from '../../../urlConfig';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Modal from '../../Modal/Modal'
import monkey from '../../../assets/sorryMonkey.png'
import './ud.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserItemDetail = () => {
    const item = useSelector((state) => state.item.itemDetails);
    const loading = useSelector((state) => state.item.loading);
    const deleting = useSelector((state) => state.item.deletingItem);
    const editing = useSelector((state) => state.item.editing);
    const auth = useSelector((state) => state.auth);
    const mode = useSelector((state) => state.mode)

    const dispatch = useDispatch();
    const params = useParams();
    const id = params.itemId.split('=')[1];
    const navigate = useNavigate();

    const [itemName, setItemName] = useState("");
    console.log(itemName)
    const [description, setDescription] = useState("");
    const [question, setQuestion] = useState("");
    const [itemImages, setItemImages] = useState([]);
    const [itemType, setItemType] = useState("");

    const [foundAnswer, setFoundAnswer] = useState('');

    const [answered, setAnswered] = useState('false')

    useEffect(() => {
        dispatch(getItemById(id))
    }, [])

    useEffect(() => {
        if (item.length > 0) {
            setItemName(item[0].itemName)
            setDescription(item[0].description)
            setQuestion(item[0].question)
            setItemType(item[0].itemType)
            setItemImages(item[0].itemImages)
        }
    }, item)

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

    const deleteItemm = () => {
        dispatch(deleteItem(id))
            .then((result) => {
                console.log(result, "delete")
                if(result.type === 'deleteItem/fulfilled')
                {
                    toast("Item Deleted Succesfully")
                    setTimeout(() => {
                        navigate('/lost-and-found/yourItems') 
                    }, 2000);
                }
                else toast("Oopss! Some error occured!")
            })
    }

    const renderDeleteItemModel = () => {
        return (
            <Modal
                modaltitle="Delete Item"
                add="Yes!"
                handleSubmit={deleteItemm}
                modalId="delete"
            >
                Are you Sure you want to delete this Item!
            </Modal>
        )
    }

    const handleItemImages = async (e) => {
        setItemImages([...itemImages, e.target.files[0]])
    }

    const handleEditItemSubmit = () => {
        // setItemName(item[0].itemName)
        if(itemName.length < 3) return toast("Item name must be 3 characters long!")
        if(description.length < 15) return toast("Description should be atleast 15 characters long!")
        if(itemType === "") return toast("Please select item type!")
        if(question.length < 10) return toast("Question must be at least 10 characters long!");
        // if(itemImages.length === 0) return toast("Please add at least one reference item image!")

        const form = new FormData();

        form.append('id', id);
        form.append('itemName', itemName);
        form.append('description', description);
        form.append('itemType', itemType);
        form.append('question', question);

        for (let image of itemImages) {
            form.append('itemImages', image);
        }

        dispatch(editItem(form))
        .then((result) => {
            console.log(result)
            if(result.type === 'editItem/fulfilled')
            {
                toast("Item Updated Successfully!")
                dispatch(getItemById(id));
            }
            else toast("Oopss! some error occured!")
        })
    }


    const renderEditItemModel = () => {
        return (
            <Modal
                modaltitle="Edit Item"
                add="Edit Item"
                handleSubmit={handleEditItemSubmit}
                modalId="edit"
            >
                <input
                    type="text"
                    // placeholder='Add Item Name'
                    className='form-control bg-[#636375]'
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder='Add Description'
                    className='form-control mt-3 bg-[#636375]'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="text"
                    placeholder='Add a question you want to ask who claims item found/lost'
                    className='form-control mt-3 bg-[#636375]'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <select
                    className="form-control my-3 bg-[#636375]"
                    value={itemType}
                    onChange={(e) => { setItemType(e.target.value); console.log(itemType) }}
                    placeholder='Select Item Type'
                >
                    <option value='0'>Select Item Type</option>
                    <option value='lost'>Lost Item</option>
                    <option value='found'>Found Item</option>
                </select>

                <label className='' style={{ marginLeft: '5px' }}>Add Item Image</label>
                <input
                    type="file"
                    className='form-control mt-1 mb-1 bg-[#636375]'
                    onChange={handleItemImages}
                />

                {
                    itemImages.length > 0 ? itemImages.map((image, index) => (<div key={index}>{image.name}</div>)) : null
                }
            </Modal>
        )
    }

    const handleFoundSubmit = () => {
        const form = {
            itemId: id,
            response: foundAnswer
        }

        if(foundAnswer.length === 0) return toast("Response cannot be empty!")
        dispatch(foundItem(form))
        .then((result) => {
            console.log(result, "response submitt")
            if(result.type === 'foundItem/fulfilled') toast('Response added successfully!')
            else toast("Oopps! some error occured. If you have already responded, delete previous response to give new one!")
        })
    }

    const renderFoundModel = () => {
        return (
            <Modal
                modaltitle="Answer below question!"
                add="Submit"
                handleSubmit={handleFoundSubmit}
                modalId="found"
            >
                {item.length > 0 && <label>{item[0].question}</label>}
                <input
                    type="text"
                    placeholder='Give Response..'
                    className='form-control bg-[#636375]'
                    value={foundAnswer}
                    onChange={(e) => setFoundAnswer(e.target.value)}
                />
            </Modal>
        )
    }

    const respondingYes = (itemId, responseId) => {
        const form = {
            itemId,
            responseId,
            reply: 'yes'
        }

        dispatch(responseReply(form))
        .then((result) => {
            if(result.type === 'responseReply/fulfilled')
            {
                toast("Response Approved Successfully!");
            }
            else toast("Oopps! some error occured!")
            dispatch(getItemById(id));
        })
    }

    const respondingNo = (itemId, responseId) => {
        const form = {
            itemId,
            responseId,
            reply: 'no'
        }

        dispatch(responseReply(form))
        .then((result) => {
            if(result.type === 'responseReply/fulfilled')
            {
                toast("Response Rejected Successfully!");
            }
            else toast("Oopps! some error occured!")
            dispatch(getItemById(id));
        })
    }

    return (
        <LFLayout>
            <section id='notes'>
                <h5 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Item Details</h5>
                <h2>Do Share with your friends!</h2>

                {
                    item.length == 0 || deleting || editing?
                    <div id='loader' className='w-full mx-auto'></div> 
                    :
                    (
                        <div className='note-container container'>
                            {/* <div className="md:flex"> */}
                                <article className={`${mode.mode == 'light' ? 'hover:bg-black' : 'hover:bg-transparent'} note-item overflow-hidden`}>
                                    <h3 className='mb-2'>{item[0].itemName}</h3>
                                    <p className='break-words'><strong className='text-[#4db5ff]'>Description: </strong>{item[0].description}</p>
                                    <p><strong className='text-[#4db5ff]'>Type: </strong>{capitalize(item[0].itemType)}</p>
                                    <h2 className='mb-2'><strong className='text-[#4db5ff]'>Date: </strong>{formatDate(item[0].date)}</h2>
                                    {
                                        auth.userInfo._id === item[0].userId._id ?
                                        <div className='flex justify-center items-center gap-3 mt-3'>
                                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#edit">Edit</button>
                                            <button className='btn bg-[#d19494] text-black' data-bs-toggle="modal" data-bs-target="#delete">Delete</button>
                                        </div> :
                                        <div className='flex justify-center items-center gap-3 mt-3'>
                                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#found">{item[0].itemType === 'lost' ? 'Found Item?' : 'Claim Item'}</button>
                                        </div>
                                    }
                                </article>
                            {/* </div> */}
                            <div className=''>
                                <article className="note-item">
                                    <div className="note-item-image">
                                        <div className=''>
                                            <Carousel
                                                renderThumbs={() => {}} // to remove the small pics of the large one at bottom
                                                autoPlay={true} // or just autoPlay (true is the default value)
                                                infinite={true}
                                                mobileFirst={true}
                                            >
                                                {
                                                    item[0].itemImages.map((image, index) =>
                                                        <div key={index} className='h-[385px]'>
                                                            <img className='max-h-[350px] max-w-[100%] object-contain' src={generatePublicURL(image.img)} />
                                                        </div>
                                                    )
                                                }
                                            </Carousel>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    )
                }

                {
                    item.length > 0 && auth.userInfo._id === item[0].userId._id &&
                    <>
                        <h2 className='mt-[50px]'>RESPONSES</h2>
                        {
                            loading ?
                            <div id='loader' className='w-full mx-auto'></div> :
                            item[0].responses.length == 0 ?
                            <div className={`text-center`}>
                                <img src={monkey} alt="not available"  className='w-[200px] h-[200px] inline'/>
                                <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>No Responses Yet!</div>
                            </div> :
                            <div className="contact-options flex flex-row flex-wrap container">
                                {
                                    item[0].responses.map((response, index) =>
                                        <article className="contact-option w-[363px] overflow-hidden" key={index}>
                                            <strong className='text-[#4db5ff]'>Question: </strong>
                                            <h2 className='break-words'> {item[0].question}</h2>
                                            <strong className='text-[#4db5ff]'>Response: </strong>
                                            <h6 className='box-border break-words'>{response.response}</h6>
                                            <a href="mailto:ajmat1130666@gmail.com" target="_blank">Give Response Appropriately!</a>
                                            <div>
                                                {
                                                    response.status === 'Pending' ?
                                                        <>
                                                            <button className='btn btn-primary' onClick={() => respondingYes(item[0]._id, response._id)}>Approve</button>
                                                            <button className='btn bg-[#d19494] text-black ml-2' onClick={() => respondingNo(item[0]._id, response._id)}>Discard</button>
                                                        </>
                                                        :
                                                        <div>You Have Already answered!</div>
                                                }
                                            </div>
                                        </article>
                                    ) 
                                }
                            </div>
                        }
                    </>
                }

                {renderEditItemModel()}
                {renderFoundModel()}
                {renderDeleteItemModel()}
                <ToastContainer
                    theme='dark'
                />
            </section >
        </LFLayout >
    )
}

export default UserItemDetail