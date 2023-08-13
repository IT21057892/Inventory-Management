/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Order from "../components/Order";
import Loader from "../components/Loader";
import '@lottiefiles/lottie-player';
import { Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import '../app.css'; // Import your custom CSS file



import "antd/dist/reset.css";
import moment from "moment";

import { DatePicker, Select, Space } from "antd";
const { RangePicker } = DatePicker;


function Homescreen() {
  let [loading, setloading] = useState();
  let [error, seterror] = useState();
  let [orders, setorders] = useState([]);

  

  let [duplicateorders, setduplicateorders] = useState([]);

  let [searchkey , setsearchkey] = useState('')
  let [name , setname] = useState('all')

  useEffect(() => {
    async function getResults() {
      setloading(true);
      const data = (await axios("/api/orders/getallorders")).data;

      setorders(data);
      setduplicateorders(data);
      setloading(false);

      console.log(data);
    }
    getResults();
  }, []);

  // function filterByDate(dates) {
  //   const [from, to] = dates;
  //   setfromdate(from.format("DD-MM-YYYY"));
  //   settodate(to.format("DD-MM-YYYY"));

  //   var temporders = [];
  //   var availability = false;

  //   for (const order of duplicateorders) {
  //     if (order.currentbookings.length > 0) {
  //       for (const booking of order.currentbookings) {
  //         if (
  //           !
  //             moment(from.format("DD-MM-YYYY")).isBetween(
  //               booking.fromdate,
  //               booking.todate
  //             )
  //            &&
  //           !
  //             moment(from.format("DD-MM-YYYY")).isBetween(
  //               booking.fromdate,
  //               booking.todate
  //             )
            
  //         ) {
  //           if (
  //             from.format("DD-MM-YYYY") !== booking.fromdate &&
  //             from.format("DD-MM-YYYY") !== booking.todate
  //           ) {
  //             availability = true;
  //           }
  //         }
  //       }
  //     }

  //       if (availability == true || order.currentbookings.length==0)
  //       {
  //         temporders.push(order)
  //       }
  //   }
  //   setorders(temporders)
  // }
   
  function filterBySearch(){

    const temporders = duplicateorders.filter(order=> order.name.toLowerCase().includes(searchkey.toLowerCase()))

    setorders(temporders)

  }

  // function filterByName(value) {
  //   setname(value);
  
  //   if (value !== "all") {
  //     const temporders = duplicateorders.filter(
  //       (order) => order.name.toLowerCase() === value.toLowerCase()
  //     );
  //     setorders(temporders);
  //   } else {
  //     setorders(duplicateorders);
  //   }
  // }

  function handleLottieClick (){
    const homeMainContainer = document.getElementById("home-main-container");
    homeMainContainer.scrollIntoView({behavior: "smooth"});
  }

  function OrderPageBanner() {
    return (
      <section
       class="img-fluid justify-content-center " className="w-auto p-3 hero-image1" 
        
      >

        <div className="text-muted">
          <h1 className="text-center hero-title" >PRODUCTS</h1>
          
          <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_klsab29v.json"
          background="transparent"
          speed="1"
          style={{ width: '60px', height: '60px', margin: 'auto' }}
          loop
          autoplay
          onClick={handleLottieClick}
          
        >
          
        </lottie-player>
        
          </div>
      </section>
    );
  }
  
  return (
    
   <><div> <OrderPageBanner /> </div>
    <div className="gradient-container1">
   <div className="" id="home-main-container">
   
      <Container>
      <div className="row mt-5 ">
        {/* <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div> */}

        <div className="col-md-5 ">
          <input type="text" className="form-control" placeholder="Search Orders"
            value={searchkey} onChange={(e) => { setsearchkey(e.target.value); } } onKeyUp={filterBySearch} />

        </div>

        {/* <div className="col-md-3">
          <select className="form-control" value={name} onChange={(e) => filterByName(e.target.value)}>
            <option value="all">All</option>
            <option value="vans">Vans</option>
            <option value="cars">Cars</option>
            <option value="jeeps">Jeeps</option>
            <option value="other">Others</option>
            

          </select>
        </div> */}
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
          
        ) : (
          
          orders.map((order) => {
            return (
              <div className="col-md-6 mt-2 ">
                <Order order={order}  />
              </div>
            );
          })
        )}
      </div>
      </Container>
    </div>
    </div></>
  );
}

export default Homescreen;
