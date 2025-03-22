import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../redux/store';

const UserLayout: React.FC = () => {
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (isAuthenticated) {
                navigate('/'); // Redirect to home if authenticated
            } else {
                navigate('/login'); // Redirect to login if not authenticated
            }
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) return <div>Loading...</div>;

    return <div>UserLayout</div>;
};

export default UserLayout;
