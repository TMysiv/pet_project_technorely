import {Route, Routes} from 'react-router-dom'

import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Layout from "./pages/Layout/Layout";
import Profile from "./components/Profile/Profile";
import Companies from "./components/Companies/Companies";
import RequireAuth from "./hok/RequireAuth";
import AdminAuth from "./hok/AdminAuth";
import Admin from "./pages/Admin/Admin";
import UsersAll from "./components/UsersAll/UsersAll";
import CompaniesAll from "./components/CompaniesAll/CompaniesAll";
import NotFound from "./pages/NotFound/NotFound";

function App() {

    return (
        <>
            <Routes>

                <Route path={'/'} element={<RequireAuth><Layout/></RequireAuth>}>
                    <Route index element={<Profile/>}/>
                    <Route path={'/companies'} element={<Companies/>}/>
                </Route>
                <Route path={'admin'} element={<AdminAuth><Admin/></AdminAuth>}>
                    <Route index element={<Profile/>}/>
                    <Route path={'users'} element={<UsersAll/>}/>
                    <Route path={'companies'} element={<CompaniesAll/>}/>
                </Route>

                <Route path={'/signup'} element={<Registration/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path='*' element={<NotFound/>}/>

            </Routes>
        </>
    );
}

export default App;
