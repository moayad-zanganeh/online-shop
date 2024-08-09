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
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  useAddProduct,
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
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [editId, setEditId] = useState('');
  const [productToEdit, setProductToEdit] = useState<any>(null);
  const [category, setCategory] = useState('');
  const [editProductData, setEditProductData] = useState<any>(null);
  const [addProductData, setAddProductData] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: productData, isLoading } = useFetchProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: editProduct } = useEditProduct();
  const { mutate: productAdd } = useAddProduct();
  useEffect(() => {
    if (productData) {
      const newRows = generateRows(productData);
      setData(newRows);
    }
  }, [productData]);

  const handleClose = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setEditProductData(null);
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
    setOpenEdit(true);
    setProductToEdit(product);
    console.log('hi');
    setEditId(product._id);
  };

  const handleSaveChanges = () => {
    if (editProductData) {
      console.log(editProductData);
      const FD = new FormData();
      Object.entries(editProductData).forEach(([key, value]) => {
        FD.append(key, value as string);
      });
      console.log('click');
      editProduct({ id: editId, productData: FD });
    }
  };
  const addProducts = () => {
    console.log(addProductData);
    if (addProductData) {
      const FD = new FormData();
      Object.entries(addProductData).forEach(([key, value]) => {
        FD.append(key, value as string);
      });
      productAdd(FD);
    }
  };
  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedValue = event.target.value as string;
    setCategory(selectedValue);
  };
  return (
    <Box>
      <Button
        onClick={() => setOpenAdd(true)}
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          fontSize: '16px',
          px: 2,
          m: 2,
        }}
      >
        ثبت محصول
      </Button>
      <Modal
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            افزودن محصول
          </Typography>

          <Box sx={{ mt: 2 }}>
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
            <FormControl sx={{ width: '100%' }} margin="normal">
              <InputLabel sx={{ fontWeight: '900' }}>برند</InputLabel>
              <Select value={category} onChange={handleCategoryChange}>
                <MenuItem dir="rtl" value="">
                  برند
                </MenuItem>
                <MenuItem dir="rtl" value="apple">
                  آیفون
                </MenuItem>
                <MenuItem dir="rtl" value="samsung">
                  سامسونگ
                </MenuItem>
                <MenuItem dir="rtl" value="xiaomi">
                  شیائومی
                </MenuItem>
                <MenuItem dir="rtl" value="honor">
                  آنر
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="قیمت"
              variant="outlined"
              fullWidth
              type="text"
              onChange={(e) =>
                setAddProductData({
                  ...addProductData,
                  price: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="توضیحات کوتاه"
              variant="outlined"
              fullWidth
              type="text"
              onChange={(e) =>
                setAddProductData({
                  ...addProductData,
                  description: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="میزان موجودی در انبار"
              variant="outlined"
              fullWidth
              type="text"
              onChange={(e) =>
                setAddProductData({
                  ...addProductData,
                  quantity: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <Input
              fullWidth
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAddProductData({
                    ...addProductData,
                    images: file,
                  });
                }
              }}
              sx={{ mb: 2 }}
            />
            //img yadet nare src ham product.image o ina bashe
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={addProducts}>
                ثبت
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                لغو
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
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
                      sx={{ width: '100%', maxWidth: '100px' }}
                      image={
                        item.images && item.images.length > 0
                          ? `http://${item.images[0]}`
                          : '/placeholder.jpg'
                      }
                      alt={item.name}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {item.quantity}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.brand}</TableCell>
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
                        setOpenDelete(true);
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
        open={openDelete}
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
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            ویرایش محصول
          </Typography>
          {productToEdit && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="نام محصول"
                variant="outlined"
                fullWidth
                defaultValue={productToEdit.name}
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
                type="text"
                defaultValue={productToEdit.price}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    price: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="موجودی محصول"
                variant="outlined"
                fullWidth
                type="text"
                defaultValue={productToEdit.quantity}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    quantity: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="توضیحات کوتاه"
                variant="outlined"
                fullWidth
                type="text"
                defaultValue={productToEdit.description}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    description: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="برند"
                variant="outlined"
                fullWidth
                type="text"
                defaultValue={productToEdit.brand}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    brand: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <Input
                fullWidth
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setEditProductData({
                      ...editProductData,
                      images: file,
                    });
                  }
                }}
                sx={{ mb: 2 }}
              />
              //img yadet nare src ham product.image o ina bashe
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
