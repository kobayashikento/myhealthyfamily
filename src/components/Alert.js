import React from 'react';

import { Typography, Container } from '@material-ui/core';
import { animated, useSpring } from 'react-spring';

import '../assests/styles/alertStyle.css';

import { useShopify } from "../hooks";
import Preference from './Preference';

import { currencyDic } from '../assests/constants';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const Alert = () => {
    const { shopDetails } = useShopify();

    const [currency, setCurrency] = React.useState([null, null]);
    const [hover, setHover] = React.useState(0);

    const [openPreference, setOpenPreference] = React.useState(false);

    React.useEffect(() => {
        if (!isEmpty(shopDetails)) {
            setCurrency([currencyDic[shopDetails.currencyCode], currencyDic[shopDetails.currencyCode]])
        }
    }, [shopDetails])

    const lineSpring = useSpring({
        to: { width: hover === 1 ? "100%" : "0%" },
        from: { width: "0%", opacity: 1, background: "black", height: "1px" }
    });

    const lineLanSpring = useSpring({
        to: { width: hover === 2 ? "100%" : "0%" },
        from: { width: "0%", opacity: 1, background: "black", height: "1px" }
    });

    const handleCurrChange = (arr) => {
        setCurrency([currencyDic[arr[0]], currencyDic[arr[1]]]);
    }

    return (
        <header className="alert">
            <div className="content-container">
                <Typography style={{ fontSize: "14px" }}>
                    Free Worldwide Shipping This Month
                </Typography>
            </div>
            <Container maxWidth="lg" className="content-wrapper">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ cursor: "pointer" }} onMouseEnter={() => setHover(1)} onMouseLeave={() => setHover(0)} onClick={() => setOpenPreference(true)}>
                        <Typography style={{ fontSize: "13px" }}>
                            {currency[0] !== null ? currency[0].country : "Canada"}, {currency[1] !== null ? Object.keys[currency[1]] : "CAD"} {currency[1] !== null ? currency[1].format : "$"}
                        </Typography>
                        <animated.div style={{ ...lineSpring }} />
                    </div>
                    <Typography style={{ fontSize: "14px", marginBottom: "1px" }}>
                        {'\u00A0'} | {'\u00A0'}
                    </Typography>
                    <div style={{ cursor: "pointer" }} onMouseEnter={() => setHover(2)} onMouseLeave={() => setHover(0)} onClick={() => setOpenPreference(true)}>
                        <Typography style={{ fontSize: "13px" }}>
                            {"English"}
                        </Typography>
                        <animated.div style={{ ...lineLanSpring }} />
                    </div>
                </div>
                <div>
                    <Typography style={{ fontSize: "14px" }}>
                        Let's talk!  +833 432 6432
                    </Typography>
                </div>
            </Container>
            <Preference open={openPreference} setOpenPreference={(state) => setOpenPreference(state)}
                handleCurrChange={(arr) => handleCurrChange(arr)}
                currency={currency} paymentSettings={shopDetails.paymentSettings} />
        </header>
    )
}

export default Alert;