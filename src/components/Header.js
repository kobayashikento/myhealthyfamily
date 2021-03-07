import React from 'react';

import { Link } from 'react-router-dom';

import { Typography, Container, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import '../assests/styles/headerStyle.css';

import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import SearchPopUp from './SearchPopUp';

import { animated, useSpring } from 'react-spring';

import { useShopify } from "../hooks";
import HeaderDropDown from './HeaderDropDown';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiInputBase-root': {
            fontSize: "14px"
        }
    },
})(TextField);

const Header = (props) => {

    const { shopDetails, featured } = useShopify();
    const [featuredState, setFeatured] = React.useState([]);
    const [searchHover, setSearchHover] = React.useState(false);
    const [dropbarHover, setDropbarHover] = React.useState(false);
    const [input, setInput] = React.useState('');

    const searchSpring = useSpring({
        to: { transform: searchHover || input !== '' ? "translateY(0px)" : "translateY(-10px)" },
        from: { transform: "translateY(-10px)" }
    })

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleDropDownChange = () => {
        if (dropbarHover) {}
    }

    return (
        <div className="header">
            <div className="content-container" style={{ width: "auto", left: "50%", transform: "translateX(-50%)", zIndex: 5 }}>
                <Typography style={{ fontSize: "3.2rem", fontWeight: "bold" }}>
                    <a href="/" style={{ textDecoration: "none", color: "black" }}>
                        {shopDetails.name}
                    </a>
                </Typography>
            </div>
            <Container maxWidth="lg" className="content-wrapper" style={{ height: "40px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography style={{ fontSize: "14px", fontWeight: "bold", marginRight: "1rem" }}>
                        SEARCH
                    </Typography>
                    <animated.div style={searchSpring} onClick={() => setSearchHover(true)} >
                        <CssTextField style={{ width: "210px" }} value={input} onChange={handleChange} />
                    </animated.div>
                    <SearchPopUp history={props.history} input={input} searchHover={searchHover} setSearchHover={(bool) => setSearchHover(bool)} />
                </div>
                <div>
                    <LocalMallOutlinedIcon className="cartOpacity" fontSize="large" style={{ cursor: "pointer" }} />
                </div>
            </Container>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
                {
                    featured === undefined ?
                        <div></div>
                        :
                        featured.map((ele, index) => {
                            return (
                                <Link className="header_link" key={`header-link-${index}`} onMouseEnter={() => setFeatured([ele])} onMouseLeave={() => setFeatured([])}>{ele.title}</Link>
                            )
                        })
                }
                <Link className="header_link" style={{ color: "#e13367" }}>SALE</Link>
            </div>
            <HeaderDropDown content={featuredState} onMouseEnter={() => setDropbarHover(true)} onMouseLeave={() => setDropbarHover(false)} />
        </div>
    )
}

export default Header;