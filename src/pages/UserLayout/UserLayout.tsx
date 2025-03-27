import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { isLoggedAPIUser } from '../../services/userApi';
import { protectedRouteFailure, protectedRouteStart, protectedRouteSuccess } from '../../redux/slices/userSlice';

const UserLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        isLogged()

    }, []);
    
    const isLogged = async () => {
        dispatch(protectedRouteStart())
        try {
            await isLoggedAPIUser();
            dispatch(protectedRouteSuccess())
        } catch (error: any) {
            dispatch(protectedRouteFailure(error))
            navigate('/login');
        }
    }


    return <Outlet/>;
};

export default UserLayout;
