import React, { Component } from 'react'
import { ProductConsumer } from '../context'
import { ButtonContainer } from './Button'
import { Link } from 'react-router-dom'
import {ProductContext} from '../context';
import history from '../History';

export default class Details extends Component {
  static contextType = ProductContext;

  componentDidMount(){
    let value = this.context;
    if(value == null || value.detailProduct == null){
      history.replace('/');
      return;
    }
  }
  
  render() {
    let value = this.context;
    if(value == null || value.detailProduct == null){
      return (
        <p> </p>
      )
    }
    const {
      bookId,
      author,
      img,
      isbn,
      price,
      title,
      inCart
    } = value.detailProduct;
    return (
      <div className="container py-5">
        {/* title */}
        <div className="row">
          <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
            <h1>{title}</h1>
          </div>
        </div>
        {/* end of title */}
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <img src={img} className="img-fluid" alt="" />
          </div>
          {/* prdoduct info */}
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <h1>title : {title}</h1>
            <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
              written by: <span className="text-uppercase">{author}</span>
            </h4>
            <h4 className="text-blue">
              <strong>
                price : <span>$</span>
                {price}
              </strong>
            </h4>
            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              ISBN Number : 
            </p>
            <p className="text-muted lead">{isbn}</p>
            {/* buttons */}
            <div>
              <Link to="/">
                <ButtonContainer>back to our books</ButtonContainer>
              </Link>
              <ButtonContainer
                cart
                disabled={inCart ? true : false}
                onClick={() => {
                  value.addToCart(bookId)
                  value.openModal(bookId)
                }}
              >
                {inCart ? 'in cart' : 'add to cart'}
              </ButtonContainer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
