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

function Employee() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/employees";


    }
  }, []);

  return (
    <div className="gradient-container">
    <Container>
      <h1 className="invt text-center">
        <b>Employees</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Employees" key="1">
          <Employees />
        </TabPane>
        <TabPane tab="Add Employees" key="2">
          <Addemployee />
        </TabPane>
      </Tabs>
      </Container>
    </div>
  );
}

export default Employee;

//*****Display all the employees */
export function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [searchQuery, setSearchQuery] = useState("");

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/api/employees");
          setEmployees(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError("Failed to fetch employees.");
        }
      };
      fetchData();
    }, []);
  
      async function deleteEmployee(id) {
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
            await axios.delete(`/api/employees/${id}`);
            setEmployees(employees.filter((employee) => employee._id !== id));
            Swal.fire(
              "Deleted!",
              "Your employee has been deleted.",
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

    const filteredEmployees = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
   
  
    return (
      <div className="gradient-container_1">
        <Container>
          <h3 style={{textAlign: "center"}}>All Employees</h3>
          <input style={{marginBottom:'10px'}}
             type="text"
             placeholder="Search by employee name..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button style={{marginBottom:'10px'}} className="btn-success mt-4" onClick={handlePrint}>Print This Page</button>
  
          <Table hover>
            <thead className="invt thed-dark ">
              <tr>
              
                <th>Employee NIC</th>
                <th>Name</th>
                <th>Position</th>
                <th>Working Hours</th>
                <th>Salary</th>
                <th>Edit</th>
              </tr>
            </thead>
  
            <tbody>

            {filteredEmployees.map((employee) => {
                return (
                  <tr key={employee._id}>
                   
                    <td>{employee.nic}</td>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>{employee.time}Hrs</td>
                    <td>LKR {employee.salary}.00</td>
                    <td>
                      <button style={{marginLeft:'10px'}}
                        className="btn-danger mt-1" 
                        onClick={() => {
                          deleteEmployee(employee._id);
                        }}
                      > 
                        Delete Employee
                      </button>
                      <Link to={`/updateemployees/${employee._id}`}>
                       
                        <button style={{marginLeft:'10px'}}
                         className="btn-success mt-4">
                          Update Employee
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



/*add employee component*/  
export function Addemployee() {
  const [nic, setNic] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [time, setTime] = useState("");
  const [salary, setSalary] = useState("");
  const [nicError, setNicError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [salaryError, setSalaryError] = useState("");

  async function addEmployee() {
    if (!nic || !name || !position || !time || !salary) {
      Swal.fire("Incomplete Form", "Please fill in all fields", "warning");
      return;
    }

    if (!/^\d{12}$/.test(nic)) {
      setNicError("NIC must be 12 digits");
      return;
    } else {
      setNicError("");
    }

    if (isNaN(Number(time))) {
      setTimeError("Working hours must be a number");
      return;
    } else {
      setTimeError("");
    }

    if (isNaN(Number(salary))) {
      setSalaryError("Salary must be a number");
      return;
    } else {
      setSalaryError("");
    }

    const newemployee = {
      nic,
      name,
      position,
      time,
      salary,
    };

    try {
      const result = await axios.post("/api/employees", newemployee);
      console.log(result.data);
      Swal.fire(
        "Congratulations!",
        "Employee Added Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/employees";
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Ooops!", "Something went Wrong", "error");
    }
  }

  return (
    <div className="gradient-container_2">
      <h3 style={{ textAlign: "center" }}>Add An Employee</h3>
      <Container style={{ maxWidth: "600px" }}>
        <div>
          <div className="form-group">
            <label htmlFor="nic">Employee NIC:</label>
            <input
              type="text"
              className="invt form-control"
              id="nic"
              placeholder="Employee NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            {nicError && <div className="text-danger">{nicError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="invt form-control"
              id="name"
              placeholder="Name"
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
            {timeError && <div className="text-danger">{timeError}</div>}
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
            {salaryError && <div className="text-danger">{salaryError}</div>}
          </div>

          <div className="invt text-right">
            <button
              style={{ marginBottom: "20px" }}
              className="btn-success mt-4"
              onClick={addEmployee}
            >
              Add Employee
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}