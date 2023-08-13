/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from "sweetalert2";
import { Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import '../app.css'; // Import your custom CSS file

import { Tabs } from "antd";
import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/orderad";
    }
  }, []);

  return (
    <div className="gradient-container">
      <Container>
    <div className="mt-3 ml-3 mr-3 bs">
      <h3 className="text-center">
        <b>Order Management</b>
      </h3>
      <Tabs defaultActiveKey="1">
      <TabPane tab="Orders" key="1">
          <Orders />
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <Bookings />
        </TabPane>
        <TabPane tab="Add Order" key="3">
          <Addorder />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
        
     
      </Tabs>
      </div>
      </Container>
      </div>
   
    
     
    
  );
}

export default Adminscreen;

//*****Display all the Bookings */

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (
          await axios.get("/api/bookings/getallbookings")
        ).data;
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function deleteBooking(bookingid) {
    try {
      const response = await axios.delete(`/api/bookings/deletebooking/${bookingid}`);
      const result = response.data;
  
      console.log(result);
  
      Swal.fire(
        "Congratulations!",
        "The Booking has been Removed",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
  
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  }



  return (
    <div className="gradient-container_1">
      <Container>
    <div className="row">
      <div className="col-md-10">
        <h5>Bookings</h5>

        <table className="table table-boardered table-dark">
          <thead className=" thed-dark ">
            <tr>
              
              <th>Order</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    
                    <td>{booking.order}</td>
                    <td>{booking.price}</td>
                    <td>{booking.quantity}</td>
                    <td>{booking.totalAmount}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteBooking(booking._id);
                        }}
                      >
                        Remove
                      </button>
                      </td>

                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
    </Container>
    </div>
    
  );
}

//*****Display all the Orders */
export function Orders() {
  const [orders, setorders] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("/api/orders/getallorders")).data;
        setorders(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function deleteOrder(orderid) {
    try {
      const result = await (
        await axios.delete(`/api/orders/deleteorder/${orderid}`)
        
      ).data;
  
      console.log(result);
  
      Swal.fire(
        "Congratulations!",
        "Your Booking has been cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
  
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  }
  
  return (
    <div className="gradient-container_1">
      <Container>
    <div className="row">
      <div className="col-md-10">
        <h5>Orders</h5>
  
        <table className="table table-boardered table-dark">
          <thead className=" thed-dark ">
            <tr>
            
              <th>Order Name</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Edit</th>
            </tr>
          </thead>
  
          <tbody>
            {orders.length &&
              orders.map((order) => {
                return (
                  <tr key={order._id}>
                    
                    <td>{order.name}</td>
                    <td>{order.price}</td>
                    <td>{order.offers}</td>
                    <td>
                      <button
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteOrder(order._id);
                        }}
                      >
                        Delete Order
                      </button>
                      <Link to = {`/updateorder/${order._id}`}>
                      <button className="btn-success mr-1 mt-4">
                        Update order
                      </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
    </Container>
    </div>
  );
 }

//*****Display all the Users */
export function Users() {
  const [users, setusers] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("/api/users/getallusers")).data;
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function deleteUser(userid) {
    try {
      const response = await axios.delete(`/api/users/deleteuser/${userid}`);
      const result = response.data;
  
      console.log(result);
  
      Swal.fire(
        "Congratulations!",
        "Your Booking has been cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
  
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  }
  

  return (
    <div className="gradient-container_1">
    <Container>
    
    <div className="row">
      <div className="col-md-10">
        <h5>Users</h5>

        <table className="table table-boardered table-dark">
          <thead className=" thed-dark ">
            <tr>
              
              <th>User Name</th>
              <th>User NIC</th>
              <th>User Contact</th>
              <th>user Email</th>
              <th>Is Admin</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    
                    <td>{user.name}</td>
                    <td>{user.nic}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                    <td>
                      <button
                        className="btn-danger mt-1"
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Remove
                      </button>
                      </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
    </Container>
    </div>
  );
}

//****Add order component*/

export function Addorder() {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [offers, setoffers] = useState("");
  const [description, setdescription] = useState("");
  const [imageurl1, setimageurl1] = useState("");
  const [imageurl2, setimageurl2] = useState("");
  const [imageurl3, setimageurl3] = useState("");

  async function addorder() {
    const neworder = {
      name,
      price,
      offers,
      description,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      const result = await await axios.post("/api/orders/addorder", neworder).data;

      console.log(result);
      Swal.fire(
        "Congratulations !",
        " order Added Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/orderad";
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Ooops !", "Something went Wrong ", "error");
    }
  }
  
  

  return (
    <div className="gradient-container_1">
    <Container>
    <div>
      {" "}
      <h5>Add order</h5>
      <div className="row">
        <div className="col-md-5">
          <input
            typr="text"
            className="form-control"
            placeholder="order name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Rent Per Day"
            value={price}
            onChange={(e) => {
              setprice(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Max Count"
            value={offers}
            onChange={(e) => {
              setoffers(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
        </div>

        <div className="col-md-5">
          <h6>Add Images</h6>
          <input
            typr="text"
            className="form-control"
            placeholder="Image URL 1"
            value={imageurl1}
            onChange={(e) => {
              setimageurl1(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Image URL 2"
            value={imageurl2}
            onChange={(e) => {
              setimageurl2(e.target.value);
            }}
          />
          <input
            typr="text"
            className="form-control"
            placeholder="Image URL 3"
            value={imageurl3}
            onChange={(e) => {
              setimageurl3(e.target.value);
            }}
          />

          <div className="text-right">
            <button className="btn btn-primary mt-2" onClick={addorder}>
              Add order
            </button>
          </div>
        </div>
      </div>
    </div>
    </Container>
    </div>
  );
}

// Update order Componenet //


export function Regorder() {
  const [regorders, setRegorders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("/api/regorder/getallregorder");
      const data = response.data;
      setRegorders(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function deleteRegorder(userid) {
    try {
      const response = await axios.delete(`/api/regorder/deleteregorder/${userid}`);
      const result = response.data;
  
      console.log(result);
  
      Swal.fire(
        "Congratulations!",
        "Your Booking has been cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
  
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  }

  return (
    <div className="row">
      <div className="col-md-10">
        <h5>New Registered Orders</h5>

        <table className="table table-bordered table-dark">
          <thead className="thead-dark">
            <tr>
              
              <th>Name</th>
              <th>NIC</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Vehicle No</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : regorders.length === 0 ? (
              <tr>
                <td colSpan="7">No data available</td>
              </tr>
            ) : (
              regorders.map((regorder) => (
                <tr key={regorder._id}>
                
                  <td>{regorder.name}</td>
                  <td>{regorder.nic}</td>
                  <td>{regorder.phone}</td>
                  <td>{regorder.email}</td>
                  <td>{regorder.vrno}</td>
                  <td>
                    <button
                      className="btn-danger mt-1"
                      onClick={() => {
                        deleteRegorder(regorder._id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
