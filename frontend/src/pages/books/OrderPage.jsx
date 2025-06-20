import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) return <div className="text-center py-8 text-lg">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 py-8">Error getting orders data.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found!</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full">Order #{index + 1}</span>
                <span className="text-sm text-gray-500">Order ID: {order._id}</span>
              </div>

              <div className="space-y-1 text-gray-700">
                <p><span className="font-semibold">Name:</span> {order.name}</p>
                <p><span className="font-semibold">Email:</span> {order.email}</p>
                <p><span className="font-semibold">Phone:</span> {order.phone}</p>
                <p><span className="font-semibold">Total Price:</span> ₹{order.totalPrice}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">Address:</h3>
                <p className="text-gray-600">{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-1">Product IDs:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {order.productIds.map((productId) => (
                    <li key={productId}>{productId}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
