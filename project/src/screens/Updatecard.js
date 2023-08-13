import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container } from "react-bootstrap";

function UpdateCard() {
  const { id } = useParams();

  const [cnumber, setCnumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress]= useState('');
  const [date, setDate]= useState('');
  const [cvv, setCvv] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const { data } = await axios.get(`/api/cards/${id}`);
        setCnumber(data.cnumber);
        setName(data.name);
        setAddress(data.address);
        setDate(new Date(data.date));
        setCvv(data.cvv)
        setStatus(data.status);
      } catch (error) {
        console.log(error);
        Swal.fire("Ooops!", "Failed to fetch the card.", "error");
      }
    };
    fetchCard();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Show Swal fire confirmation dialog
    Swal.fire({
        title: "Confirm Update",
        text: "Are you sure you want to update the card details?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed, proceed with update
          performUpdate();
        }
      });
    };
  
    const performUpdate = async () => {
      try {
        await axios.patch(`/api/cards/${id}`, { cnumber, name, address, date, cvv, status });
        Swal.fire(
          "Congratulations!",
          "Your Card has been updated",
          "success"
        ).then((result) => {
          window.location.href = "/payment";
        });
      } catch (error) {
        console.log(error);
        Swal.fire("Ooops!", "Something went wrong", "error");
      }
    };
  

  return (
    <div className="gradient-container">
    <Container>
      <h1 className="invt text-center">
        <b>Cards</b>
      </h1>
    <div className="gradient-container_1">
      <Container>
      <h3 className="text-center">Update Card</h3>
      <form onSubmit={handleUpdate}>
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
        
        <button style={{marginBottom:'20px'}} type="submit" className="btn-success mt-4">
          Update Card
        </button>
      </form>
      </Container>
    </div>
    </Container>
    </div>
  );
}

export default UpdateCard;
