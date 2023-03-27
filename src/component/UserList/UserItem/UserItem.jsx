import React, {useEffect, useState} from "react";
import {deleteUser} from "../../../http/userRequest";
import './UserItem.css';
import ChangeUserModal from "../../ChangeUserModal/ChangeUserModal";
const UserItem = ({ user, update}) => {
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [subscribeColor, setSubscribeColor] = useState('black');

    const handleButtonClick = () => {
        deleteUser(user.id).then(() => {
            update();
        }).catch((e) => {
            console.log(e);
        })
    }
    const checkSubscribe = (subscribe) => {
        if (subscribe) {
            setSubscribeColor(subscribe === 'premium' ? 'violet' : 'lightgreen');
        };
    }


    useEffect(() => {
        checkSubscribe(user.subscribe);
    },[]);
    const showEditModal = () => {
        setShowChangeModal(!showChangeModal);
    }

    return (
        <div className='user-item'>
            <div style={{borderColor: subscribeColor}} onClick={showEditModal} className="container">
                <div className="name-container">
                    <h1 className="name">{user.firstName} {user.lastName}</h1>
                </div>
                <h2 className="number">{user.number}</h2>
                <h2 className="email">{user.email}</h2>
            </div>
            <div className="buttons">
                <div onClick={handleButtonClick} className="delete">DELETE</div>
            </div>
            {showChangeModal && <ChangeUserModal user={user} openModal={()=> showEditModal()} update={() => update()}/>}
        </div>
    );
};

export default UserItem;