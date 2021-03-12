import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Cart from "./Cart"
import Skeleton from './Skeleton';
import ProductView from "./ProductView"
import { useShopify } from "../hooks"

import Alert from './Header/Alert';
import Header from './Header/Header';

import { Scrollbars } from 'react-custom-scrollbars';

export default (props) => {
	const {
		createShop,
		createCheckout,
		fetchProducts,
		fetchCollection,
	} = useShopify()

	useEffect(() => {
		createShop()
		fetchProducts()
		createCheckout()
		fetchCollection()
	}, [])

	function useWindowSize() {
		const [size, setSize] = React.useState([0, 0]);
		React.useLayoutEffect(() => {
			function updateSize() {
				setSize([window.innerWidth, window.innerHeight]);
			}
			window.addEventListener('resize', updateSize);
			updateSize();
			return () => window.removeEventListener('resize', updateSize);
		}, []);
		return size;
	}

	const [width, height] = useWindowSize();
	
	return (
		<Router>
			<Scrollbars
				style={{ width: width, height: height }}
				autoHide
			>
				<Alert />
				<Header history={props.history} />
				<Route exact path="/" render={() => <Redirect to="/Home" />} />
				<Route path="/Home" component={Skeleton} />
				<Route path="/Product/:productId" component={ProductView} />
				<Route path="/" component={Cart} />
			</Scrollbars>
		</Router>
	)
}
