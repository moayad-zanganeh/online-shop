import { brandsMobile, modalLocalization } from '@/constants/localization';
import { Box, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { MobileBrandsArr } from '@/constants/mobileBrands';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
interface ModalCategoriesProps {
  open: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

function ModalCategories({
  open,
  handleMouseEnter,
  handleMouseLeave,
}: ModalCategoriesProps) {
  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        backgroundColor: 'white',
        width: '30%',
        display: open ? 'block' : 'none',
        position: 'absolute',
        top: '19%',
        left: '2%',
        zIndex: 1300,
        boxShadow: 5,
        borderRadius: '10px',
        color: '#3e4245fa',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            width: '35%',
            display: 'flex',
            px: '2%',
            mr: '2%',
            backgroundColor: '#bfddf3fa',
            alignItems: 'center',
            height: '50px',
            borderRadius: '5px',
          }}
        >
          <StayCurrentPortraitIcon sx={{ mx: '10%', fontSize: '23px' }} />
          <Typography sx={{ fontSize: '20px', fontWeight: '800' }}>
            {modalLocalization.mobile}
          </Typography>
        </Box>
        <Box sx={{ width: '0.1%', backgroundColor: '#b5b5b5', mr: '3%' }}></Box>
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'right',
            my: '2%',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ':hover': { color: 'red' },
            }}
          >
            <Typography sx={{ fontSize: '20px' }}>
              {brandsMobile.differentBrands}
            </Typography>
            <ArrowBackIosIcon sx={{ fontSize: '17px' }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'right',
              textAlign: 'left',
              width: '60%',
            }}
          >
            {MobileBrandsArr.map((mobilebrands) => (
              <Typography
                sx={{ my: '5%', ':hover': { color: 'red' }, cursor: 'pointer' }}
              >
                {brandsMobile.smartPhone} {mobilebrands}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ModalCategories;
