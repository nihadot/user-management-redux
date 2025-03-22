import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import {
  LoginPage,  AdminLayout,
  ManageUsersDashboardPage,
  UsersAddPage,
  
  AdminLoginPage

} from "./routes";
import Home from "./pages/Home/Home";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin-login' element={<AdminLoginPage />} />
        <Route path='/admin' element={<AdminLayout />} >
          <Route path='' index element={<>Admin</>} />

          {/* Emirates */}
          <Route path='manage-users' element={<ManageUsersDashboardPage />} />
          <Route path='users/add' element={<UsersAddPage />} />
       



        </Route>

        <Route
        path="/"
        element={<Home/>}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App  
