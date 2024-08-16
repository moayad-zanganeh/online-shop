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
import { brandsMobile, filterLocalization } from '@/constants/localization';

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
        width: '65%',
        display: 'flex',
        justifyContent: 'left',
        ml: '1%',
      }}
    >
      <Box
        sx={{
          padding: 2,
          borderRadius: 2,
          width: '100%',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
          boxSizing: 'border-box',
        }}
        dir="rtl"
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          {filterLocalization.filterProduct}{' '}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <FormControl sx={{ width: '100%' }} margin="normal">
            <InputLabel sx={{ fontWeight: '900' }}>
              {brandsMobile.brand}
            </InputLabel>
            <Select value={category} onChange={handleCategoryChange}>
              <MenuItem dir="rtl" value="">
                {brandsMobile.brand}
              </MenuItem>
              <MenuItem dir="rtl" value="apple">
                {brandsMobile.apple}
              </MenuItem>
              <MenuItem dir="rtl" value="samsung">
                {brandsMobile.sumsung}
              </MenuItem>
              <MenuItem dir="rtl" value="xiaomi">
                {brandsMobile.xiaomi}
              </MenuItem>
              <MenuItem dir="rtl" value="honor">
                {brandsMobile.honor}
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '100%' }} margin="normal">
            <InputLabel sx={{ fontWeight: '900' }}>
              {filterLocalization.price}
            </InputLabel>
            <Select value={sort} onChange={handleSortChange}>
              <MenuItem dir="rtl" value="">
                {filterLocalization.default}
              </MenuItem>
              <MenuItem dir="rtl" value="desc">
                {filterLocalization.fromMostToLeast}{' '}
              </MenuItem>
              <MenuItem dir="rtl" value="asc">
                {filterLocalization.fromLeastToMost}{' '}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography gutterBottom sx={{ mt: '15%', fontWeight: '900' }}>
          {filterLocalization.priceRange}{' '}
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
            {filterLocalization.filter}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{ marginTop: 2 }}
          >
            {filterLocalization.clearAll}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
