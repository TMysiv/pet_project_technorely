import { Route,Routes} from 'react-router-dom'
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";

function App() {

  return (
    <>
        <Routes>
            <Route path={'/signup'} element={<Registration/>}/>
            <Route path={'/signin'} element={<Login/>}/>
        </Routes>
    </>
  );
}

export default App;
