/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from "sweetalert2";

import { Tabs } from "antd";
import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import '../app.css'; // Import your custom CSS file

const { TabPane } = Tabs;

function Iteming() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";


    }
  }, []);

  return (
    <div className="gradient-container">
    <Container>
      <h1 className="invt text-center">
        <b>Items</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Items" key="1">
          <Items />
        </TabPane>
        <TabPane tab="Add Items" key="2">
          <Additem />
        </TabPane>
        <TabPane tab="Re-order Items" key="3">
          <ReoderItems />
        </TabPane>
      </Tabs>
      </Container>
    </div>
  );
}

export default Iteming;

//*****Display all the items */
export function Items() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [searchQuery, setSearchQuery] = useState("");

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/api/items");
          setItems(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError("Failed to fetch items.");
        }
      };
      fetchData();
    }, []);
  
      async function deleteItem(id) {
        try {
          Swal.fire({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this record!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete(`/api/items/${id}`);
            setItems(items.filter((item) => item._id !== id));
            Swal.fire(
              "Deleted!",
              "Your item has been deleted.",
              "success"
            ).then((result) => {
             window.location.reload();
           });
          }
        });
      } catch (error) {
        console.log(error);
        Swal.fire("Ooops!", "Something went wrong", "error");
      }
    }
    if(loading){
        return<div>Loading...</div>;
    }

    if(error){
        return<div>{error}</div>;
    }

    function handlePrint() {
      window.print();
    }

    // const filteredItems = items.filter(
    //   (item) =>
    //     item.title.toLowerCase().includes(searchQuery.toLowerCase())
        
    // );

    const filteredItems = items
    .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.quanty - b.quanty);

      return (
        <div className="gradient-container_1">
          <Container>
            <h3 style={{ textAlign: "center" }}>All Items</h3>
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              placeholder="Search by item name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              style={{ marginBottom: "10px" }}
              className="btn-success mt-4"
              onClick={handlePrint}
            >
              Print This Page
            </button>
    
            <Table hover>
              <thead className="invt thed-dark ">
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Value per Item</th>
                  <th>Total Value</th>
                  <th>Re-Order</th>
                  <th>Edit</th>
                </tr>
              </thead>
    
              <tbody>
                {filteredItems.map((item) => {
                  const totalValue = item.quanty * item.value;
                  const shouldReorder = item.quanty <= 5 ? "Yes" : "No";
                  return (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.quanty}</td>
                      <td>LKR {item.value}.00</td>
                      <td>LKR {totalValue}.00</td>
                      <td>{shouldReorder}</td>
                      <td>
                        <button
                          style={{ marginLeft: "10px" }}
                          className="btn-danger mt-1"
                          onClick={() => {
                            deleteItem(item._id);
                          }}
                        >
                          Delete Item
                        </button>
                        <Link to={`/updateitems/${item._id}`}>
                          <button
                            style={{ marginLeft: "10px" }}
                            className="btn-success mt-4"
                          >
                            Update Item
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Container>
        </div>
      );
    
  }



/*add item component*/  
 export function Additem() {
   const [title, setTitle] = useState('');
   const [quanty, setQuanty] = useState('');
   const [value, setValue] = useState('')
    
 
   async function addItem() {
    if (!title || !quanty || !value) {
        Swal.fire('Incomplete Form', 'Please fill in all fields', 'warning');
        return;
      }

     const newitem = {
       title,
       quanty,
       value,
     };
 
     try {
       const result = await axios.post('/api/items', newitem);
       console.log(result.data);
       Swal.fire(
         'Congratulations !',
         ' Item Added Successfully',
         'success'
       ).then((result) => {
         window.location.href = '/inventory';
       });
     } catch (error) {
       console.log(error);
       Swal.fire('Ooops !', 'Something went Wrong ', 'error');
     }

      

   }
 
   return (
    <div className="gradient-container_2">
      <h3 style={{textAlign: "center"}}>Add A Item</h3>
      <Container style={{maxWidth:"600px"}}>
        <div>
          <div className="form-group">
            <label htmlFor="title">Item Title:</label>
            <input
              type="text"
              className="invt form-control"
              id="title"
              placeholder="Item Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quanty">Quantity:</label>
            <input
              type="text"
              className="invt form-control"
              id="quanty"
              placeholder="Quantity"
              value={quanty}
              onChange={(e) => setQuanty(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value per Item:</label>
            <input
              type="text"
              className="invt form-control"
              id="value"
              placeholder="Value per Item"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          
          <div className="invt text-right">
            <button style={{marginBottom:'20px'}} className="btn-success mt-4" onClick={addItem}>
              Add Item
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

 /***re-order levels*/
 export function ReoderItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/items");
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Failed to fetch items.");
      }
    };
    fetchData();
  }, []);
    if(loading){
      return<div>Loading...</div>;
  }

  if(error){
      return<div>{error}</div>;
  }

  function handlePrint() {
    window.print();
  }


  // Filter items where the quantity is less than or equal to 3
  const filteredItems = items.filter((item) => item.quanty <= 10);
  filteredItems.sort((a, b) => a.quanty - b.quanty);

  return (
    <div className="gradient-container_1">
        <Container>
          <h3 style={{textAlign: "center"}}>Items Low On Quantity</h3>

          <button style={{marginBottom:'10px'}} className="btn-success mt-4" onClick={handlePrint}>Print This Page</button>

        <Table hover>
          <thead className="invt thed-dark ">
            <tr>
              
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Value per item</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item) => {
              return (
                <tr key={item._id}>
                 
                  <td>{item.title}</td>
                  <td>{item.quanty}</td>
                  <td>LKR {item.value}.00</td>
                  
                </tr>
              );
            })}
          </tbody>
        </Table>
        </Container>
      </div>

  );
}
