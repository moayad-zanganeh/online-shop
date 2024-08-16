interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface Data {
  id: number;
  name: string;
  photo: string;
  price: number;
  action: string;
  description: string;
  brand: string;
  quantity: string;
}

function createData(
  id: number,
  name: string,
  photo: string,
  price: number,
  action: string,
  description: string,
  brand: string,
  quantity: string
): Data {
  return {
    id,
    name,
    photo,
    price,
    action,
    description,
    brand,
    quantity,
  };
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'نام محصول',
  },
  {
    id: 'photo',
    numeric: true,
    disablePadding: false,
    label: 'عکس محصول',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'موجودی محصول',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'توضیحات کوتاه',
  },
  {
    id: 'brand',
    numeric: true,
    disablePadding: false,
    label: 'برند',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'قیمت محصول',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'عملیات',
  },
];

export const rows = (productData: any) => {
  return productData?.data?.products?.map((product: any, index: number) => ({
    id: index + 1,
    name: product.name,
    photo:
      product.images && product.images.length > 0
        ? `http://${product.images[0]}`
        : '/placeholder.jpg',
    price: product.price,
  }));
};
