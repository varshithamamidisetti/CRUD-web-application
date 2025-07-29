import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import './styles.css';
import Footer from "./pages/footer";




function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;