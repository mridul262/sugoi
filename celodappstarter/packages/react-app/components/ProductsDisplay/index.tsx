import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import styles from './index.module.scss'

interface Props {
  products: {name: string, price: number, currency: string, desc: string}[]
}
export default function ProductsDisplay(props: Props) {
  const { products } = props
  const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
  
  return (
      <div className={styles.productsDisplay}>
        <div className={styles.productsDisplayWrapper}>
          <span className={styles.merchantName}>Paying BAYC</span>
          <span className={styles.totalPrice}>{totalPrice} CELO</span>
          <div className={styles.products}>
            {products.map((product, index) => (
              <div 
                className={styles.product}
                key={index}
              >
                <div className={styles.productImageText}>
                  <img src={'https://lh3.googleusercontent.com/LZD_Bhw0aTF8OBHIYI2CALZlwQsL7JsWkH6IsY-opLrfdLhvQEMG9zgIj7WE4vXIMOY5_Jvc0FBkacqbKXFKCgd5KoPECpVS3eTXkA=w600'} alt="product" />
                  <div className={styles.productTitle}>
                    <span className={styles.name}>{product.name}</span>
                    <span className={styles.desc}>{product.desc}</span>
                  </div>
                </div>
                <span className={styles.price}>{product.price.toFixed(2)} {product.currency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
