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
    const [searchHover, setSearchHover] = React.useState(false);
    const [dropbarHover, setDropbarHover] = React.useState(0);
    const [input, setInput] = React.useState('');

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
                <Skeleton animation="wave" width={70} style={{ margin: "20px" }} />
            )
        }
        return temp;
    }

    return (
        <div className="header">
            <div className="content-container" style={{ width: "auto", left: "50%", transform: "translateX(-50%)", zIndex: 5 }}>
                {shopDetails !== undefined ?
                    <Typography style={{ fontSize: "3.2rem", fontWeight: "bold" }}>
                        <a href="/" style={{ textDecoration: "none", color: "black" }}>
                            {shopDetails.name}
                        </a>
                    </Typography>
                    :
                    <Skeleton animation="wave" width={250} height={20} />
                }
            </div>
            <Container maxWidth="lg" className="content-wrapper" style={{ height: "40px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography style={{ fontSize: "14px", fontWeight: "bold", marginRight: "1rem" }}>
                        SEARCH
                    </Typography>
                    <animated.div style={searchSpring} onClick={() => setSearchHover(true)} >
                        <CssTextField type="search" style={{ width: "210px" }} value={input} onChange={handleChange} />
                    </animated.div>
                    <SearchPopUp history={props.history} input={input} searchHover={searchHover} setSearchHover={(bool) => setSearchHover(bool)} />
                </div>
                <div>
                    <LocalMallOutlinedIcon className="cartOpacity" fontSize="large" style={{ cursor: "pointer" }} />
                </div>
            </Container>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
                {
                    featured.length === 0 ?
                        makeSkeleton()
                        :
                        <div style={{ display: "flex" }}>
                            <Link className="header_link">Best sellers</Link>
                            {featured.map((ele, index) => {
                                if (ele.title.toLowerCase() === "best sellers") {
                                    return null
                                }
                                return (
                                    <div onMouseEnter={() => setDropbarHover(index + 1)} onMouseLeave={() => setDropbarHover(0)}>
                                        <Link className="header_link" key={`header-link-${index}`}>
                                            {ele.title}
                                        </Link>
                                        <Spring
                                            to={{ opacity: dropbarHover === index + 1 ? 1 : 0, display: dropbarHover === index + 1 ? "block" : "none" }}
                                            from={{ opacity: 0, display: "none" }}
                                            key={`dropdown-${index}`}
                                        >
                                            {prop =>
                                                <div style={prop}>
                                                    <HeaderDropDown content={[ele]} />
                                                </div>
                                            }
                                        </Spring>
                                    </div>
                                )
                            })}
                            <Link className="header_link" style={{ color: "#e13367" }}>SALE</Link>
                        </div>
                }
            </div>
        </div>
    )
}

export default Header;