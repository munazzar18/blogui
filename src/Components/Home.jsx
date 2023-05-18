import React from 'react'
import useAuth from '../hooks/useAuth';

function Home() {
    const { token } = useAuth();
    return (
        <div>This is Home. Authenticated as {token}</div>
    )
}

export default Home