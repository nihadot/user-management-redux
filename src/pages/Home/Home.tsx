import React from 'react'
import Header from "../../components/Header"
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../services/userApi'
import { fetchProfileFailure, fetchProfileStart, fetchProfileSuccess } from '../../redux/slices/userSlice'
import { RootState } from '../../redux/store'
import { Avatar, Button, Card, CardContent, CardHeader, Grid2, Typography } from '@mui/material'
import { Link } from 'react-router'


type Props = {}

function Home({ }: Props) {

  const dispatch = useDispatch();


  const { profile }: { profile: any } = useSelector((state: RootState) => state.user)


  React.useEffect(() => {
    fetchUserFunction()
  }, [])

  const fetchUserFunction = async () => {
    dispatch(fetchProfileStart())
    try {
      const result = await getUserProfile()
      dispatch(fetchProfileSuccess(result.data))
 
    } catch (error: any) {
      dispatch(fetchProfileFailure(error.message))

    }
  }

  return (
    <div>
      <div className="">
        <Header />
      </div>


      <Grid2 container spacing={2} py={1} display={"flex"} justifyContent={"center"} mt={20}>
        <Grid2 size={9}>


          <Card sx={{ maxWidth: 400, p: 2, boxShadow: 3, textAlign: "center" }}>
            <CardHeader
              avatar={<Avatar src={profile?.avatar?.secure_url} sx={{ width: 80, height: 80, mx: "auto" }} />}
            />
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {profile?.name || "Unknown User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile?.email || "No email provided"}
              </Typography>

              <Link to={'/profile'}>
                <Button sx={{ marginTop: "10px", backgroundColor: "green" }} variant='contained'>Edit</Button></Link>
                
            </CardContent>
          </Card>


        </Grid2>
      </Grid2>



    </div>

  )
}

export default Home