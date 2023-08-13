import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";

function UpdateItem() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [quanty, setName] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(`/api/items/${id}`);
        setTitle(data.title);
        setName(data.quanty);
        setValue(data.value);
      } catch (error) {
        console.log(error);
        Swal.fire("Ooops!", "Failed to fetch the item.", "error");
      }
    };
    fetchItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Show Swal fire confirmation dialog
    Swal.fire({
        title: "Confirm Update",
        text: "Are you sure you want to update the item details?",
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
        await axios.patch(`/api/items/${id}`, { title, quanty, value});
        Swal.fire(
          "Congratulations!",
          "Your Item has been updated",
          "success"
        ).then((result) => {
          window.location.href = "/inventory";
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
        <b>Items</b>
      </h1>
    <div className="gradient-container_1">
      <Container>
      <h3 className="text-center">Update Item</h3>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="title">Item Name</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quanty">Name</label>
          <input
            type="text"
            className="form-control"
            id="quanty"
            value={quanty}
            onChange={(e) => setName(e.target.value)}
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
        
        
        <button style={{marginBottom:'20px'}} type="submit" className="btn-success mt-4">
          Update Item
        </button>
      </form>
      </Container>
    </div>
    </Container>
    </div>
  );
}

export default UpdateItem;
