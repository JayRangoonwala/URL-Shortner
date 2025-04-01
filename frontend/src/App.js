import "./App.css";
import Home from "./screens/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Routes, Route } from "react-router-dom";
import {RedirectUrl} from './components/redirecturl';
import Analytics from "./components/Analytics";
// import { useLogginContext } from "./context/userlogin";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shorturl" element={<RedirectUrl />}/>
        <Route path="/analysis" element={<Analytics />}/>
        <Route path="user">
          <Route path="signup" element={<Registration />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
