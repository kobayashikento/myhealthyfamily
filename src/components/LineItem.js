import { Divider, Typography } from "@material-ui/core"
import React from "react"
import { useShopify } from "../hooks"
import { Scrollbars } from 'react-custom-scrollbars';

export default (props) => {
	const { checkoutState, updateQuantity, removeLineItem } = useShopify()

	function decrementQuantity(lineItemId, lineItemQuantity, e) {
		e.preventDefault()
		const checkoutId = checkoutState.id
		const updatedQuantity = lineItemQuantity - 1
		updateQuantity(lineItemId, updatedQuantity, checkoutId)
	}

	function incrementQuantity(lineItemId, lineItemQuantity, e) {
		e.preventDefault()
		const checkoutId = checkoutState.id
		const updatedQuantity = lineItemQuantity + 1
		updateQuantity(lineItemId, updatedQuantity, checkoutId)
	}

	function deleteLineItem(lineItemId, e) {
		e.preventDefault()
		const checkoutId = checkoutState.id
		removeLineItem(checkoutId, lineItemId)
	}

	const getPrice = (item) => {
		if (item.variant.compareAtPrice === null) {
			return (
				<Typography style={{ fontSize: "16px", color: "black" }}>
					{`$ ${(item.quantity * item.variant.price).toFixed(2)}`}
				</Typography>
			)
		}
		return (
			<div>
				<Typography style={{ fontSize: "14px", color: "rgb(149, 148, 148)", textDecoration: "line-through" }}>
					{`$ ${(item.quantity * item.variant.price).toFixed(2)}`}
				</Typography>
				<Typography style={{ fontSize: "16px", color: "rgb(225, 51, 103)", marginLeft: "8px", fontWeight: "bold" }}>
					{`$ ${(item.quantity * item.variant.compareAtPrice).toFixed(2)}`}
				</Typography>
			</div>
		)
	}

	return (
		<Scrollbars
			style={{height: 300 }}
		>
			<li className="Line-item">
				{checkoutState.lineItems &&
					checkoutState.lineItems.map((lineItem, i) => {
						return (
							<div key={`${lineItem.title}` + i} className="lineItemDiv">
								<div className="Line-item__img">
									{lineItem.variant.image ? (
										<img
											src={lineItem.variant.image.src}
											alt={`${lineItem.title} product shot`}
										/>
									) : null}
								</div>
								<div className="Line-item__content">
									<div className="Line-item__content-row">
										<div className="Line-item__variant-title">
											{lineItem.variant.title}
										</div>
										<span className="Line-item__title">{lineItem.title}</span>
									</div>
									<div className="Line-item__content-row">
										<div className="Line-item__quantity-container">
											<button
												className="Line-item__quantity-update"
												onClick={(e) =>
													decrementQuantity(lineItem.id, lineItem.quantity, e)
												}
											>
												-
										</button>
											<span className="Line-item__quantity">
												{lineItem.quantity}
											</span>
											<button
												className="Line-item__quantity-update"
												onClick={(e) => {
													incrementQuantity(lineItem.id, lineItem.quantity, e)
												}}
											>
												+
										</button>
										</div>
										<span className="Line-item__price">
											{getPrice(lineItem)}
										</span>
										<button
											className="Line-item__remove"
											onClick={(e) => deleteLineItem(lineItem.id, e)}
										>
											×
									</button>
									</div>
								</div>
								<Divider style={{ width: "100%", margin: "14px 0" }} />
							</div>
						)
					})}
			</li>
		</Scrollbars>
	)
}
