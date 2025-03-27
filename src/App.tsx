import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import {
  LoginPage, AdminLayout,
  ManageUsersDashboardPage,
  AdminLoginPage,
  ProtectUserRoute,
  SignUpPage,
  AddUsersPage,
  UsersEditPage,
  ManageProfilePage,
  AllUsersPage,
  UserHomePage,
  ManageUserProfilePage
} from "./routes";
import Home from "./pages/Home/Home";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/admin-login' element={<AdminLoginPage />} />

        <Route path='/' element={<ProtectUserRoute />}>
          <Route index element={<UserHomePage />} />
          <Route path='profile' element={<ManageUserProfilePage />} />
        </Route>



        <Route path='/admin' element={<AdminLayout />} >
          <Route path='profile' element={<ManageProfilePage />} />


          {/* Emirates */}
          <Route path='manage-users' element={<ManageUsersDashboardPage />} />
          <Route path='users/add' element={<AddUsersPage />} />
          <Route path='users/list' element={<AllUsersPage />} />
          <Route path='users/edit/:id' element={<UsersEditPage />} />

        </Route>

        <Route
          path="/"
          element={<Home />}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App  
