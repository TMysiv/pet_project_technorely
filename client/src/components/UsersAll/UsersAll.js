import React from 'react';
import {useEffect, useState} from 'react';
import {adminService} from "../../services/admin.service";

const UsersAll = () => {

    const [users,setUsers] = useState([]);

    useEffect(() => {
        adminService.getUser().then(value => setUsers(value))
    },[])

    return (
        <div>
            {users && users.map(user => <div>{user.lastName}</div>)}
        </div>
    );
};

export default UsersAll;