import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey, red } from '@mui/material/colors';
import { getCookie } from 'cookies-next';
import { useGetAllCartItems, useUpdateCart } from '@/api/card/card.query';

const CardOfCart = ({ book, refetch }: { book: any; refetch: () => void }) => {
  const { name, price, imgURL, desc, author, quantity, id } = book;

  const userId = getCookie('access')!;

  const { data: cart } = useGetAllCartItems(userId);

  const { mutate } = useUpdateCart();

  const deleteHandler = () => {
    const result = cart.filter((book: any) => book.id !== id);
    mutate({ cart: result, id: userId });
    refetch();
  };

  const handleAddQuantity = () => {
    const index = cart.findIndex((book: any) => book.id === id);
    const newCart = [...cart];
    newCart[index].quantity++;

    mutate({ cart: newCart, id: userId });
    refetch();
  };

  const handleReduceQuantity = () => {
    const index = cart.findIndex((book: any) => book.id === id);
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
    }

    mutate({ cart: newCart, id: userId });
    refetch();
  };

  return (
    <Card
      sx={{ display: 'flex', maxWidth: 400, maxHeight: 300, gap: 2, p: 2 }}
      dir="rtl"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <CardMedia
          component="img"
          image={imgURL}
          alt={name}
          sx={{
            width: 155,
            height: 130,
            objectFit: 'cover',
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            قیمت:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {(quantity * price).toLocaleString('fa')}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          تومان
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-between',
          gap: '22px',
        }}
        dir="rtl"
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="h5" component="h5" fontWeight="600">
            نام کتاب :
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="h5" component="h5" fontWeight="600">
            نویسنده :
          </Typography>
          <Typography variant="h5" component="div">
            {author}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="h5" component="h5" fontWeight="600">
            انتشارات :
          </Typography>
          <Typography variant="h5" component="div">
            {desc}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="h5" component="h5" fontWeight="600">
            قیمت واحد :
          </Typography>
          <Typography variant="h5" component="div">
            {price.toLocaleString('fa')} تومان
          </Typography>
        </Box>

        <Box
          sx={{ border: '1px solid', borderColor: grey[400], borderRadius: 1 }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            justifyContent="space-between"
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <IconButton onClick={handleAddQuantity}>
                <AddIcon sx={{ fontSize: '20px' }} />
              </IconButton>
              <Typography>{quantity}</Typography>

              <IconButton onClick={handleReduceQuantity}>
                <RemoveIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            </Box>
            <Box onClick={deleteHandler}>
              <DeleteIcon sx={{ color: red[600], cursor: 'pointer' }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CardOfCart;
