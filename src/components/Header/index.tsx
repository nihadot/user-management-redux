import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { signOutFailure, signOutStart, signOutSuccess } from '../../redux/slices/userSlice'
import { logoutAuth } from '../../services/userApi'

type Props = {}

function index({ }: Props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogout = async() => {

        if(!window.confirm('Are you wanted to logout')){
            return;
        }
        dispatch(signOutStart())
        try {

            await logoutAuth();
            dispatch(signOutSuccess())
            console.log('first')
            navigate('/login');

            console.log(navigate)


        } catch (error) {
            dispatch(signOutFailure(error));

        }
    }
    return (
        <header className='bg-black items-center flex justify-between px-4 h-20 text-white'>
            <p>Logo</p>

            <nav className='flex justify-between text-sm max-w-[200px] h-14  gap-2 px-3  list-none items-center'>
               <Link to={'/'}>
               
               <li>Home</li></Link>
                <Link to={'/profile'}>
                    <li>Profile</li>
                </Link>
               

            </nav>

            <Button onClick={()=>handleLogout()} sx={{ backgroundColor: "red", textTransform: "capitalize" }} variant="contained">Logout</Button>

        </header>
    )
}

export default index