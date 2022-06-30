import { Route,Routes} from 'react-router-dom'
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Layout from "./pages/Layout/Layout";
import Profile from "./pages/Profile/Profile";
import Companies from "./pages/Companies/Companies";

function App() {

  return (
    <>
        <Routes>
            <Route path={'/signup'} element={<Registration/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/companies'} element={<Companies/>}/>
            </Route>
        </Routes>
    </>
  );
}

export default App;
