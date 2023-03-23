import React, {useState, useEffect} from "react";
import UserItem from "./UserItem/UserItem";
import {getUserData} from "../../http/userRequest";
import './UserList.css';
import UserModal from "../UserModal/UserModal";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const getUsers = async () => {
        await getUserData().then((data) => {
            setUsers(data);
        }).catch(e => {
            console.log(e);
        });
    };

    const opeModal = () => {
        setShowModal(!showModal);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="c-users-container">
            <div className="header">
                <h1>Users List</h1>
                <button className="addUser" onClick={opeModal} >Add new User</button>
            </div>
            <div className="list-container">
                {users.length ? users.map((item) => (
                    <UserItem
                        key={item.id}
                        user={item}
                        update={() => getUsers()}
                    />
                )) :
                    <div className="user-not-found">Users Not Found</div>
                }
            </div>
            {showModal && <UserModal
                openModal={() => opeModal()}
                update={() => getUsers()}
            />}
        </div>
    );
};

export default UserList;