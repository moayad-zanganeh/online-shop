import PaymentForm from '@/components/payment';
import { useRouter } from 'next/router';

function PaymentPage() {
  const router = useRouter();
  const { totalPrice } = router.query;

  return <PaymentForm totalPrice={totalPrice} />;
}

export default PaymentPage;
