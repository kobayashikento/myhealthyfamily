import React from 'react';

// import material ui 
import { Typography, Button, Checkbox } from '@material-ui/core';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';

// import styles 
import { StyledTextFieldContact, linkStyle } from '../../assests/styles/styledComponents';
const underlineLinkStyle = { fontSize: `15px`, textIndent: "4px", cursor: "pointer", textDecoration: "underline" };
const typoStyle = { fontSize: `15px` };

const Contact = (props) => {
    // states
    const [hover, setHover] = React.useState(false);
    const [email, setEmail] = React.useState(undefined);
    const [checked, setChecked] = React.useState(false);

    const fillBoxSpring = useSpring({
        to: { transform: !hover ? "translateY(100%)" : "translateY(0%)" },
        from: {
            position: "absolute", backgroundColor: "black", transform: "translateY(100%)", zIndex: 1, width: "100%", height: "100%"
        }
    });

    const handleClick = () => {
        if (props.scrollbar !== undefined) {
            props.scrollbar.current.scrollToTop();
        }
    }

    const valid = (str) => {
        if (str === undefined) {
            return true;
        } else if (str.trim() === "") {
            return false;
        }
        return true;
    }

    const validate = () => {
        if (email === undefined) {
            setEmail("")
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MailOutlineOutlinedIcon style={{ fontSize: `${40 / 1920 * props.width}px` }} />
            <Typography style={{ fontSize: `${35 / 1920 * props.width}px`, margin: "25px 0 20px" }}>
                Stay up to date with all exclusive offers!
            </Typography>
            <div style={{ maxWidth: "600px", display: "flex", height: "50px", flexDirection: "column" }}>
                <div style={{ display: "flex", height: "50px" }}>
                    <StyledTextFieldContact helperText={valid(email) ? "" : "Email address required."} error={!valid(email)} onChange={(e) => setEmail(e.target.value)}
                        label="Email Address" variant="outlined" style={{ borderRadius: "0px" }} />
                    <div onClick={() => validate()} style={{
                        width: "fit-content", overflow: "hidden", position: "relative", borderTop: "1px solid black",
                        borderBottom: "1px solid black", borderRight: "1px solid black", display: "flex"
                    }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <animated.div style={fillBoxSpring} />
                        <Button style={{ border: "2px solid white", borderRadius: "2px", background: "white", width: "100%" }} >
                            <Typography style={{ textAlign: "left", fontSize: `14px`, fontWeight: "600", color: hover ? "white" : "black", padding: "7px 15px", zIndex: 2 }}>
                                Subscribe
                            </Typography>
                        </Button>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "2rem" }}>
                    <Checkbox
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        style={{ padding: "0px" }}
                    />
                    <div style={{ display: "flex", marginLeft: "1rem", }}>
                        <Typography style={typoStyle}>I accept the   </Typography>
                        <Link to="/terms-of-service" onClick={() => handleClick()} style={linkStyle}>
                            <Typography style={underlineLinkStyle}>terms</Typography>
                        </Link>
                        <Typography style={{ ...typoStyle, textIndent: "4px" }}>and</Typography>
                        <Link to="/terms-of-service" onClick={() => handleClick()} style={linkStyle}>
                            <Typography style={underlineLinkStyle}>conditions</Typography>
                        </Link>
                        <Typography style={typoStyle}>.</Typography>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Contact;