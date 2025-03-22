import { Navigate, Outlet } from 'react-router';
import { SideBar } from '../../components';
import { useProtectRouteQuery } from '../../features/auth/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkUserLoggedIn } from '../../redux/slices/authSlice';

type Props = {};

function AdminLayout({}: Props) {
    const  { isAuthenticated:data } = useSelector((item)=>  item.admin)

    
 
    return (
        <>
            {data?.success ? (
                <main className="flex min-h-screen max-w-[1440px] w-full">
                    <SideBar />

                    <div className="flex-1 border border-slate-200 rounded-t-lg md:ms-[240px] ms-[60px] md:mt-3 overflow-x-auto">
                        <Outlet />
                    </div>
                </main>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}

export default AdminLayout;
