import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Order({ order }) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1); // initialize quantity to 1

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value); // set the quantity to the value entered by the user
  };

  return (
    <div className="row ml-2 bs md-15">
      <div className="col-md-30">
        <img src={order.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>{order.name}</h1>
        <b>
          {" "}
          <p>Offers : {order.price}</p>
          <p>price : {order.offers}</p>{" "}
        </b>

        <div style={{ float: "right" }}>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <Link to={{ pathname: `/book/${order._id}`, search: `?quantity=${quantity}` }}>
              <button className="btn btn-primary mr-2">Book Now</button>
          </Link>



          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{order.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {order.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{order.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Order;
