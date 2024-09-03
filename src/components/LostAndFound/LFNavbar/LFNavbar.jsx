import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './lfnavbar.css'

const LFNavbar = () => {
    const mode = useSelector((state) => state.mode)
    return (
        <div className='lf-container'>
            <ul className={`nav-box flex flex-row justify-center items-center gap-40 md:h-20 bg-[#3e4245] font-medium`}>
                <li className='head'><button className='post-btn btn btn-primary' data-bs-toggle="modal" data-bs-target="#post">Post Item</button></li>
                <li className='head'><Link to={'/lost-and-found/allItems'}>All Items</Link></li>
                <li className='head'><Link to={'/lost-and-found/yourItems'}>Your Items</Link></li>
                <li className='head'><Link to={'/lost-and-found/your-responses'}>Your Responses</Link></li>
            </ul>
        </div>
    )
}

export default LFNavbar