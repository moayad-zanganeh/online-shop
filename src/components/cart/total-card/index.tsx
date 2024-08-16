import { cardLocalization } from '@/constants/localization';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const TotalCard = ({ totalPrice }: { totalPrice: number }) => {
  const router = useRouter();
  const hasLogin = hasCookie('access');
  const handleTocheckout = () => {
    router.push('/checkout');
  };

  return (
    <Card
      sx={{
        width: 400,
        height: 'fit-content',
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.5)',
      }}
      dir="rtl"
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            variant="outlined"
            label={cardLocalization.discountCode}
            size="small"
          />
          <Button variant="contained">{cardLocalization.registration}</Button>
        </Box>
        <Divider sx={{ bgcolor: grey[300], mt: '14px' }} />
      </CardContent>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontSize: '20px', color: 'black' }}>
            {cardLocalization.totalPrice}{' '}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '20px', color: 'black', fontWeight: '900' }}
          >
            {totalPrice?.toLocaleString()} {cardLocalization.toman}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontSize: '20px', color: 'black' }}>
            {cardLocalization.discount}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '20px', color: 'black', fontWeight: '900' }}
          >
            {(0).toLocaleString()} {cardLocalization.toman}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontSize: '20px', color: 'black' }}>
            {cardLocalization.amountPayable}{' '}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '20px', color: 'black', fontWeight: '900' }}
          >
            {totalPrice?.toLocaleString()} {cardLocalization.toman}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ width: '100%', fontSize: '18px', fontWeight: '900' }}
          onClick={handleTocheckout}
        >
          {cardLocalization.finalizeThePurchase}
        </Button>
      </CardActions>
    </Card>
  );
};

export default TotalCard;
