import { Box, Button, Grid2, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { fetchProfileFailure, fetchProfileStart, fetchProfileSuccess } from '../../redux/slices/userSlice';
import { fetchProfileAdmin, isCheckSameMailIs, updatedAdminProfile } from '../../services/adminApi';
import { CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from '../../api';
import PlaceHolderImage from "../../assets/images/placeholder.png"
import { Field, Form, Formik } from 'formik';
import { profileAgencySchema } from '../users/validationSchema';
import { errorToast, successToast } from '../../components/Toast';
import axios from 'axios';
import { boxSxStyle, buttonSxStyle, fieldSxStyle } from '../users/static';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Breadcrumb } from '../../components/Breadcrumb';
import { updateProfileFailure, updateProfileStart, updateProfileSuccess } from '../../redux/slices/adminSlice';
type Props = {}

function index({ }: Props) {

    const [breadcrumbs] = useState([
        { link: "/dashboard", title: "Home" },
        { link: "/admin/profile", title: "Profile" },
    ]);


    const [userData, setUserData] = useState<any>();
    const [image, setImage] = useState<any>();

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 1,
        maxSize: 512000, 
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => setImage(reader.result as string);
                reader.readAsDataURL(file);
            }
        },
    });


    const dispatch = useDispatch();

    useEffect(() => {
        initialFetching()
    }, [])


    const initialFetching = async () => {

        dispatch(fetchProfileStart())

        try {

            const result = await fetchProfileAdmin()

            dispatch(fetchProfileSuccess(result?.data?.data))

            setUserData(result?.data?.data)

        } catch (error: any) {

            dispatch(fetchProfileFailure(error))

        }
    }

    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);


    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleSubmit = async (values: { name: string, email: string, password: string, avatar?: string },) => {
        
        try {

            setIsLoading(true);


            await isCheckSameMailIs(values.email)

            dispatch(updateProfileStart());

            const payload: { name: string, email: string, password: string, avatar?: any } = {
                name: values.name,
                email: values.email,
                password: values.password,
            }


            if (image) {
                const formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', CLOUDINARY_PERSISTENT);
                formData.append('folder', 'developer_upload');

                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, // Replace your_cloud_name
                    formData
                );

                if (response?.data) {
                    payload.avatar = {
                        asset_id: response.data.asset_id,
                        secure_url: response.data.secure_url,
                        url: response.data.url,
                        public_id: response.data.public_id,
                    };
                }
            }

            await updatedAdminProfile(payload)

            dispatch(updateProfileSuccess());

        
            successToast(`New ${payload.name} is created`);


        } catch (error: any) {

            errorToast(error?.response?.data?.message || error.message || 'Error occurred, please try again later');
           
            dispatch(updateProfileFailure(error));

        } finally {

            setIsLoading(false);

        }
    }

    return (


        <div className='p-4'>

            <Breadcrumb items={breadcrumbs} />

            {userData && <Formik
                enableReinitialize={true}
                initialValues={{ ...userData }}
                validationSchema={profileAgencySchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => {
                    return (

                        <Grid2 container py={1} spacing={2}>
                            <Grid2 size={8}>

                                <Form>


                                    <Box component="div" sx={boxSxStyle}>
                                        <Grid2 container py={1} spacing={2}>
                                            <Grid2 size={6}>
                                                <Field
                                                    as={TextField}
                                                    name="name"
                                                    label="Name"
                                                    variant="outlined"
                                                    error={touched.name && Boolean(errors.name)}
                                                    helperText={touched.name && errors.name}
                                                    sx={fieldSxStyle}
                                                    disabled={isLoading}
                                                />
                                            </Grid2>


                                            <Grid2 size={6}>
                                                <Field
                                                    as={TextField}
                                                    name="password"
                                                    label="Password"
                                                    variant="outlined"
                                                    type={showPassword ? 'text' : 'password'}
                                                    error={touched.password && Boolean(errors.password)}
                                                    helperText={touched.password && errors.password}
                                                    sx={fieldSxStyle}
                                                    disabled={isLoading}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={handleTogglePassword} edge="end">
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid2>
                                        </Grid2>










                                        <Grid2 container py={1} spacing={2}>
                                            <Grid2 size={6}>
                                                <Field
                                                    as={TextField}
                                                    name="email"
                                                    label="Email"
                                                    variant="outlined"
                                                    error={touched.email && Boolean(errors.email)}
                                                    helperText={touched.email && errors.email}
                                                    sx={fieldSxStyle}
                                                    disabled={isLoading}
                                                />
                                            </Grid2>
                                        </Grid2>







                                        <Grid2 container py={1} spacing={2}>
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                variant="outlined"
                                                sx={{ ...buttonSxStyle, backgroundColor: isLoading ? '#666666' : '#000000' }}
                                            >
                                                {isLoading ? (
                                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : null}
                                                {isLoading ? "Submitting..." : "Submit"}
                                            </Button>
                                        </Grid2>
                                    </Box>
                                </Form>
                            </Grid2>



                            <Grid2>
                                <Grid2 size={12} display={"flex"} flexDirection={"column"} >
                                    <Box>
                                        <div className='flex flex-col gap-3'>
                                            <img
                                                src={image || userData?.avatar?.secure_url || PlaceHolderImage} alt="Preview"
                                                className='w-20 h-20  border border-gray-50 object-cover rounded-full bg-gray-100' />
                                            {image && <Button
                                                variant="contained"
                                                color="error"

                                                startIcon={<GridDeleteIcon />}
                                                onClick={() => setImage(null)}
                                            >
                                                Remove
                                            </Button>}
                                        </div>
                                    </Box>

                                    <Box sx={{ paddingTop: 2 }} display="flex" flexDirection="column" alignItems="start" gap={0}>
                                        {false ? (
                                            <></>
                                        ) : (
                                            <Box
                                                {...getRootProps()}
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                    border: "2px dashed #ccc",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "100%",
                                                    cursor: "pointer",
                                                    textAlign: "center",
                                                    "&:hover": { borderColor: "blue" },
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                <Typography sx={{ fontSize: 10, padding: 1 }} variant="body2" color="textSecondary">
                                                    Drag & Drop Upload
                                                </Typography>
                                            </Box>

                                        )}

                                    </Box>
                                </Grid2>
                            </Grid2>

                        </Grid2>

                    )
                }}
            </Formik>}
        </div>

    )
}

export default index