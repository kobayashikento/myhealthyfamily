import React from 'react';

import { Link } from 'react-router-dom';
import { Typography, Container, IconButton, InputAdornment, useMediaQuery, Badge, Drawer, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { animated, useSpring } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import { Skeleton } from '@material-ui/lab';
import { useShopify } from "../../hooks";

// icons 
import ClearIcon from '@material-ui/icons/Clear';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

// import files
import SearchPopUp from './SearchPopUp';
import HeaderDropDown from './HeaderDropDown';
import Cart from '../Product/Cart';

import '../../assests/styles/headerStyle.css';

import { StyledTextFieldHeader } from '../../assests/styles/styledComponents';
import { convertedLink, isEmpty } from '../../assests/functions';

const useStyles = makeStyles({
    paper: {
        width: "70%",
    }
});

const Header = (props) => {
    // states
    const classes = useStyles();

    const { shopDetails, featured, openCart, closeCart, cartCount } = useShopify();
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
                <InputAdornment style={{ position: "absolute", right: "0px" }}>
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

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const handleNavClick = () => {
        setOpenDrawer(false);
        if (props.scrollbar !== undefined) {
            props.scrollbar.current.scrollToTop();
        }
    }
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
                            <StyledTextFieldHeader style={{ width: "210px" }} value={input} onChange={handleChange}
                                InputProps={{
                                    startAdornment: endAdornment()
                                }}
                            />
                        </animated.div>
                        <SearchPopUp history={props.history} input={input} searchHover={searchHover} setSearchHover={(bool) => setSearchHover(bool)} scrollbar={props.scrollbar} />
                    </div>
                    <div onMouseEnter={() => openCart()} onMouseLeave={() => closeCart()}>
                        <Badge badgeContent={cartCount} color="secondary">
                            <LocalMallOutlinedIcon className="cartOpacity" style={{ cursor: "pointer", fontSize: "2.5rem" }} />
                        </Badge>
                        <Cart />
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
            <div className="headerM">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        <IconButton style={{ padding: "5px" }} onClick={() => setOpenDrawer(true)}>
                            <MenuIcon fontSize="large" style={{ color: "black" }} />
                        </IconButton>
                        <IconButton style={{ padding: "5px" }}>
                            <SearchIcon fontSize="large" style={{ color: "black" }} />
                        </IconButton>
                    </div>
                    <div style={{ width: "fit-content" }}>
                        <Badge badgeContent={cartCount} color="secondary">
                            <LocalMallOutlinedIcon className="cartOpacity" style={{ cursor: "pointer", fontSize: "2.5rem" }} onClick={() => openCart()} />
                        </Badge>
                        <Cart />
                    </div>
                </div>
                <div style={{ position: "absolute", left: "50%", transform: "translate(-50%, -30px)" }}>
                    <Typography variant="h4" style={{ width: "fit-content", fontWeight: "bold", fontFamily: 'FirusasHeader, "Times New Roman", Times, Georgia, serif' }}>
                        <Link to="/" onClick={() => props.scrollbar.current.scrollToTop()} style={{ textDecoration: "none", color: "black" }}>
                            {
                                isEmpty(shopDetails) ? null
                                    :
                                    shopDetails.info.name
                            }
                        </Link>
                    </Typography>
                </div>
                <Drawer anchor={'left'} open={openDrawer} onClose={() => setOpenDrawer(false)} classes={{ paper: classes.paper }}>
                    <div style={{ display: "flex", padding: "20px 15px", justifyContent: "space-between", alignItems: "center" }}>
                        <IconButton style={{ padding: "0px" }}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                        <div style={{ display: "flex" }}>
                            <Typography variant="h6">Let's talk!</Typography>
                            <Typography variant="h6" style={{ fontWeight: "bold", textIndent: "4px" }}>+647-228-3697</Typography>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "29.33vw 8vw 0 8vw", justifyContent: "space-between" }}>
                        <div>
                            <Link to={`/best-sellers`} style={{ color: "black", textDecoration: "none" }} onClick={handleNavClick}>
                                <Typography variant="h4" style={{ textTransform: "uppercase", marginBottom: "5.33vw", fontWeight: "bold" }}>
                                    Best Sellers
                            </Typography>
                            </Link>
                            {
                                featured.length === 0 ?
                                    makeSkeleton()
                                    :
                                    featured.map(ele => {
                                        if (ele.title !== 'Best Sellers') {
                                            return (
                                                <Link to={`/${convertedLink(ele.title)}`} style={{ color: "black", textDecoration: "none" }} onClick={handleNavClick}>
                                                    <Typography variant="h4" style={{ textTransform: "uppercase", marginBottom: "5.33vw", fontWeight: "bold" }}>
                                                        {ele.title}
                                                    </Typography>
                                                </Link>
                                            )
                                        }
                                    })
                            }
                            <Link to={`/best-sellers`} style={{ color: "rgb(225, 51, 103)", textDecoration: "none" }} onClick={handleNavClick}>
                                <Typography variant="h4" style={{ textTransform: "uppercase", marginBottom: "5.33vw", fontWeight: "bold" }}>
                                    Sale
                            </Typography>
                            </Link>
                        </div>
                    </div>
                </Drawer>
            </div >
    )
}

export default Header;