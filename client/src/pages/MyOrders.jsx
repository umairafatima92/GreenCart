import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import axios from 'axios';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const { currency, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user')
      if (data.success) {
        setMyOrders(data.orders)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user])

  return (
    <div className='mt-16 pb-16'>
      <div className='mb-8'>
        <p className='text-2xl font-medium uppercase mb-1'>MY ORDERS</p>
        <div className='w-24 h-0.5 bg-[#24a47c] rounded-full' />
      </div>
      {myOrders.map((order) => (
        <div
          key={order._id}
          className="bg-white border border-gray-200 rounded-xl mb-8 p-6 max-w-4xl"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center text-gray-500 text-sm mb-2 gap-1 md:gap-0">
            <span>OrderId : {order._id}</span>
            <span className="md:mx-4">Payment : {order.paymentType}</span>
            <span>Total Amount : {currency}{order.amount}</span>
          </div>

          {order.items.map((item, index) => (
            <div
              key={index}
              className={`flex w-full py-5 border-b border-gray-200 last:border-b-0`}
            >
              <div className="flex items-center min-w-[200px]">
                <img
                  src={item.product?.image?.[0]}
                  alt={item.product?.name || "Product"}
                  className="w-16 h-16 object-contain bg-[#24a47c]/10"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-medium text-gray-800 mb-1">{item.product?.name}</h2>
                  <p className="text-gray-500">Category: {item.product?.category}</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center pl-[50px] md:ml-8 mb-4 md:mb-0 text-gray-500">
                <div>Quantity: {item.quantity ?? 1}</div>
                <div>Status: {order.status || "Processing"}</div>
                <div>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '--'}</div>
              </div>

              <div className="flex flex-col justify-center items-end min-w-[120px] text-[#24a47c] font-medium text-base">
                <span>Amount: {currency}{(item.product?.price || 0) * (item.quantity || 1)}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MyOrders
