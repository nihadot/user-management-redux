import { Navigate, Outlet, useNavigate } from 'react-router';
import { SideBar } from '../../components';
import { useProtectRouteQuery } from '../../features/auth/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkUserLoggedIn } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';

type Props = {};

function AdminLayout({}: Props) {

    
        const { isAuthenticated, loading } = useSelector((state: RootState) => state.admin);
        const navigate = useNavigate();
    
 
     useEffect(() => {
        console.log(isAuthenticated,'isAuthenticatedisAuthenticatedisAuthenticated')
        
                if (!isAuthenticated) {
                    navigate('/admin-login'); // Redirect to login if not authenticated
                }
        
        }, [isAuthenticated, loading, navigate]);
    
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
