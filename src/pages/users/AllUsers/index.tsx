import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Button,
    Pagination,
    CircularProgress,
    TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../redux/store";
import { errorToast } from "../../../components/Toast";
import { Breadcrumb } from "../../../components/Breadcrumb";
import {
    deletedUserByIdFailure,
    deletedUserByIdStart,
    deletedUserByIdSuccess,
    fetchUsersFailure,
    fetchUsersStart,
    fetchUsersSuccess,
} from "../../../redux/slices/adminSlice";
import { deleteUser, fetchAllUsers } from "../../../services/adminApi";

export default function UserTable() {


    const navigate = useNavigate();
const dispatch = useDispatch();

const [page, setPage] = React.useState(1);
const [limit] = React.useState(10);
const [totalPages, setTotalPages] = React.useState(1);
const [searchQuery, setSearchQuery] = React.useState("");
const [deletingId, setDeletingId] = React.useState<string | null>(null); // Tracks the ID of the user being deleted

const { users, fetchUsersByIdLoader } = useSelector((state: RootState) => state.admin);

const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
};

const fetchAllUsersFunction = async () => {
    dispatch(fetchUsersStart());
    try {
        const result = await fetchAllUsers(page, limit, searchQuery); 
        dispatch(fetchUsersSuccess(result));
        setTotalPages(result.pagination.totalPages);
    } catch (error: any) {
        dispatch(fetchUsersFailure(error.message));
        errorToast(error?.response?.data?.message || "Failed to fetch users.");
    }
};

React.useEffect(() => {
    fetchAllUsersFunction();
}, [page, limit, searchQuery]);
const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    dispatch(deletedUserByIdStart());
    setDeletingId(id);

    try {
        await deleteUser(id);
        dispatch(deletedUserByIdSuccess());
        fetchAllUsersFunction();
    } catch (error: any) {
        dispatch(deletedUserByIdFailure(error));
        dispatch(fetchUsersFailure(error.message));
        errorToast(error?.response?.data?.message || "Error occurred. Please try again.");
    } finally {
        setDeletingId(null);
    }
};

const breadcrumbs = [
    { link: "/admin", title: "Home" },
    { link: "/admin/manage-users", title: "Manage Users" },
    { link: "#", title: "All Users" },
];

    return (
        <div className="p-6">
            <Breadcrumb items={breadcrumbs} />

   {/* Search Input Field */}
   <Box mb={2} display="flex" justifyContent="flex-end">
        <TextField
          label="Search Users"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

            <TableContainer component={Paper} className="my-5">
                <Box>
                    <Table sx={{ minWidth: 650 }} aria-label="Users Table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Edit</TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fetchUsersByIdLoader ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user: any) => (
                                    <TableRow key={user._id}>
                                        <TableCell align="left">
                                            <img
                                                className="w-12 h-12 rounded-full"
                                                src={user?.avatar?.secure_url || "/placeholder.jpg"}
                                                alt={user?.name || "User"}
                                            />
                                        </TableCell>
                                        <TableCell>{user?.name}</TableCell>
                                        <TableCell align="left">{user.email}</TableCell>
                                        <TableCell align="left">
                                            <Button onClick={() => navigate(`/admin/users/edit/${user._id}`)}>Edit</Button>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button
                                                className="!bg-red-500 !text-white"
                                                onClick={() => handleDelete(user._id)}
                                                disabled={deletingId === user._id}
                                            >
                                                {deletingId === user._id ? "Deleting..." : "Delete"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </TableContainer>

            {/* Pagination Controls */}
            <Box display="flex" justifyContent="center" my={3}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                />
            </Box>
        </div>
    );
}
