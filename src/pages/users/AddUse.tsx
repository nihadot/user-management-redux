import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchUsersFailure, fetchUsersStart, fetchUsersSuccess } from '../../redux/slices/userSlice';
import { fetchAllUsers } from '../../services/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

function createData(
  avatar: Object,
  name: string,
  email: number,
) {
  return { name, email, avatar };
}



export default function BasicTable() {


  const { users: responseData } = useSelector((item: RootState) => item.user)

  React.useEffect(() => {
    fetchAllUsersFunction()
  }, [])

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    if (responseData) {
      // const items = responseData.map((item)=>  createData(item.avatar,item.name,item.email) )
      setUsers(responseData)
    }
  }, [responseData])

  const dispatch = useDispatch();

  const fetchAllUsersFunction = async () => {
    dispatch(fetchUsersStart())
    try {
      const result = await fetchAllUsers()
      await dispatch(fetchUsersSuccess(result))
      console.log(result)
    } catch (error) {
      dispatch(fetchUsersFailure())

    }
  }

  console.log(users, '000')

  const navigate = useNavigate();
  return (
    <div className="p-6">

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <img className='w-12 h-12 rounded-full' src={row?.avatar?.secure_url} alt="" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">
                  <Button onClick={() => navigate(`/admin/users/edit/${row._id}`)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}
