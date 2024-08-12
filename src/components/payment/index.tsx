import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function PaymentForm() {
  const [cardNumber, setCardNumber] = useState('');

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    setCardNumber(value.replace(/(\d{4})(?=\d)/g, '$1 '));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom align="center" sx={{ my: 5 }}>
        پرداخت با درگاه ملت
      </Typography>

      <Box sx={{ display: 'flex' }}>
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
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                align="left"
                sx={{
                  backgroundColor: 'gray',
                  p: 1,
                  borderRadius: '10px 0 20px 0',
                }}
              >
                اطلاعات کارت
              </Typography>
              <Typography variant="h5" gutterBottom align="right">
                زمان باقی مانده:
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mx: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '18px', fontWeight: 900 }}
                >
                  شماره کارت
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '14px', color: 'gray' }}
                >
                  شماره کارت 16 رقمی درج شده روی کارت وارد نمایید
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
                mx: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '18px', fontWeight: 900 }}
                >
                  شماره شناسایی دوم (CVV2)
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '14px', color: 'gray' }}
                >
                  شماره 3 یا 4 رقمی درج شده روی کارت را وارد نمایید
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
                mx: 2,
              }}
            >
              <Box sx={{ mr: 5 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '18px', fontWeight: 900 }}
                >
                  تاریخ انقضای کارت
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '14px', color: 'gray' }}
                >
                  تاریخ انقضای کارت وارد کنید.
                </Typography>
              </Box>

              <Box sx={{ mx: '11%' }}>
                <TextField
                  label=""
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  placeholder="ماه"
                  inputProps={{ maxLength: 2, style: { textAlign: 'right' } }}
                  sx={{ mx: 2, width: '20%' }}
                />
                <TextField
                  label=""
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  placeholder="سال"
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
                mx: 2,
              }}
            >
              <Box sx={{ mr: 7 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '18px', fontWeight: 900 }}
                >
                  کد امنیتی{' '}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '14px', color: 'gray' }}
                >
                  رمز امنیتی را وارد کنید{' '}
                </Typography>
              </Box>
              <TextField
                label=""
                type="text"
                variant="outlined"
                margin="normal"
                required
                inputProps={{ maxLength: 5, style: { textAlign: 'right' } }}
                sx={{ width: '50%', mx: 15 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mx: 2,
              }}
            >
              <Box sx={{ mr: 1 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '18px', fontWeight: 900 }}
                >
                  ایمیل{' '}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="left"
                  sx={{ fontSize: '14px', color: 'gray' }}
                >
                  لطفا ایمیل معتبر وارد کنید (اختیاری){' '}
                </Typography>
              </Box>
              <TextField
                label=""
                type="email"
                variant="outlined"
                margin="normal"
                required
                inputProps={{ style: { textAlign: 'left' } }}
                sx={{ width: '50%', mx: 14 }}
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
                  ':hover': { backgroundColor: 'green', color: 'white' },
                }}
              >
                پرداخت
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  my: 2,
                  width: '15%',
                  borderRadius: '20px',
                  backgroundColor: 'red',
                  fontWeight: 900,
                  ':hover': { backgroundColor: 'red', color: 'white' },
                }}
              >
                انصراف
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ borderRadius: 2, boxShadow: 3, width: '30%' }}>
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              align="left"
              sx={{
                backgroundColor: 'gray',
                p: 1,
                borderRadius: '10px 0 20px 0',
                width: '37%',
              }}
            >
              اطلاعات پذیرنده{' '}
            </Typography>
          </Box>
          <Box>
            <Box>
              <Typography>نام پذیرنده:</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 900 }}>
                اورانوس
              </Typography>
            </Box>
            <Box>
              <Typography>شماره پذیرنده:</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 900 }}>
                285950
              </Typography>
            </Box>
            <Box>
              <Typography>شماره ترمینال:</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 900 }}>
                639836
              </Typography>
            </Box>
            <Box>
              <Typography>آدرس وب سایت:</Typography>
              <Typography
                sx={{ fontSize: '16px', fontWeight: 900, color: 'blue' }}
              >
                http://www.uranus.com
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: 'green' }}>مبلغ قابل پرداخت:</Typography>
              <Typography
                sx={{ fontSize: '16px', fontWeight: 900, color: 'blue' }}
              ></Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PaymentForm;
