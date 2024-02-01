import './App.css';
import {Login} from "./Pages/LoginPage/Login";
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './components/form components/Navbar/Navbar';
import Sidebar from './components/form components/Sidebar/Sidebar';
import { Layout } from './Layout/Layout';
import { Footer } from './components/form components/Footer/Footer';
import { Profile } from './Pages/ProfilePage/Profile';
import React from 'react';
import { Listing } from './Pages/ListingPage/Listing';
import { BlockPage } from './Pages/BlockPage/BlockPage';
import { Categories } from './Pages/Categories/Categories';
import { Products } from './Pages/ProductPage/Products';
import { POS } from './Pages/POS Page/POS';
import { BillTemplate } from './Pages/templates/Bill.template';
import { OrderListing } from './Pages/OrderListing/OrderLisitng';
import { MyDocument } from './components/PdfTemplate/PdfTemplate';



function App() {
  const [file,setFile] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleSnacker = ()=>{
    setOpen(prev=>!prev);
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login open={open} handleSnacker={handleSnacker}/>}/>
          {/* <Route path='/layout' element={<Layout file={file}/>} /> */}
          <Route path='/profile' element={<Profile file={file} setFile={setFile} open={open} handleSnacker={handleSnacker}/>} />
          <Route path='/listing' element={<Listing file={file}/>} />
          <Route path='/products' element={<Products file={file}/>} />
          <Route path='/pos' element={<POS file={file}/>} />
          <Route path='/pdf' element={<MyDocument/>} />

          <Route path='/block' element={<BlockPage file={file}/>} />
          <Route path='/categories' element={<Categories file={file}/>} />
          <Route path='/bill' element={<BillTemplate />}/>
          <Route path='/pos/orders' element={<OrderListing file={file}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
