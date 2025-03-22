import { Box, TextField, Button, InputAdornment, IconButton, Autocomplete, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
// import { boxSxStyle, buttonSxStyle, fieldSxStyle, initialValues } from "../static"
import { errorToast, successToast } from "../../../components/Toast"
// import { AddAgencyPayload } from '../types';
// import { useAddLanguageMutation, useGetLanguageAllNamesQuery } from '../../../features/languages/languagesApi';
// import { addAgencySchema, editAgencySchema } from '../validationSchema';
// import { useAddAgencyMutation } from '../../../features/agency/agencyApi';
// import { addLanguageSchema } from '..//../languages/validationSchema';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from '../../../api';
import axios from 'axios';
import { addUserSchema } from '../validationSchema';
import { boxSxStyle, buttonSxStyle, fieldSxStyle } from '../static';
import { useDispatch } from 'react-redux';
import { addUserFailure, addUserStart, addUserSuccess } from '../../../redux/slices/userSlice';
import AddUser from '../AddUse';
import { addUser } from '../../../services/userApi';

type Props = {}

function AddAgenciesForm({ }: Props) {
    // const [addAgency, { isLoading }] = useAddAgencyMutation();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    const [image, setImage] = useState<string>();

    // const { data: languageResponse } = useGetLanguageAllNamesQuery();
    // const { data: countryResponse } = useGetCountryAllNamesQuery();

const dispatch = useDispatch();
    const handleSubmit = async (values: {name:string,email:string,password:string,avatar?:string}, { resetForm }: { resetForm: any, setFieldValue: any }) => {
        try {
            setIsLoading(true);
            if(!image){
                return errorToast("Please select an image");
            }

                        dispatch(addUserStart());
            

            const payload:  {name:string,email:string,password:string,avatar?:any} = {
               name:values.name,
               email:values.email,
               password:values.password,
            }

            console.log(values,'payload')
            // return true


                //  if(image){
                            const formData = new FormData();
                            formData.append('file', image);
                            formData.append('upload_preset', CLOUDINARY_PERSISTENT); 
                            formData.append('folder', 'developer_upload'); 
                    
                            const response = await axios.post(
                              `https://api.cloudinary.com/v1_1/${ CLOUDINARY_NAME}/image/upload`, // Replace your_cloud_name
                              formData
                            );
            
                            if (response?.data) {
                              payload.avatar = {
                                asset_id: response.data.asset_id,
                                secure_url: response.data.secure_url,
                                url: response.data.url,
                                public_id: response.data.public_id,
                              };
            
                            // payload.image = {
                            //     asset_id: '521a05de19f515c142808934df40a00f',
                            //     secure_url: 'https://res.cloudinary.com/dsy1slhvv/image/upload/v1741941865/developer_upload/nj8etfnhd7og4qc4ycjb.png',
                            //     url: 'http://res.cloudinary.com/dsy1slhvv/image/upload/v1741941865/developer_upload/nj8etfnhd7og4qc4ycjb.png',
                            //     public_id: 'developer_upload/nj8etfnhd7og4qc4ycjb',
                            //   };
                            }

                            console.log(payload,'-----')
                        // }
                       await addUser(payload)
                        await dispatch(addUserSuccess())
                        resetForm();
                        setImage(null);
            
                        successToast(`New ${payload.name} is created`);
            


        } catch (error: any) {
            dispatch(addUserFailure(error.message));

            errorToast(error?.response?.data?.message || error.message || 'Error occurred, please try again later');
        } finally{
            setIsLoading(false);


        }
    }



        const { getRootProps, getInputProps } = useDropzone({
            accept: { "image/*": [] }, // Only allow images
            maxFiles: 1,
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
                email:"",
                name:"",
                password:"",

            }}
                validationSchema={addUserSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue, handleBlur }) => {
                    return (
                        <Form>
                            <Box component="div" sx={boxSxStyle}>
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

                                {/* <Field
                                    as={TextField}
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                    sx={fieldSxStyle}
                                    disabled={isLoading}
                                /> */}



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


                                 <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                                                    {image ? (
                                                                        <>
                                                                            <img
                                                                                src={image}
                                                                                alt="Preview"
                                                                                style={{ width: "300px", height: "300px", objectFit: "cover", borderRadius: "8px" }}
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
                                                                                height: 150,
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
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default AddAgenciesForm