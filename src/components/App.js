import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Cart from "./Cart"
import Skeleton from './Skeleton';
import ProductView from "./ProductView"
import { useShopify } from "../hooks"

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

	return (
		<Router>
			<div id="App">
				<Route exact path="/" render={() => <Redirect to="/Home" />} />
				<Route path="/Home" component={Skeleton} />
				<Route path="/Product/:productId" component={ProductView} />
				<Route path="/" component={Cart} />
			</div>
		</Router>
	)
}
