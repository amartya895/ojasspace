import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";

function App() {
  return <div className="app">
    <Navbar/>
    <Home/>
  </div>;
}

export default App;
