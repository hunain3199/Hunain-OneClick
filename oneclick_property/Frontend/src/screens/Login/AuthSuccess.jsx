import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        // Get the query string from the URL
        const params = new URLSearchParams(window.location.search);
        
        // Extract specific query parameters
        const token = params.get('token');
        const username = params.get('username');
        const userId = params.get('userId');

        // If a token is found, store it in localStorage and navigate to the home page
        if (token) {
            localStorage.setItem('authToken', token);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', userId);
            console.log(token,username,userId) // Redirect to home page
        }
    }, []);

    return <div>Loading...</div>;
}

export default AuthSuccess;
