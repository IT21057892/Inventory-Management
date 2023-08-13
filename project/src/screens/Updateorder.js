import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Updateorder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    const getOneOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/get/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOneOrder();
  }, [id]);

  const { name, price, offers, description } = order;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const updatedOrder = {
      name,
      price,
      offers,
      description,
    };

    axios
      .put(`/api/orders/updateorder/${id}`, updatedOrder)
      .then(() => {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            navigate("/admin");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      })
      .catch((err) => Swal.fire("Not Updated", err.message, "error"));
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <form>
              <h4>Update Order</h4>
              <br />

              <b>Order Name :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={name}
                onChange={(e) => setOrder({ ...order, name: e.target.value })}
              />

              <b>Rent per day :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={price}
                onChange={(e) => setOrder({ ...order, price: e.target.value })}
              />

              <b>Max Count :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={offers}
                onChange={(e) => setOrder({ ...order, offers: e.target.value })}
              />

              <b>Description :</b>
              <input
                type="text"
                className="form-control"
                defaultValue={description}
                onChange={(e) => setOrder({ ...order, description: e.target.value })}
              />

              <button className="btn btn-primary mt-3" type="submit" onClick={handleFormSubmit}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updateorder;