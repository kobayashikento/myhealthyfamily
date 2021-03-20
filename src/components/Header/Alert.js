import React from 'react';

import { Typography, Container, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { animated, useSpring } from 'react-spring';
import { useShopify } from "../../hooks";

import Preference from './Preference';

import { currencyDic } from '../../assests/constants';
import { isEmpty } from '../../assests/functions';

import '../../assests/styles/alertStyle.css';


const Alert = () => {
    //states
    const { shopDetails, setCurrency } = useShopify();

    const [curr, setCurr] = React.useState([null, null]);
    const [hover, setHover] = React.useState(0);
    const [openPreference, setOpenPreference] = React.useState(false);

    const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });

    React.useEffect(() => {
        if (!isEmpty(shopDetails)) {
            setCurr([currencyDic[shopDetails.info.currencyCode], currencyDic[shopDetails.info.currencyCode]])
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
        setCurr([currencyDic[arr[0]], currencyDic[arr[1]]]);
        setCurrency(arr[1]);
    }

    return (
        matches ?
            <header className="alert">
                <div className="content-container">
                    <Typography variant="h6">Free Worldwide Shipping This Month</Typography>
                </div>
                <Container maxWidth="lg" className="content-wrapper">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {
                            isEmpty(shopDetails) ? <Skeleton animation="wave" width={70} height={10} />
                                :
                                <div style={{ cursor: "pointer" }} onMouseEnter={() => setHover(1)} onMouseLeave={() => setHover(0)} onClick={() => setOpenPreference(true)}>
                                    <Typography variant="h6">
                                        {curr[0] !== null ? curr[0].country : "Canada"}, {curr[1] !== null ? Object.keys[curr[1]] : "CAD"} {curr[1] !== null ? curr[1].format : "$"}
                                    </Typography>
                                    <animated.div style={{ ...lineSpring }} />
                                </div>
                        }
                        <Typography variant="h6" style={{ marginBottom: "1px" }}>{'\u00A0'} | {'\u00A0'}</Typography>
                        <div style={{ cursor: "pointer" }} onMouseEnter={() => setHover(2)} onMouseLeave={() => setHover(0)} onClick={() => setOpenPreference(true)}>
                            <Typography variant="h6">
                                {"English"}
                            </Typography>
                            <animated.div style={{ ...lineLanSpring }} />
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Typography variant="h6">Let's talk!</Typography>
                        <Typography variant="h6" style={{ fontWeight: "bold", textIndent: "4px" }}>+647-228-3697</Typography>
                    </div>
                </Container>
                {
                    isEmpty(shopDetails) ? null
                        :
                        <Preference open={openPreference} setOpenPreference={(state) => setOpenPreference(state)}
                            handleCurrChange={(arr) => handleCurrChange(arr)}
                            currency={curr} paymentSettings={shopDetails.info.paymentSettings} />
                }
            </header>
            :
            <header className="alertM">
                <Typography variant="h6">
                    Free Worldwide Shipping This Month
                </Typography>
            </header>
    )
}

export default Alert;