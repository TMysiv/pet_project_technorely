import { Route,Routes} from 'react-router-dom'
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Layout from "./pages/Layout/Layout";
import Profile from "./components/Profile/Profile";
import Companies from "./components/Companies/Companies";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import CreateCompany from "./pages/CreaateCompany/CreateCompany";

function App() {

  return (
    <>
        <Routes>
            <Route path={'/signup'} element={<Registration/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'update'} element={<UpdateUser/>}/>
            <Route path={'createCompany'} element={<CreateCompany/>}/>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Profile/>}/>
                <Route path={'/companies'} element={<Companies/>}/>
            </Route>
        </Routes>
    </>
  );
}

export default App;
