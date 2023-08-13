/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import React from "react";
import { useParams, useLocation } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

import StripeCheckout from "react-stripe-checkout";

import Swal from "sweetalert2";

function Bookingscreen() {
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();
  let [order, setorder] = useState();
  let [quantity, setQuantity] = useState(0);
  let [totalAmount, setToatalAmount] = useState(0);

  let { id } = useParams();
  let location = useLocation();
  
 

  useEffect(() => {
    const fetchData = async () => {

      if(!localStorage.getItem('currentUser')){
        window.location.reload = '/login'
      }

      try {
        setloading(true);
        const data = (
          await axios.post("/api/orders/getorderbyid", { orderid: id })
        ).data;

        setorder(data);
        setloading(false);
        console.log(data);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const quantityParam = parseInt(searchParams.get('quantity'));
    setQuantity(quantityParam || 1);
  }, [location.search]);
  
  useEffect(() => {
    if (order) {
      let amount = quantity * order.price;

      setToatalAmount(amount);
    }
  }, [order, quantity]);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      order,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      totalAmount,
      quantity,
      token,
    };

    console.log('Quantity:', quantity);

    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookorderbyid", bookingDetails).data;

      setloading(false);
      Swal.fire( "Congratulations !",
      "Your Order is reserved Successfully",
      "success").then(result => {
        window.location.href='/home'
        
      })
        
    } catch (error) {
      
      setloading(false);
      Swal.fire("Ooops !", "Something went Wrong ", "error"
      ).then(result => {
        window.location.href='/home'
        alert(error)
        
      });
    }
    
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred.</div>;
  }

  if (!order) {
    return null;
  }
  function handlePrint() {
    window.print();
  }
  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />{" "}
        </h1>
      ) : order ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5">
              <h1>{order.name}</h1>
              <img src={order.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-5 ">
            
              <div>
                <h3 style={{ textAlign: "center" }}>
                  <b>Booking details </b>
                </h3>
                <hr />
                <div style={{ textAlign: "right" }}>
                  <p>
                    <b>Name : </b>{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>
                  <b>NIC : </b>{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).nic}
                  </p>
                  <p>
                  <b>Contact Number : </b>{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).phone}
                  </p>
                 
                </div>
              </div>

              <div>
                <h3 style={{ textAlign: "center" }}>
                  <b>Amount</b>
                </h3>
                <hr />
                <div style={{ textAlign: "right" }}>
                  <p>
                    <b>Quantity: </b>
                    {quantity}
                  </p>
                  <p>
                    <b>Price for 1 Unit:</b>
                    {order.price}
                  </p>
                  <p>
                    <b>Total Amount: </b> {totalAmount}
                  </p>
                </div>
                
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalAmount * 100}
                  token={onToken}
                  currency="LKR"
                  stripeKey="pk_test_51Mw0Y3GaX4dMd9Ph5FFdbJJQW6ukPYnjcFIpliD85djOTZwUNeW6nyO5mu42ycR8SBuhG3C9XDRnYCBVRL9t2JpY00uXxvj6pQ"
                >
                  <button className="btn btn-primary">Pay Now</button>
                  <button style={{width:'200px'}}className="btn btn-primary" onClick={handlePrint}>Download PDF</button>
                  
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}
export default Bookingscreen;
