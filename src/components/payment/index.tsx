import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { paymentLocalization } from '@/constants/localization';
import { useAddNewOrders } from '@/api/order/order.query';
import useCartStore from '@/store/useCartStore';

function PaymentForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [totalPrice, setTotalPrice] = useState(1000000);
  // const { mutate } = useAddNewOrders();
  // const [user, setUser] = useState(null);
  // const cartStorage = useCartStore((state) => state.cart);
  // useEffect(() => {
  //   const userString = localStorage.getItem('userStorage');
  //   if (userString) {
  //     setUser(JSON.parse(userString));
  //   }
  // });
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    setCardNumber(value.replace(/(\d{4})(?=\d)/g, '$1 '));
  };

  useEffect(() => {
    if (timeRemaining === 0) {
      //   navigate('/'); // هدایت به مسیر جدید در صورت پایان تایمر
      //   return;
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };
  // const handleOkClick = () => {
  //   if (!user) {
  //     console.error('user not found');
  //     return;
  //   }

  //   const order = {
  //     user: user._id,
  //     products: cartStorage.map((item) => ({
  //       product: item._id,
  //       count: item.quantity,
  //     })),
  //     deliveryStatus: false,
  //   };

  //   mutate(order, {
  //     onSuccess: () => {
  //       console.log('hhh');
  //     },
  //     onError: (error) => {
  //       console.error('Order failed', error);
  //     },
  //   });
  // };
  return (
    <Box>
      <Typography variant="h5" gutterBottom align="center" sx={{ my: 1 }}>
        {paymentLocalization.paymentMelat}
      </Typography>

      <Box sx={{ display: 'flex', my: 2 }}>
        <Box maxWidth="md" sx={{ borderRadius: 2, boxShadow: 3, mx: 2 }}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                align="left"
                sx={{
                  backgroundColor: 'gray',
                  px: 2,
                  py: 1,
                  borderRadius: '10px 0 20px 0',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                {paymentLocalization.cardInformation}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, mt: 1 }}>
                <Typography sx={{ fontSize: '20px' }}>
                  {paymentLocalization.timeRemaining}
                </Typography>
                <Typography sx={{ mx: 1, fontWeight: 900, fontSize: '18px' }}>
                  {formatTime(timeRemaining)}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '18px', fontWeight: 900 }}
                >
                  {paymentLocalization.phoneCard}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '14px', color: 'gray' }}
                >
                  {paymentLocalization.aboutPhoneCard}
                </Typography>
              </Box>
              <TextField
                label=""
                type="text"
                variant="outlined"
                margin="normal"
                required
                value={cardNumber}
                onChange={handleCardNumberChange}
                inputProps={{
                  style: { textAlign: 'center' },
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  maxLength: 19,
                }}
                sx={{ width: '50%', mx: 5 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '18px', fontWeight: 900 }}
                >
                  {paymentLocalization.secondIdentificationNumber}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '14px', color: 'gray' }}
                >
                  {paymentLocalization.aboutSIN}
                </Typography>
              </Box>

              <TextField
                label=""
                type="text"
                variant="outlined"
                margin="normal"
                required
                inputProps={{ maxLength: 4, style: { textAlign: 'center' } }}
                sx={{ width: '50%', mx: 5 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box sx={{ mr: 17 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '18px', fontWeight: 900 }}
                >
                  {paymentLocalization.cardExpirationDate}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '14px', color: 'gray' }}
                >
                  {paymentLocalization.aboutCED}
                </Typography>
              </Box>

              <Box>
                <TextField
                  label=""
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  placeholder={paymentLocalization.month}
                  inputProps={{ maxLength: 2, style: { textAlign: 'right' } }}
                  sx={{ mx: 2, width: '20%' }}
                />
                <TextField
                  label=""
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  placeholder={paymentLocalization.year}
                  inputProps={{ maxLength: 2, style: { textAlign: 'right' } }}
                  sx={{ mx: 2, width: '20%' }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '18px', fontWeight: 900 }}
                >
                  {paymentLocalization.securityCode}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '14px', color: 'gray' }}
                >
                  {paymentLocalization.aboutSC}
                </Typography>
              </Box>
              <TextField
                label=""
                type="text"
                variant="outlined"
                margin="normal"
                required
                inputProps={{ maxLength: 5, style: { textAlign: 'right' } }}
                sx={{ width: '50%', ml: 23 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '18px', fontWeight: 900 }}
                >
                  {paymentLocalization.email}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '14px', color: 'gray' }}
                >
                  {paymentLocalization.aboutEmail}
                </Typography>
              </Box>
              <TextField
                label=""
                type="email"
                variant="outlined"
                margin="normal"
                required
                inputProps={{ style: { textAlign: 'left' } }}
                sx={{ width: '50%', ml: 15 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  my: 2,
                  width: '30%',
                  backgroundColor: 'green',
                  ml: '25%',
                  mr: 2,
                  fontWeight: 900,
                  borderRadius: '20px',
                  ':hover': { backgroundColor: 'darkgreen', color: 'white' },
                }}
                // onClick={handleOkClick}
              >
                {paymentLocalization.payment}
              </Button>
              <Button
                variant="contained"
                sx={{
                  my: 2,
                  width: '15%',
                  borderRadius: '20px',
                  backgroundColor: 'red',
                  fontWeight: 900,
                  ':hover': { backgroundColor: 'darkred', color: 'white' },
                }}
              >
                {paymentLocalization.optOut}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ borderRadius: 2, boxShadow: 3, width: '30%', height: '50vh' }}
        >
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              align="left"
              sx={{
                backgroundColor: 'gray',
                py: 1,
                px: 2,
                borderRadius: '10px 0 20px 0',
                width: '30%',
                color: 'white',
                fontSize: '16px',
              }}
            >
              {paymentLocalization.receiverInformation}
            </Typography>
          </Box>
          <Box sx={{ mx: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {paymentLocalization.receiverName}
              </Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 900 }}>
                {paymentLocalization.uranos}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {paymentLocalization.receiverPhone}
              </Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 900 }}>
                285950
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, my: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {paymentLocalization.terminalNumber}
              </Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 900 }}>
                639836
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {paymentLocalization.addressWeb}
              </Typography>
              <Typography
                sx={{ fontSize: '16px', fontWeight: 900, color: 'blue' }}
              >
                http://www.uranus.com
              </Typography>
            </Box>
            <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
              <Typography
                sx={{ fontSize: '20px', color: 'green', fontWeight: 900 }}
              >
                {paymentLocalization.amountPayable}
              </Typography>
              <Typography
                sx={{ fontSize: '20px', fontWeight: 900, color: 'green' }}
              >
                {totalPrice}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PaymentForm;
