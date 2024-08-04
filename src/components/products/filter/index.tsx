import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@mui/material';

const Filter = ({
  setParams,
}: {
  setParams: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedValue = event.target.value as string;
    setCategory(selectedValue);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as string;
    setSort(selectedValue);
  };

  const handleSubmit = () => {
    const newParams: Record<string, string> = {
      price_gte: priceRange[0].toString(),
      price_lte: priceRange[1].toString(),
    };

    if (category) {
      newParams.category = category;
    }

    if (sort) {
      newParams._sort = 'price';
      newParams._order = sort;
    }

    setParams(newParams);
  };

  const handleReset = () => {
    setCategory('');
    setSort('');
    setPriceRange([0, 100000000]);
    setParams({});
  };

  return (
    <Box
      sx={{
        width: '45%',
        display: 'flex',
        justifyContent: 'left',
        ml: '2%',
      }}
    >
      <Box
        sx={{
          padding: 2,
          borderRadius: 2,
          width: '100%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          boxSizing: 'border-box',
        }}
        dir="rtl"
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          فیلتر محصولات
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
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
          <FormControl sx={{ width: '100%' }} margin="normal">
            <InputLabel sx={{ fontWeight: '900' }}>قیمت</InputLabel>
            <Select value={sort} onChange={handleSortChange}>
              <MenuItem dir="rtl" value="">
                پیشفرض
              </MenuItem>
              <MenuItem dir="rtl" value="desc">
                از بیشترین به کمترین
              </MenuItem>
              <MenuItem dir="rtl" value="asc">
                از کمترین به بیشترین
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography gutterBottom sx={{ mt: '15%', fontWeight: '900' }}>
          بازه قیمتی
        </Typography>

        <Slider
          aria-label="price"
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          sx={{ color: '#ee384ec4' }}
          min={0}
          max={100_000_000}
          step={1_000_000}
        />

        <Box display={'flex'} gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: 2, backgroundColor: '#ee384e' }}
          >
            فیلتر
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{ marginTop: 2 }}
          >
            پاک کردن همه
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
