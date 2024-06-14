import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
    };

    const deleteUser = async (uuid_user) => {
        await axios.delete(`http://localhost:5000/users/${uuid_user}`);
        getUsers();
    };
    return (
        <div>
            <h1 className='title'>Users</h1>
            <h2 className='subtitle'>List User</h2>
            <Link to="/users/add" className="button is-primary mb-2">
                Tambah User
            </Link>
            <table className='table is-striped is-fullwidth'>
                <thead className='has-text-grey-darker'>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.uuid}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link
                                    to={`/users/edit/${user.uuid_user}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteUser(user.uuid_user)}
                                    className="button is-small is-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListUser