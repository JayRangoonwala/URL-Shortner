import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="user">
        <Route path="signup" element={<Registration />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
