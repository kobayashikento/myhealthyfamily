import React, { useEffect } from "react"
import LineItem from "../LineItem"
import { useShopify } from "../../hooks"
import { MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md"
import { Divider, Typography } from "@material-ui/core"

const totalTypo = { fontSize: "16px" }
const totalContainer = { display: "flex", alignItems: "center", justifyContent: "space-between" }

export default (props) => {
	const {
		cartStatus,
		checkoutState,
		setCount,
		cartCount,
	} = useShopify()

	function openCheckout(e) {
		e.preventDefault()
		// window.open(checkoutState.webUrl) // opens checkout in a new window
		window.location.replace(checkoutState.webUrl) // opens checkout in same window
	}

	React.useEffect(() => {
		function getCount() {
			let lineItems =
				checkoutState.lineItems && checkoutState.lineItems.length > 0
					? checkoutState.lineItems
					: []
			let count = 0
			lineItems.forEach((item) => {
				count += item.quantity
				return count
			})
			setCount(count)
		}
		getCount()
	}, [cartStatus, checkoutState])



	return (
		<div style={{
			display: cartStatus ? "flex" : "none", position: "absolute", width: "400px", right: "0px",
			background: "white", margin: "0px 30px", boxShadow: "0 8px 30px rgb(0 0 0 / 8%)"
		}}>
			<div style={{ padding: "15px 20px", display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
				<Typography style={{ fontSize: "16px", fontWeight: "bold", padding: "16px 0", textTransform: "uppercase" }}>
					{`Your Cart (${cartCount} items)`}</Typography>
				<Divider style={{ width: "89%", margin: "0px 6px" }} />
				{
					cartCount === 0 ?
						<div style={{ width: "100%" }}>
							<Typography style={{ width: "fit-content", fontSize: "18px", padding: "35px 0 20px 0", margin: "0 auto" }}>No items in your cart!</Typography>
							<Divider style={{ width: "100%", margin: "22px 6px" }} />
						</div> :
						<ul style={{ fontFamily: "SofiaR", width: "100%" }} className="Cart__line-items">
							<LineItem />
						</ul>
				}
				<footer style={{ width: "100%" }}>
					<div style={totalContainer}>
						<Typography style={totalTypo}>Subtotal:</Typography>
						<div className="Cart-info__pricing">
							<span className="pricing" style={{ fontWeight: "bold", fontFamily: "SofiaR" }}>$ {checkoutState.subtotalPrice}</span>
						</div>
					</div>
					<div style={totalContainer}>
						<Typography style={totalTypo}>Taxes:</Typography>
						<div className="Cart-info__pricing">
							<span className="pricing" style={{ fontWeight: "bold", fontFamily: "SofiaR" }}>$ {checkoutState.totalTax}</span>
						</div>
					</div>
					<div style={totalContainer}>
						<Typography style={totalTypo}>Total:</Typography>
						<div className="Cart-info__pricing">
							<span className="pricing" style={{ fontWeight: "bold", fontFamily: "SofiaR" }}>$ {checkoutState.totalPrice}</span>
						</div>
					</div>
					<button
						className="Cart__checkout button"
						onClick={(e) => openCheckout(e)}
						style={{ pointerEvents: cartCount === 0 ? "none" : "" }}
						disabled={cartCount === 0}
					>
						<Typography style={{ fontSize: "16px" }}>
							Checkout
						</Typography>
					</button>
				</footer>
			</div>
		</div>
	)
}
