interface Order {
  _id: string;
  user: {
    firstname: string;
    lastname: string;
    address: string;
    phoneNumber: string;
  };
  products: [
    { product: { name: string; price: string }; count: string; _id: string }
  ];
  totalPrice: number;
  createdAt: string;
  deliveryDate: string;
}
