import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEditOrderById, useGetAllOrders } from '@/api/order/order.query';

const Orders = () => {
  const { data } = useGetAllOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const [isModalOpen, setModalOpen] = useState(false);
  const { mutate: editOrder } = useEditOrderById();
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (data) {
      setOrders(data.data.orders);
    }
  }, [data]);
  const handleEditClick = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  //   const handleDeliverOrder = (orderId: string) => {
  //     removeOrder(orderId, {
  //       onSuccess: () => {
  //         refetch();
  //       },
  //     });
  //   };

  const handleSaveChanges = () => {
    if (selectedOrder) {
      editOrder(selectedOrder._id, {
        onSuccess: () => {
          setModalOpen(false);
        },
      });
    }
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نام کاربر</TableCell>
              <TableCell>مبلغ</TableCell>
              <TableCell>تاریخ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order: Order) => (
              <TableRow key={order._id}>
                <TableCell>ORD-{order?.user.firstname}</TableCell>
                <TableCell>{order?.totalPrice}</TableCell>
                <TableCell>{order?.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Orders;
