import './app.css'
import Navbar from './components/Navbar.jsx'
import {BrowserRouter ,Routes, Route , Link} from "react-router-dom";
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';
import Inventory from './screens/Invetory';
import Updateitems from './screens/Updateitems';
import Employees from './screens/Employeeing';
import Updateemployees from './screens/Updateemployees';
import Payment from './screens/Payment'
import Updatecard from './screens/Updatecard';
import Reporting from './screens/Reporting';
import UpdateReport from './screens/Updatereports';
import Updateorder from './screens/Updateorder'
import BookingScreen from './screens/Bookingscreen'
import OrderScreen from './screens/OrderScreen';
import OrderAdmin from './screens/OrderAdmin';

function App() {
  return (
    <div className="App"> <Navbar/>
     <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Loginscreen />} />
            <Route path="/login" element={<Loginscreen />} />
            <Route path="/register" element={<Registerscreen />} />
            <Route path="/profile" element={<Profilescreen />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/updateitems/:id" element={<Updateitems/>} />
            <Route path="/employees" element={<Employees/>} />
            <Route path="/updateemployees/:id" element={<Updateemployees/>} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/updatecard/:id" element={<Updatecard/>} />
            <Route path="/report" element={<Reporting/>} />
            <Route path="/updatereports/:id" element={<UpdateReport/>} />
            <Route path="/updateorder/:id" element={<Updateorder/>} />
            <Route path="/homescreen/:id" element={<BookingScreen/>} />
            <Route path="/order" element={<OrderScreen/>} />
            <Route path="/orderad" element={<OrderAdmin/>} />
          </Routes>
      </BrowserRouter>
   
    </div>
  );
}
export default App;
