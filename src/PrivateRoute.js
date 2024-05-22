import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const { Component } = props;
    const [token, setToken] = useState(false);
    const [loading, setLoading] = useState(true);

    const authenticateUser = async () => {
        try {
            const response = await fetch(`https://w3villa-k6hl.onrender.com/protected`, {
                method: 'GET',
                credentials: 'include',   // Include credentials (cookies)
                headers: {
                   'Content-Type': 'application/json'
                 },
            });

            if (response.ok) {
                setToken(true);
            }
        } catch (error) {
            console.error('Protected resource error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    if (loading) {
        // You can show a loading spinner or message here
        return null;
    }

    if (token) {
        console.log("Authenticated");
        return <Component />;
    } else {
        console.log("Not authenticated");
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;

