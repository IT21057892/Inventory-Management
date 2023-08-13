/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from "sweetalert2";

import { Tabs } from "antd";
import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import '../app.css'; // Import your custom CSS file

const { TabPane } = Tabs;

function Reporting() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";


    }
  }, []);

  return (
    <div className="gradient-container">
    <Container>
      <h1 className="invt text-center">
        <b>Reports</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Reports" key="1">
          <Reports />
        </TabPane>
        <TabPane tab="Add Reports" key="2">
          <Addreport />
        </TabPane>
      </Tabs>
      </Container>
    </div>
  );
}

export default Reporting;

//*****Display all the reports */
export function Reports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [searchQuery, setSearchQuery] = useState("");

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/api/reports");
          setReports(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError("Failed to fetch reports.");
        }
      };
      fetchData();
    }, []);
  
      async function deleteReport(id) {
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
            await axios.delete(`/api/reports/${id}`);
            setReports(reports.filter((report) => report._id !== id));
            Swal.fire(
              "Deleted!",
              "Your report has been deleted.",
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

    const filteredReports = reports.filter(
      (report) =>
        report.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
   
  
    return (
      <div className="gradient-container_1">
        <Container>
          <h3 style={{textAlign: "center"}}>All Reports</h3>
          <input style={{marginBottom:'10px'}}
             type="text"
             placeholder="Search by report name..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button style={{marginBottom:'10px'}} className="btn-success mt-4" onClick={handlePrint}>Print This Page</button>
  
          <Table hover>
            <thead className="invt thed-dark ">
              <tr>
              
                <th>Report Code</th>
                <th>Checked By</th>
                <th>Status</th>
                <th>Date</th>
                <th>Edit</th>
              </tr>
            </thead>
  
            <tbody>

            {filteredReports.map((report) => {
                return (
                  <tr key={report._id}>
                   
                    <td>{report.code}</td>
                    <td>{report.name}</td>
                    <td>{report.status}</td>
                    <td>{new Date(report.date).toLocaleDateString()}</td>
                    <td>
                      <button style={{marginLeft:'10px'}}
                        className="btn-danger mt-1" 
                        onClick={() => {
                          deleteReport(report._id);
                        }}
                      > 
                        Delete Report
                      </button>
                      <Link to={`/updatereports/${report._id}`}>
                       
                        <button style={{marginLeft:'10px'}}
                         className="btn-success mt-4">
                          Update Report
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



/*add report component*/  
 export function Addreport() {
   const [code, setCode] = useState('');
   const [name, setName] = useState('');
   const [status, setStatus] = useState('');
   const [date, setDate]= useState('')
    
 
   async function addReport() {
    if (!code || !name || !status || !date) {
        Swal.fire('Incomplete Form', 'Please fill in all fields', 'warning');
        return;
      }

     const newreport = {
       code,
       name,
       status,
       date,
     };
 
     try {
       const result = await axios.post('/api/reports', newreport);
       console.log(result.data);
       Swal.fire(
         'Congratulations !',
         ' Report Added Successfully',
         'success'
       ).then((result) => {
         window.location.href = '/report';
       });
     } catch (error) {
       console.log(error);
       Swal.fire('Ooops !', 'Something went Wrong ', 'error');
     }

      

   }
 
   return (
    <div className="gradient-container_2">
      <h3 style={{textAlign: "center"}}>Add A Report</h3>
      <Container style={{maxWidth:"600px"}}>
        <div>
          <div className="form-group">
            <label htmlFor="code">Report Code:</label>
            <input
              type="text"
              className="invt form-control"
              id="code"
              placeholder="Report Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Checked By:</label>
            <input
              type="text"
              className="invt form-control"
              id="name"
              placeholder="Checked By"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              <option value="Pending">Pending</option>
              <option value="Passed">Passed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
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
          <div className="invt text-right">
            <button style={{marginBottom:'20px'}} className="btn-success mt-4" onClick={addReport}>
              Add Report
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

 