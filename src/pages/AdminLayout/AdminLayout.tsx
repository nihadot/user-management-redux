import { Outlet, useNavigate } from 'react-router';
import { SideBar } from '../../components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { isLoggedAPIAdmin } from '../../services/adminApi';
import {
    protectedRouteFailure,
    protectedRouteStart,
    protectedRouteSuccess
} from '../../redux/slices/adminSlice';

type Props = {};

function AdminLayout({ }: Props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        isLogged()

    }, []);
    
    const isLogged = async () => {
        dispatch(protectedRouteStart())
        try {
            await isLoggedAPIAdmin();
            dispatch(protectedRouteSuccess())
        } catch (error: any) {
            dispatch(protectedRouteFailure(error))
            navigate('/admin-login');
        }
    }

    return (
        <>
            <main className="flex min-h-screen max-w-[1440px] w-full">
                <SideBar />

                <div className="flex-1 border border-slate-200 rounded-t-lg md:ms-[240px] ms-[60px] md:mt-3 overflow-x-auto">
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default AdminLayout;
