import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import Cart from "./Cart"
import Skeleton from './Skeleton';
import ProductView from "./ProductView"
import { useShopify } from "../hooks"

import Alert from './Header/Alert';
import Header from './Header/Header';
import Catalog from './Product/Catalog';

import { Scrollbars } from 'react-custom-scrollbars';

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

const App = (props) => {

	const {
		createShop,
		createCheckout,
		fetchProducts,
		fetchCollection,
		featured,
		shopDetails
	} = useShopify()

	useEffect(() => {
		createShop()
		fetchProducts()
		createCheckout()
		fetchCollection()
	}, []);

	const [width, height] = useWindowSize();

	const createPaths = () => {
		return (
			featured.map((ele) => {
				let convertedLink = ele.title.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
				return <Route path={`/${convertedLink}`}
					render={props =>
						<Catalog {...props} collection={ele} shopDetails={shopDetails} width={width} />
					} />
			})
		)
	}

	return (
		<Scrollbars
			style={{ width: width, height: height }}
			autoHide
			renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{display:"none"}}/>}
			renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{display:"none"}}/>}
		>
			<Alert />

			<Router>
				<Route exact path="/" render={() => <Redirect to="/home" />} />
				<Route path="/" render={props => <Header {...props} history={props.history} width={width} />} />
				<Switch>
					<Route exact path="/home" render={props => <Skeleton {...props} />} />
					{featured.length !== 0 ?
						createPaths()
						:
						null
					}
				</Switch>
			</Router>
		</Scrollbars>
	)
}

export default React.memo(App)