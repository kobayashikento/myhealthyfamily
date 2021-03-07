import React from 'react';

import { Modal, Backdrop, FormControl, Typography, Select, MenuItem, Button } from '@material-ui/core';

import { animated, useSpring } from 'react-spring';

import CloseIcon from '@material-ui/icons/Close';

import '../assests/styles/preferenceStyle.css';

import { currencyDic } from '../assests/constants';

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0, display: "flex", justifyContent: "center", alignItems: "center", height: "100%" },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const Preference = (props) => {
    const [curr, setCurr] = React.useState(["CAD", "CAD"]);
    const [hover, setHover] = React.useState(false);

    const handleCountryChange = (event) => {
        setCurr([event.target.value, curr[1]]);
    }

    const handleCurrencyChange = (event) => {
        setCurr([curr[0], event.target.value]);
    }

    const fillBoxSpring = useSpring({
        to: { transform: !hover ? "translateY(100%)" : "translateY(0%)" },
        from: {
            position: "absolute", backgroundColor: "white", transform: "translateY(100%)", zIndex: 1, width: "100%", height: "100%", border: "1px solid black"
        }
    })

    const handleClick = () => {
        props.setOpenPreference(false);
        props.handleCurrChange(curr);
    }

    return (
        <Modal
            open={props.open}
            onClose={() => props.setOpenPreference(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <div style={{ width: "500px", background: "white", position: "relative" }}>
                    <div style={{ display: "flex", justifyContent: "center", padding: "50px", flexDirection: "column", alignItems: "center" }}>
                        <CloseIcon fontSize="large" style={{ position: "absolute", right: "20px", cursor: "pointer", top: "20px" }} onClick={() => props.setOpenPreference(false)} />
                        <div className="preference-title">
                            <Typography align="center" style={{ fontSize: "22px", fontWeight: "700" }}>
                                Your travel destination preferences
                            </Typography>
                        </div>
                        <div style={{ width: "100%" }}>
                            <div>
                                <Typography style={{ fontSize: "15px", fontWeight: "600", marginBottom: "12px" }}>
                                    Delivery Country
                            </Typography>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <Select
                                        value={curr[0]}
                                        onChange={handleCountryChange}
                                        style={{ fontSize: "14px", borderRadius: "0px" }}
                                    >
                                        {
                                            props.paymentSettings !== undefined ?
                                                props.paymentSettings.enabledPresentmentCurrencies.map(ele => {
                                                    return (
                                                        <MenuItem key={`country-${ele.key}-item`} value={ele.key} style={{ fontSize: "14px" }}>{currencyDic[ele.key].country}</MenuItem>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ marginTop: "18px" }}>
                                <Typography style={{ fontSize: "15px", fontWeight: "600", marginBottom: "12px" }}>
                                    Currency
                            </Typography>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <Select
                                        value={curr[1]}
                                        onChange={handleCurrencyChange}
                                        style={{ fontSize: "14px", borderRadius: "0px" }}
                                    >
                                        {
                                            props.paymentSettings !== undefined ?
                                                props.paymentSettings.enabledPresentmentCurrencies.map(ele => {
                                                    return (
                                                        <MenuItem key={`currency-${ele.key}-item`} value={ele.key} style={{ fontSize: "14px" }}>{`${ele.key} ${currencyDic[ele.key].format}`}</MenuItem>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ marginTop: "2.2vmax" }}>
                                <div style={{ width: "100%", overflow: "hidden", position: "relative" }} onClick={() => handleClick()}
                                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                    <animated.div style={fillBoxSpring} />
                                    <Button style={{ width: "100%", borderRadius: "2px", background: "black" }} >
                                        <Typography style={{
                                            textAlign: "left", fontSize: `18px`, fontWeight: "600",
                                            color: hover ? "black" : "white", padding: "10px 45px", zIndex: 2
                                        }} >Start Shopping</Typography>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default Preference;