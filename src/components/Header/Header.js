import React from 'react';

import { Link } from 'react-router-dom';

import { Typography, Container, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import '../../assests/styles/headerStyle.css';

import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import SearchPopUp from './SearchPopUp';

import { animated, useSpring } from 'react-spring';

import { useShopify } from "../../hooks";
import HeaderDropDown from './HeaderDropDown';

import { Spring } from 'react-spring/renderprops';
import { Skeleton } from '@material-ui/lab';

import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";

import useMediaQuery from '@material-ui/core/useMediaQuery';

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

const isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const Header = (props) => {

    const { shopDetails, featured } = useShopify();
    const [searchHover, setSearchHover] = React.useState(false);
    const [dropbarHover, setDropbarHover] = React.useState(0);
    const [input, setInput] = React.useState('');

    const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });

    const searchSpring = useSpring({
        to: { transform: searchHover || input !== '' ? "translateY(0px)" : "translateY(-10px)" },
        from: { transform: "translateY(-10px)" }
    })

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const makeSkeleton = () => {
        let temp = [];
        for (let i = 0; i < 4; i++) {
            temp.push(
                <Skeleton key={`header-skeleton-${i}`} animation="wave" width={70} style={{ margin: "20px" }} />
            )
        }
        return temp;
    }

    const handleClick = () => {
        setInput("");
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    const endAdornment = () => {
        if (input !== "") {
            return (
                <InputAdornment style={{position: "absolute", right: "0px"}}>
                    <ClearIcon
                        onClick={handleClick}
                        onMouseDown={handleMouseDown}
                        style={{ color: "black", cursor: "pointer" }}
                    />
                </InputAdornment>
            );
        }

        return "";
    };

    return (
        matches ?
            <div className="header">
                <div className="content-container" style={{ width: "auto", left: "50%", transform: "translateX(-50%)", zIndex: 5 }}>
                    {!(isEmpty(shopDetails)) ?
                        <Typography style={{ fontSize: "3.2rem", fontWeight: "bold", fontFamily: 'FirusasHeader, "Times New Roman", Times, Georgia, serif' }}>
                            <Link to="/" onClick={() => props.scrollbar.current.scrollToTop()} style={{ textDecoration: "none", color: "black" }}>
                                {shopDetails.info.name}
                            </Link>
                        </Typography>
                        :
                        <Skeleton animation="wave" width={250} height={20} />
                    }
                </div>
                <Container maxWidth="lg" className="content-wrapper" style={{ height: "40px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography style={{ fontSize: "14px", marginRight: "1rem", fontFamily: "SofiaB" }}>
                            SEARCH
                    </Typography>
                        <animated.div style={searchSpring} onClick={() => setSearchHover(true)} >
                            <CssTextField style={{ width: "210px" }} value={input} onChange={handleChange}
                                InputProps={{
                                    startAdornment: endAdornment()
                                }}
                            />
                        </animated.div>
                        <SearchPopUp history={props.history} input={input} searchHover={searchHover} setSearchHover={(bool) => setSearchHover(bool)} />
                    </div>
                    <div>
                        <LocalMallOutlinedIcon className="cartOpacity" fontSize="large" style={{ cursor: "pointer" }} />
                    </div>
                </Container>
                <div style={{ display: "flex", justifyContent: "center", padding: "8px 20px 0 20px", fontFamily: "SofiaM" }}>
                    {
                        featured.length === 0 ?
                            makeSkeleton()
                            :
                            <div style={{ display: "flex" }}>
                                <Link to={`/best-sellers`} className="header_link">Best sellers</Link>
                                {featured.map((ele, index) => {
                                    if (ele.title.toLowerCase() === "best sellers") {
                                        return null
                                    }
                                    return (
                                        <div onClick={() => props.scrollbar.current.scrollToTop()} key={`header-${ele.title}`} onMouseEnter={() => setDropbarHover(index + 1)} onMouseLeave={() => setDropbarHover(0)}>
                                            <Link
                                                onClick={() => setDropbarHover(0)}
                                                to={`/${ele.title.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-")}`} className="header_link" key={`header-link-${index}`}>
                                                {ele.title}
                                            </Link>
                                            <Spring
                                                to={{ opacity: dropbarHover === index + 1 ? 1 : 0, display: dropbarHover === index + 1 ? "block" : "none" }}
                                                from={{ opacity: 0, display: "none" }}
                                                key={`dropdown-${index}`}
                                            >
                                                {prop =>
                                                    <div style={prop}>
                                                        <HeaderDropDown content={[ele]} width={props.width} setDropbarhover={(index) => setDropbarHover(index)} />
                                                    </div>
                                                }
                                            </Spring>
                                        </div>
                                    )
                                })}
                                <Link to="/sale" className="header_link" style={{ color: "#e13367" }}>SALE</Link>
                            </div>
                    }
                </div>
            </div>
            :
            <div></div>
    )
}

export default Header;