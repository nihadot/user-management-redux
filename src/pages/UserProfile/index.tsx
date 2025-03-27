
type Props = {}
import { Field, Form, Formik } from "formik"
import Header from "../../components/Header"
import { UserProfileSchema } from "./validations"
import { errorToast, successToast } from "../../components/Toast"
import React, {  useState } from "react"
import { CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from "../../api"
import axios from "axios"
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { boxSxStyle, buttonSxStyle, fieldSxStyle } from "../users/static"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { GridDeleteIcon } from "@mui/x-data-grid"
import { useDropzone } from "react-dropzone"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { fetchProfileFailure, fetchProfileStart, fetchProfileSuccess, updateProfileFailure, updateProfileStart } from "../../redux/slices/userSlice"
import { getUserProfile, isUserMailExist, updateProfile } from "../../services/userApi"
import { addUserSuccess } from "../../redux/slices/adminSlice"


function index({ }: Props) {

    const [isLoading, setIsLoading] = useState(false);

    const [image, setImage] = useState<any>();


    const dispatch = useDispatch();


    const { profile }: { profile: any } = useSelector((state: RootState) => state.user)
    const [userData,setUserData] = useState<any>()
  
  
    React.useEffect(() => {
      fetchUserFunction()
    }, [])
  
    const fetchUserFunction = async () => {
      dispatch(fetchProfileStart())
      try {
        const result = await getUserProfile()
        setUserData(result.data)
        dispatch(fetchProfileSuccess(result.data))
      } catch (error: any) {
        dispatch(fetchProfileFailure(error.message))
  
      }
    }
  
    // {console.log(profile,'profile')}

    const handleSubmit = async (values: { name: string, email: string, password?: string, avatar?: string }, { resetForm }: { resetForm: any, setFieldValue: any }) => {
        try {

            setIsLoading(true);

            // if (!profile?.avatar?.secure_url && !image) {
            //     return errorToast("Please select an image");
            // }

            await isUserMailExist(values.email);

            // return true
            dispatch(updateProfileStart());


            const payload: { name: string, email: string, password?: string, avatar?: any } = {
                name: values.name,
                email: values.email,
            }

         
            if(values.password){
                payload.password = values.password
            }


             if(image){
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
            await updateProfile(payload)
            dispatch(addUserSuccess())
            resetForm();
            setImage(null);

            successToast(`New ${payload.name} is created`);

                dispatch(fetchProfileStart())
            
                      const result = await getUserProfile()
                      dispatch(fetchProfileSuccess(result.data))



        } catch (error: any) {
            dispatch(updateProfileFailure(error.message));
      dispatch(fetchProfileFailure(error.message))

            errorToast( error?.response?.data?.errors?.join(', ') || error?.response?.data?.message || error.message || 'Error occurred, please try again later');
        } finally {
            setIsLoading(false);


        }
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };





    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] }, // Only allow images
        maxFiles: 1,
        maxSize: 512000, // 500KB in bytes
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
        <main>
            <div className="">
                <Header />
            </div>







        { userData &&    <div className='max-w-[400px] m-auto mt-12 w-full'>
                <Formik
                enableReinitialize={true}
                    initialValues={{...profile}}
                    validationSchema={UserProfileSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => {
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


{ profile?.avatar?.secure_url &&
       <img
       src={profile?.avatar?.secure_url}
       alt="Preview"
       style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "100%" }}
   />
}

<Box display="flex" flexDirection="column" alignItems="start" gap={0}>
                                    {image ? (
                                        <>
                                            <img
                                                src={image}
                                                alt="Preview"
                                                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "100%" }}
                                            />
                                            <br />
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
                                                width: 100,
                                                height: 100,
                                                border: "2px dashed #ccc",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "100%",
                                                cursor: "pointer",
                                                padding:3,
                                                textAlign: "center",
                                                "&:hover": { borderColor: "blue" },
                                            }}
                                        >
                                            <input {...getInputProps()} />
                                            <Typography variant="body2" color="textSecondary">
                                             Upload
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
            </div>}
        </main>
    )
}

export default index