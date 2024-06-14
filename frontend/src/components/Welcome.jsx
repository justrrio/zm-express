import React from 'react'
import { useSelector } from 'react-redux';

const Welcome = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div>
            <h1 className='title has-text-grey-darker'>Dashboard</h1>
            <h2 className='subtitle has-text-grey-darker mt-2'>Welcome back <strong>{user && user.name}</strong></h2>
        </div>
    )
}

export default Welcome