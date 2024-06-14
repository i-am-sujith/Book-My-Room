import IndexPages from "./pages/IndexPages";
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/AccountPage";
import AccountPage from "./pages/AccountPage";


axios.defaults.baseURL = 'http://localhost:4000'

// for cookie/token sharing throgh axios
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<IndexPages />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpage?" element={<AccountPage />} />
            <Route path="/account/:subpage/:action" element={<AccountPage />} />




          </Route>

        </Routes>

      </UserContextProvider>
    </>
  );
}

export default App;
