import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import {
  LoginPage, AdminLayout,
  ManageUsersDashboardPage,
  UsersAddPage,

  AdminLoginPage,
  ProtectUserRoute,
  SignUpPage,
  AddUsersPage,
  UsersEditPage
} from "./routes";
import Home from "./pages/Home/Home";
import { PriceChange } from "@mui/icons-material";


function App() {

  // const apiUrl = process.env;
  const apiUrl = import.meta.env.VITE_APP_API_KEY;


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/admin-login' element={<AdminLoginPage />} />
        <Route path='/' index element={<ProtectUserRoute />} />
        <Route path='/admin' element={<AdminLayout />} >

          {/* Emirates */}
          <Route path='manage-users' element={<ManageUsersDashboardPage />} />
          <Route path='users/add' element={<AddUsersPage />} />
          <Route path='users/list' element={<UsersAddPage />} />
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
