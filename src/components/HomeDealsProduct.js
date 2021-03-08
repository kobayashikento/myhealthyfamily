import { Typography } from '@material-ui/core';
import React from 'react';

import '../assests/styles/homedetailproductStyle.css';

import { currencyDic } from '../assests/constants';

import { useShopify } from "../hooks";

const HomeDealsProduct = (props) => {

    const { currency } = useShopify();

    // 0: no compare price, 1: compare price
    const getCurrPrice = (item, type) => {
        //[0] = price, [1] = compareAtPrice
        let price = [0, 0];
        if (type === 0) {
            item.presentmentPrices.map(ele => {
                if (ele.price.currencyCode === currency) {
                    price[0] = parseFloat(ele.price.amount).toFixed(2)
                    return;
                }
            });
        } else if (type === 1) {
            item.presentmentPrices.forEach(ele => {
                if (ele.price.currencyCode === currency) {
                    price = [parseFloat(ele.price.amount).toFixed(2), parseFloat(ele.compareAtPrice.amount).toFixed(2)];
                    return;
                }
            });
        }
        return price;
    }

    console.log(props.content)

    return (
        <div className="homedetailproduct_container">
            <img src={props.content.images[0].src} />
            <div style={{ paddingTop: "29px", maxWidth: "70%", marginRight: "auto", marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography align="center" style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "13px" }}>
                    {props.content.title}
                </Typography>
                <Typography align="center" style={{ fontSize: "14px", marginBottom: "13px" }}>
                    {props.content.productType}
                </Typography>
                {
                    props.content.variants[0].compareAtPrice !== null ?
                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <Typography style={{ fontSize: "14px", color: "#959494", marginRight: "15px", textDecoration: "line-through" }}>
                                {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 1)[0]}
                            </Typography>
                            <Typography style={{ fontSize: "18px", color: "#e13367", fontWeight: "bold" }}>
                                {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 1)[1]}
                            </Typography>
                        </div>
                        :
                        <Typography style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                            {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 0)[0]}
                        </Typography>
                }
            </div>
        </div>
    )
}

export default HomeDealsProduct;