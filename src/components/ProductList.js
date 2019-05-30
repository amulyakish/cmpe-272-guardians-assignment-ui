import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import {ProductContext} from '../context';
import axios from 'axios';
import toastr from 'toastr';
import "toastr/build/toastr.min.css";
// import "toastr/build/toastr.min.css";
import { CONFIG } from '../Constants'


export default class ProductList extends Component {
  static contextType = ProductContext;
  // state = {
  //   products: storeProducts
  // };

  constructor(props){
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount(){
    let value = this.context;
    if(this.props.auth.getAccessToken() != null && value.products.length === 0){
      const headers = { 'Authorization': `Bearer ${this.props.auth.getAccessToken()}` }
      axios.get(`${CONFIG.APIBaseUrl}/api/books`, { headers })
      .then(res => {
        const books = res.data;
        books.forEach(function(e) {
          e.img = 'img/product-1.png';
          e.author = 'Mr. Author';
        });
        value.setProducts(books);
        this.setState({books: books });
      })
    }
    else{
      this.setState({books: value.products });
    }
    console.log('ProductList componentDidMount', value);
  }

  render() {
    return (
      <React.Fragment>
        <ProductWrapper className="py-5">
          <div className="container">
            <Title name="our" title="products" />
            <div className="row">
              {
                this.state.books.map(product => {
                  return <Product key={product.bookId} product={product} />
                })
              }
            </div>
          </div>
        </ProductWrapper>
      </React.Fragment>
    );
  }
}

const ProductWrapper = styled.section``;
