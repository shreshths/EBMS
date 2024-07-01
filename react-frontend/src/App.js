import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListBookComponent from "./components/ListBookComponent";
import AddBookComponent from "./components/AddBookComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ListBookComponent />} />
            <Route path="books" element={<ListBookComponent />}></Route>
            <Route path="add-book" element={<AddBookComponent />}></Route>
            <Route path="/edit-book/:id" element={<AddBookComponent />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
