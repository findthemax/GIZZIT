import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'


const Homepage = () => {

    const order = useSelector(state => state.order.order)

    if(order === null) {
        return <Redirect to='/' />
    }

    return (
        <div className="order-success">
            <div className="success-message">
                <h2>Your order has been received!</h2>

                <p>Please check the order details and write down the payment instructions below.</p>
                <p>Please be aware that your order will not be placed until you have paid the amount listed below via bank transfer. This must be paid no later than the 4th August 2020. </p>
                <p>These details have also been sent to your email: {order.email} (please check your junk mail as it may end up in there).</p>
            </div>

                <div className="order-details">
                    <h3>Order Details</h3>
                    <div>
                        <h4>First Name</h4>
                        <p>{order.fName}</p>
                    </div>
                    <div>
                        <h4>Last Name</h4>
                        <p>{order.lName}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{order.email}</p>
                    </div>
                    <div>
                        <h4>Product</h4>
                        <p>{order.product}</p>
                    </div>
                    <div>
                        <h4>Engraving</h4>
                        <p>"{order.engraving}"</p>
                    </div>
                    <div>
                        <h4>Delivery</h4>
                        <p>{order.deliveryMethod}</p>
                    </div>
                    <div>
                        <h4>Payment Schedule</h4>
                        <p>{order.paymentInfo}</p>
                    </div>

                </div>

                <div className="payment-details">
                    <h3>Payment Details</h3>
                    <div>
                        <h4>Payment Required</h4>
                        <p>{order.total}</p>
                    </div>
                    <div>
                        <h4>Bank</h4>
                        <p>Starling Bank</p>
                    </div>
                    <div>
                        <h4>Account Number</h4>
                        <p>04752507</p>
                    </div>
                    <div>
                        <h4>Sort Code</h4>
                        <p>608371</p>
                    </div>
                    <div>
                        <h4>Payment Reference</h4>
                        <p>{order.paymentCode}</p>
                    </div>
                </div>
        </div>

    );
};

export default Homepage;
