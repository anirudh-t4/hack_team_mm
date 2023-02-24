import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import "./Card.css";
import bag from "./bag.png";
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import { BsStarFill, BsStarHalf } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import Popup from 'reactjs-popup';
import { ReactDialogBox } from 'react-js-dialog-box'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";



const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect,open, setOpen] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {

  const handleClickToOpen = () => {
      setOpen(true);
    };

    const handleToClose = () => {
      setOpen(false);
    };
    return (
      showViewProductButton && (
      <div style={{}}>
            <Button variant="outlined" color="primary"
                    onClick={handleClickToOpen}>
              Decline Service
            </Button>
            <Dialog open={open} onClose={handleToClose}>
              <DialogTitle>{"How are you?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  I am Good, Hope the same for you!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleToClose}
                        color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>

      )
    );
  };

const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  function ButtonModal() {
    return (
      <div className="btn_container" onClick={addToCart}>
        <button>
          <img src={bag} className="addBtn" alt="addtocart" />
        </button>
      </div>
    );
    }

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

    const handleClickToOpen = () => {
      setOpen(true);
    };

    const handleToClose = () => {
      setOpen(false);
    };

  return (
  <div className='product'>
          <ShowImage item={product} url="product" />
          <h3>{product.name}</h3>
          <div >
          <span className="desc">
              <p>{product.price} points</p>
              <div style={{marginLeft: 'auto'}}>
                  <BsStarFill style={{color: 'gold'}} />
              </div>
              </span>
          </div>
          <br />

                  {showViewButton(showViewProductButton)}
                  <ButtonModal/>
                  {showRemoveButton(showRemoveProductButton)}
                  {showCartUpdateOptions(cartUpdate)}
      </div>
  );
};

export default Card;