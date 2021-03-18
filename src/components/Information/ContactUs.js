import { Grid, Typography, TextField } from '@material-ui/core';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { statement } from '@babel/template';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "0px"
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiInputBase-root': {
            fontSize: "14px"
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "grey"
        },
        '& .MuiFormHelperText-root.Mui-error': {
            fontSize: "15px"
        }
    },
})(TextField);

const ContactUs = (props) => {

    const [email, setEmail] = React.useState(undefined);
    const [name, setName] = React.useState(undefined);
    const [phone, setPhone] = React.useState(undefined);
    const [message, setMessage] = React.useState(undefined);

    const handleChange = (e, type) => {
        switch (type) {
            case "email":
                setEmail(e.target.value)
                break
            case "name":
                setName(e.target.value)
                break
            case "phone":
                setPhone(e.target.value)
                break
            case "message":
                setMessage(e.target.value)
                break
            default:
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
        if (name === undefined) {
            setName("")
        }
        if (phone === undefined) {
            setPhone("")
        }
        if (message === undefined) {
            setMessage("")
        }
    }

    return (
        <Grid container spacing={9} style={{ marginTop: "1.1vmax" }}>
            <Grid item xs={6} style={{ border: "1px solid #e4e4e4", padding: "30px 30px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography align="center" style={{ fontSize: "20px", fontWeight: "700" }}>
                    Do you have any questions or suggestions?
                            </Typography>
                <Typography align="center" style={{ fontSize: "17px", margin: "30px 0 15px 0" }}>
                    Email Address:
                            </Typography>
                <CssTextField helperText={valid(email) ? "" : "Email address is required."} error={!valid(email)}
                    variant="outlined" style={{ width: "100%" }} value={email} onChange={(e) => handleChange(e, "email")} />
                <Typography align="center" style={{ fontSize: "17px", margin: "30px 0 15px 0" }}>
                    Name:
                            </Typography>
                <CssTextField helperText={valid(name) ? "" : "Name is required."} error={!valid(name)}
                    value={name} onChange={(e) => handleChange(e, "name")}
                    variant="outlined" style={{ width: "100%" }} />
                <Typography align="center" style={{ fontSize: "17px", margin: "30px 0 15px 0" }}>
                    Phone Number:
                            </Typography>
                <CssTextField helperText={valid(phone) ? "" : "Phone number is required."} error={!valid(phone)}
                    value={phone} onChange={(e) => handleChange(e, "phone")}
                    variant="outlined" style={{ width: "100%" }} />
                <Typography align="center" style={{ fontSize: "17px", margin: "30px 0 15px 0" }}>
                    Message:
                            </Typography>
                <CssTextField helperText={valid(message) ? "" : "Message is required."} error={!valid(message)}
                    value={message} onChange={(e) => handleChange(e, "message")} multiline rows={6} variant="outlined" style={{ width: "100%" }} />
                <Typography onClick={validate} style={{ cursor: "pointer", marginTop: "50px", fontSize: "18px", background: "black", color: "white", width: "100%", textAlign: "center", padding: "15px 0" }}>
                    Send
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <div style={{ marginLeft: "2.2vmax" }}>
                    <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                        What we offer
                </Typography>
                    <Typography style={{ fontSize: "18px", margin: "20px 0", color: "rgba(0,0,0, 0.7)" }}>
                        • Worldwide shipping
                </Typography>
                    <Typography style={{ fontSize: "18px", margin: "20px 0", color: "rgba(0,0,0, 0.7)" }}>
                        • Easy returns, no restocking fees
                </Typography>
                    <Typography style={{ fontSize: "18px", margin: "20px 0", color: "rgba(0,0,0, 0.7)" }}>
                        • Orders ship within 48 hours
                </Typography>
                    <Typography style={{ fontSize: "18px", margin: "20px 0", color: "rgba(0,0,0, 0.7)" }}>
                        • 24/7 customer service support  (simply email us)
                </Typography>
                    <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Phone Number
                </Typography>
                    <Typography style={{ fontSize: "18px", color: "rgba(0,0,0, 0.7)", marginTop: "20px" }}>
                        Do you need assistance? Give us a call
                </Typography>
                    <Typography style={{ fontSize: "18px", color: "rgba(0,0,0, 0.7)", marginBottom: "20px" }}>
                        +647-228-3697
                </Typography>
                    <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Email Address
                </Typography>
                    <Typography style={{ fontSize: "18px", margin: "20px 0", color: "rgba(0,0,0, 0.7)" }}>
                        kentokobayashik@gmail.com
                </Typography>
                </div>
            </Grid>
        </Grid>
    )
}

export default ContactUs;