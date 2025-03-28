import { Box, TextField, Button, InputAdornment, IconButton, Typography, Grid2 } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { errorToast, successToast } from "../../../components/Toast"
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from '../../../api';
import axios from 'axios';
import { addUserSchema } from '../validationSchema';
import { boxSxStyle, buttonSxStyle, fieldSxStyle } from '../static';
import { useDispatch } from 'react-redux';
import { addUser, isUserMailIdExist } from '../../../services/adminApi';
import { addUserFailure, addUserStart, addUserSuccess } from '../../../redux/slices/adminSlice';

type Props = {}

function AddAgenciesForm({ }: Props) {

    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);

    };
    const [image, setImage] = useState<any>();

    const dispatch = useDispatch();

    const handleSubmit = async (values: { name: string, email: string, password: string, avatar?: string }, { resetForm }: { resetForm: any, setFieldValue: any }) => {

        try {

            setIsLoading(true);

            if (!image) {
                return errorToast("Please select an image");
            }

            await isUserMailIdExist(values.email);

            dispatch(addUserStart());

            const payload: { name: string, email: string, password: string, avatar?: any } = {
                name: values.name,
                email: values.email,
                password: values.password,
            }

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

            await addUser(payload)

            dispatch(addUserSuccess())

            resetForm();

            setImage(null);

            successToast(`New ${payload.name} is created`);

        } catch (error: any) {

            dispatch(addUserFailure(error.message));

            errorToast( error?.response?.data?.errors?.join(', ') || error?.response?.data?.message || error.message || 'Error occurred, please try again later');

        } finally {

            setIsLoading(false);

        }
    }



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


    return (
        <div className=''>
            <Formik
                initialValues={{
                    email: "",
                    name: "",
                    password: "",

                }}
                validationSchema={addUserSchema}
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
                                <Grid2 size={12}>
                                    <Box display="flex" flexDirection="column" alignItems="start" gap={0}>
                                        {image ? (
                                            <>
                                                <img
                                                    src={image}
                                                    alt="Preview"
                                                    style={{ width: "250px", height: "180px", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    startIcon={<GridDeleteIcon />}
                                                    onClick={() => setImage(null)}
                                                >
                                                    Remove
                                                </Button>
                                            </>
                                        ) : (
                                            <Box
                                                {...getRootProps()}
                                                sx={{
                                                    width: 250,
                                                    height: 180,
                                                    border: "2px dashed #ccc",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                    textAlign: "center",
                                                    "&:hover": { borderColor: "blue" },
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                <Typography variant="body2" color="textSecondary">
                                                    Drag & Drop or Click to Upload
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid2>
                            </Grid2>

                        </Grid2>

                    )
                }}
            </Formik>
        </div>
    )
}

export default AddAgenciesForm