import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets, dummyOrders } from '../../assets/assets';
import axios from 'axios';
import toast from 'react-hot-toast';

const Orders = () => {
    const { currency } = useAppContext();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
       try {
        const {data} = await axios.get('/api/order/seller');
       if(data.success){
        setOrders(data.orders);
       }else{
        toast.error(data.message)
       }
       } catch (error) {
        toast.error(error.message)
       }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between ">
            <div className="md:p-10 p-4">
                <h2 className="text-lg font-medium mb-6">Orders List</h2>
                <div className="flex flex-col gap-6">
                    {orders.map((order, index) => (
                        <div key={index}
                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-8 max-w-4xl mx-auto rounded-md border border-gray-200 bg-white shadow-sm"
                        >

                            <div className="flex gap-5 items-start max-w-80 flex-1">
                                <img className="w-14 h-14 object-cover rounded-md border border-gray-200" src={assets.box_icon} alt="boxIcon" />
                                <div className="flex flex-col gap-1">
                                    {order.items.map((item, idx) => (
                                        <p key={idx} className="font-medium leading-tight">
                                            {item.product.name} <span className="text-[#24a47c] text-base font-normal">x {item.quantity}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="text-xs md:text-sm my-auto flex-1 text-black/60 whitespace-pre-line">
                                <span className='font-semibold text-black/80'>{order.address.firstName} {order.address.lastName}</span>
                                <br />
                                {order.address.street}
                                <br />
                                {order.address.city}
                                <br />
                                {order.address.state}, {order.address.zipcode}, {order.address.country}
                                <br />
                                {order.address.phone}
                            </div>

                            <div className="font-bold text-lg my-auto text-center flex-1 whitespace-nowrap">
                                {currency}{order.amount}
                            </div>

                            <div className="flex flex-col text-xs md:text-sm text-black/60 items-end flex-1 whitespace-nowrap">
                                <p className="mb-1">Method: <span className="font-semibold">{order.paymentType}</span></p>
                                <p className="mb-1">Date: <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                                <p>
                                    Payment: <span className={order.isPaid ? "text-[#24a47c] font-medium" : "text-yellow-600 font-medium"}>
                                        {order.isPaid ? "Paid" : "Pending"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
