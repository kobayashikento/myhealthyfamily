import React from 'react';

import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import { TextField, Typography, Button, Checkbox } from '@material-ui/core';

import { animated, useSpring } from 'react-spring';

import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
    root: {
        '& .MuiInputLabel-outlined': {
            fontSize: "13px",
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "0px",
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiInputBase-root': {
            fontSize: "15px",
            height: "50px"
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "0px",
            width: "250px",
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black',
            },
        },
    },
})(TextField);

const Contact = (props) => {

    const [hover, setHover] = React.useState(false);

    const fillBoxSpring = useSpring({
        to: { transform: !hover ? "translateY(100%)" : "translateY(0%)" },
        from: {
            position: "absolute", backgroundColor: "black", transform: "translateY(100%)", zIndex: 1, width: "100%", height: "100%"
        }
    });

    const [checked, setChecked] = React.useState(false);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MailOutlineOutlinedIcon style={{ fontSize: `${40 / 1920 * props.width}px` }} />
            <Typography style={{ fontSize: `${35 / 1920 * props.width}px`, margin: "25px 0 20px" }}>
                Stay up to date with all exclusive offers!
            </Typography>
            <div style={{ maxWidth: "600px", display: "flex", height: "50px", flexDirection: "column" }}>
                <div style={{ display: "flex", height: "50px" }}>
                    <CssTextField label="Email Address" variant="outlined" style={{ borderRadius: "0px" }} />
                    <div style={{
                        width: "fit-content", overflow: "hidden", position: "relative", borderTop: "1px solid black",
                        borderBottom: "1px solid black", borderRight: "1px solid black", display: "flex"
                    }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <animated.div style={fillBoxSpring} />
                        <Button style={{ border: "2px solid white", borderRadius: "2px", background: "white", width: "100%" }} >
                            <Typography style={{
                                textAlign: "left", fontSize: `14px`, fontWeight: "600",
                                color: hover ? "white" : "black", padding: "7px 15px", zIndex: 2
                            }} >Subscribe</Typography>
                        </Button>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    <Checkbox
                        checked={checked}
                        color="black"
                        onChange={() => setChecked(!checked)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        style={{ padding: "0px" }}
                    />
                    <div style={{ display: "flex", marginLeft: "1rem" }}>
                        <Typography style={{ fontSize: `15px` }}>
                            I accept the
            </Typography>
                        <Typography style={{ fontSize: `15px`, textIndent: "4px", cursor: "pointer", textDecoration: "underline" }}>
                            terms
            </Typography>
                        <Typography style={{ fontSize: `15px`, textIndent: "4px" }}>
                            and
            </Typography>
                        <Typography style={{ fontSize: `15px`, textIndent: "4px", cursor: "pointer", textDecoration: "underline" }}>
                            conditions
            </Typography>
                        <Typography style={{ fontSize: `15px` }}>
                            .
            </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;