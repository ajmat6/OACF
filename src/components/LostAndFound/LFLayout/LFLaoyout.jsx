import React, {useState, useEffect} from 'react'
import LFNavbar from '../LFNavbar/LFNavbar'
import Layout from '../../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../../Modal/Modal'
import { addItem, getAllItems } from '../../../reducers/itemReducer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LFLayout = (props) => {
    const dispatch = useDispatch();

    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [question, setQuestion] = useState('');
    const [itemImages, setItemImages] = useState([]);
    const [itemType, setItemType] = useState('');

    useEffect(() => {
        // if (!auth.authenticate) {
        //     navigate('/signin')
        // }
    }, [])

    const handlePostItemSubmit = () => {
        if(itemName.length < 3) return toast("Item name must be 3 characters long!")
        if(description.length < 15) return toast("Description should be atleast 15 characters long!")
        if(itemType === "") return toast("Please select item type!")
        if(question.length < 10) return toast("Question must be at least 10 characters long!");
        if(itemImages.length === 0) return toast("Please add at least one reference item image!")
        const form = new FormData();

        toast("Posting your Item, wait..")

        form.append('itemName', itemName);
        form.append('description', description);
        form.append('itemType', itemType);
        form.append('question', question);

        for (let image of itemImages) {
            form.append('itemImages', image);
        }

        dispatch(addItem(form))
        .then((result) => {
            console.log(result.type, "form submit")
            if(result.type == 'addItem/fulfilled')
            {
                toast("Item Reported Successfully!")
                dispatch(getAllItems());
            } 
            else toast("Some error occured, please try again. Look if you have already reported the Item")
        })
        // dispatch(getAllItems());
    }

    const handleItemImages = (e) => {
        setItemImages([...itemImages, e.target.files[0]])
    }

    const renderPostItemModel = () => {
        return (
            <Modal
                modaltitle="Post Lost Item"
                add="Post Item"
                handleSubmit={handlePostItemSubmit}
                modalId="post"
            >
                <input
                    type="text"
                    placeholder='Add Item Name'
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
                    placeholder='Add a question you want to ask who claims item'
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
    return (
        <>
            <Layout>
                <LFNavbar />
                {props.children}

                {renderPostItemModel()}
                <ToastContainer
                    theme='dark'
                />
            </Layout>
        </>
    )
}

export default LFLayout