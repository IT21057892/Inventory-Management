/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tabs } from "antd";
import { Link, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import '../app.css';

const { TabPane } = Tabs;

function Carding() {
  
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin === false) {
          window.location.href = "/payment";
        }
      }, []);

  return (
    <div className="gradient-container">
      <Container>
        <h1 className="invt text-center">
          <b>Cards</b>
        </h1>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Cards" key="1">
            <Cards />
          </TabPane>
          <TabPane tab="Add Cards" key="2">
            <Addcard />
          </TabPane>
        </Tabs>
      </Container>
    </div>
  );
}

export default Carding;

//*****Display all the cards */
export function Cards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/cards");
        setCards(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Failed to fetch cards.");
      }
    };
    fetchData();
  }, []);

  async function deleteCard(id) {
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
          await axios.delete(`/api/cards/${id}`);
          setCards(cards.filter((card) => card._id !== id));
          Swal.fire(
            "Deleted!",
            "Your card has been deleted.",
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  function handlePrint() {
    window.print();
  }

  const filteredCards = cards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="gradient-container_1">
      <Container>
        <h3 style={{ textAlign: "center" }}>All Cards</h3>
        <input
          style={{ marginBottom: '10px' }}
          type="text"
          placeholder="Search by the name of the card holder..."
          value={searchQuery}
          onChange={(e) =>setSearchQuery(e.target.value)}
          />
          <button style={{ marginBottom: '10px' }} className="btn-success mt-4" onClick={handlePrint}>Print This Page</button>
          <Table hover>
            <thead className="invt thed-dark ">
                <tr>
                <th>Card Number</th>
                <th>Name</th>
                <th>Billing Address</th>
                <th>Expiry Date</th>
                <th>CVV</th>
                <th>Status</th>
                <th>Edit</th>
                </tr>
            </thead>

            <tbody>
                {filteredCards.map((card) => {
                return (
                    <tr key={card._id}>
                    <td>{card.cnumber}</td>
                    <td>{card.name}</td>
                    <td>{card.address}</td>
                    <td>{new Date(card.date).toLocaleDateString()}</td>
                    <td>{card.cvv}</td>
                    <td>{card.status}</td>
                    <td>
                        <button
                        style={{ marginLeft: '10px' }}
                        className="btn-danger mt-1"
                        onClick={() => {
                            deleteCard(card._id);
                        }}
                        >
                        Delete Card
                        </button>
                        <Link to={`/updatecard/${card._id}`}>
                        <button
                            style={{ marginLeft: '10px' }}
                            className="btn-success mt-4"
                        >
                            Update Card
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



/*add card component*/  
 export function Addcard() {
   const [cnumber, setCnumber] = useState('');
   const [name, setName] = useState('');
   const [address, setAddress]= useState('');
   const [date, setDate]= useState('');
   const [cvv, setCvv] = useState('');
   const [status, setStatus] = useState('');
    
 
   async function addCard() {
    if (!cnumber || !name || !address || !date || !cvv || !status) {
        Swal.fire('Incomplete Form', 'Please fill in all fields', 'warning');
        return;
      }

     const newcard = {
       cnumber,
       name,
       address,
       date,
       cvv,
       status,
     };
 
     try {
       const result = await axios.post('/api/cards', newcard);
       console.log(result.data);
       Swal.fire(
         'Congratulations !',
         ' Card Added Successfully',
         'success'
       ).then((result) => {
         window.location.href = '/payment';
       });
     } catch (error) {
       console.log(error);
       Swal.fire('Ooops !', 'Something went Wrong ', 'error');
     }

      

   }
 
   return (
    <div className="gradient-container_2">
      <h3 style={{textAlign: "center"}}>Add A Card</h3>
      <Container style={{maxWidth:"600px"}}>
        <div>
          <div className="form-group">
            <label htmlFor="cnumber">Card Cnumber:</label>
            <input
              type="text"
              className="invt form-control"
              id="cnumber"
              placeholder="Card Cnumber"
              value={cnumber}
              onChange={(e) => setCnumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Card Holder:</label>
            <input
              type="text"
              className="invt form-control"
              id="name"
              placeholder="Card Holder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Billing Address:</label>
            <input
              type="text"
              className="invt form-control"
              id="address"
              placeholder="Billing Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <DatePicker
              className="invt form-control"
              id="date"
              placeholderText="Select Date"
              selected={date}
              onChange={(selectedDate) => setDate(selectedDate)}
              minDate={new Date()} // Set minDate to the current date
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              className="invt form-control"
              id="cvv"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              className="invt form-control"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" disabled>Select A Status</option>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div className="invt text-right">
            <button style={{marginBottom:'20px'}} className="btn-success mt-4" onClick={addCard}>
              Add Card
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

 