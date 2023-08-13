import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container } from "react-bootstrap";

function UpdateEmployee() {
  const { id } = useParams();

  const [nic, setNic] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [time, setTime] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await axios.get(`/api/employees/${id}`);
        setNic(data.nic);
        setName(data.name);
        setPosition(data.position);
        setTime(data.time);
        setSalary(data.salary);
      } catch (error) {
        console.log(error);
        Swal.fire("Ooops!", "Failed to fetch the employee.", "error");
      }
    };
    fetchEmployee();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Show Swal fire confirmation dialog
    Swal.fire({
        title: "Confirm Update",
        text: "Are you sure you want to update the employee details?",
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
        await axios.patch(`/api/employees/${id}`, { nic, name, position, time, salary });
        Swal.fire(
          "Congratulations!",
          "Your Employee has been updated",
          "success"
        ).then((result) => {
          window.location.href = "/employees";
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
        <b>Employees</b>
      </h1>
    <div className="gradient-container_1">
      <Container>
      <h3 className="text-center">Update Employee</h3>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="nic">Nic</label>
          <input
            type="text"
            className="form-control"
            id="nic"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              className="invt form-control"
              id="position"
              placeholder="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Working Hours:</label>
            <input
              type="text"
              className="invt form-control"
              id="time"
              placeholder="Working Hours"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="text"
              className="invt form-control"
              id="salary"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
        
        <button style={{marginBottom:'20px'}} type="submit" className="btn-success mt-4">
          Update Employee
        </button>
      </form>
      </Container>
    </div>
    </Container>
    </div>
  );
}

export default UpdateEmployee;
