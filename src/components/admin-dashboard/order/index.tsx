// import { useState } from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   Modal,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from '@mui/material';
// import {
//   useEditOrderById,
//   useGetAllOrders,
//   useRemoveOrderById,
// } from '@/api/order/order.query';
// import { OrderType } from '@/types/order';

// const Orders = () => {
//   const { data: orders, refetch } = useGetAllOrders();
//   const [selectedOrder, setSelectedOrder] = useState<OrderType>();
//   const [isModalOpen, setModalOpen] = useState(false);
//   const { mutate: editOrder } = useEditOrderById();
//   const { mutate: removeOrder } = useRemoveOrderById();

//   console.log(orders);

//   const handleEditClick = (order: OrderType) => {
//     setSelectedOrder(order);
//     setModalOpen(true);
//   };

//   const handleDeliverOrder = (orderId: string) => {
//     removeOrder(orderId, {
//       onSuccess: () => {
//         refetch();
//       },
//     });
//   };

//   const handleSaveChanges = () => {
//     if (selectedOrder) {
//       editOrder(selectedOrder._id, {
//         onSuccess: () => {
//           refetch();
//           setModalOpen(false);
//         },
//       });
//     }
//   };

//   return (
//     <Container>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>شناسه سفارش</TableCell>
//               <TableCell>محصولات</TableCell>
//               <TableCell>عملیات</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders?.data?.order?.map((order: OrderType) => (
//               <TableRow key={order._id}>
//                 <TableCell>ORD-{order?.user._id}</TableCell>
//                 <TableCell>
//                   {order?.products?.map((product) => (
//                     <Box key={product._id} display="flex" gap={1}>
//                       {product.product.images &&
//                       product.product.images.length > 0 ? (
//                         <img
//                           src={`http://${product.product.images[0]}`}
//                           alt={product.product.name}
//                           width="50"
//                         />
//                       ) : (
//                         <Typography>No Image</Typography>
//                       )}
//                     </Box>
//                   ))}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     size="small"
//                     onClick={() => handleEditClick(order)}
//                     sx={{ mr: 1 }}
//                   >
//                     ویرایش
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     size="small"
//                     onClick={() => handleDeliverOrder(order._id)}
//                   >
//                     تحویل به مشتری
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default Orders;
