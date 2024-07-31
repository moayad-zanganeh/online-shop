import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Typography,
  Box,
  TablePagination,
  CardMedia,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  useDeleteProduct,
  useEditProduct,
  useFetchProduct,
} from '@/api/products/products.querys';
import { headCells, rows as generateRows } from '@/constants/table/table';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SimpleTable() {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [editProductData, setEditProductData] = useState<any>(null);
  const [addProductData, setAddProductData] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: productData, isLoading, refetch } = useFetchProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: editProduct } = useEditProduct();

  useEffect(() => {
    if (productData) {
      const newRows = generateRows(productData);
      setData(newRows);
    }
  }, [productData]);

  const handleClose = () => {
    setOpen(false);
    setEditProductData(null); // Reset editProductData on close
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (product: any) => {
    setEditProductData(product);
    setOpen(true);
  };

  const handleSaveChanges = async () => {
    if (editProductData) {
      try {
        await editProduct(editProductData);
        handleClose();

        await refetch();
      } catch (error) {
        console.error('Failed to update product:', error);
        alert(
          'مشکلی در به‌روزرسانی محصول رخ داده است. لطفاً دوباره تلاش کنید.'
        );
      }
    }
  };
  const addProducts = () => {
    return (
      addProductData && (
        <Box sx={{ mt: 2, display: 'block' }}>
          <TextField
            label="نام محصول"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setAddProductData({
                ...addProductData,
                name: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="قیمت"
            variant="outlined"
            fullWidth
            type="type"
            onChange={(e) =>
              setAddProductData({
                ...addProductData,
                name: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="تصویر"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setAddProductData({
                ...addProductData,
                name: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              ثبت محصول{' '}
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              لغو
            </Button>
          </Box>
        </Box>
      )
    );
  };
  return (
    <Box>
      <Button onClick={addProducts}>افزودن محصول</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              productData?.data?.products?.map((item: any, index: number) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        item.images && item.images.length > 0
                          ? `http://${item.images[0]}`
                          : '/placeholder.jpg'
                      }
                      alt={item.name}
                      sx={{ width: '10%' }}
                    />
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(item)}
                    >
                      ویرایش
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: 'red', mx: '2%' }}
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setOpen(true);
                        setDeleteId(item._id);
                      }}
                    >
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {/* Delete Confirmation Modal */}
      <Modal
        open={Boolean(deleteId)}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            حذف محصول
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            آیا مطمئن هستید که می‌خواهید آیتم شماره {deleteId} را حذف کنید؟
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteProduct(deleteId);
                handleClose();
              }}
            >
              تایید
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              لغو
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Edit Product Modal */}
      <Modal
        open={Boolean(editProductData)}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            ویرایش محصول
          </Typography>
          {editProductData && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="نام محصول"
                variant="outlined"
                fullWidth
                value={editProductData.name}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    name: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="قیمت"
                variant="outlined"
                fullWidth
                type="number"
                value={editProductData.price}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    price: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="تصویر"
                variant="outlined"
                fullWidth
                value={editProductData.images[0] || ''}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    images: [e.target.value], // assuming only one image
                  })
                }
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChanges}
                >
                  ذخیره تغییرات
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  لغو
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default SimpleTable;
