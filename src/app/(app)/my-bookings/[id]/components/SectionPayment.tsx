import { DollarSign, CreditCard } from 'lucide-react';
import { DetailBooking } from '@/types/bookingType';
import { PaymentStatusEnum } from '@/types/paymentType';

interface SectionPaymentProps {
  booking: DetailBooking;
}

export default function SectionPayment({ booking }: SectionPaymentProps) {
  if (!booking.payments || booking.payments.length === 0) return null;

  const firstPaymentStatus = booking.payments[0].status;
  if (firstPaymentStatus !== PaymentStatusEnum.PENDING) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Payment Information</h2>
      </div>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-4">
            {booking.payments.map((payment, index) => (
              <div key={payment.id} className="space-y-2">
                {index > 0 && <hr className="my-4" />}
                <div>
                  <p className="text-sm text-gray-500">Payment Reference</p>
                  <p className="font-medium text-base md:text-lg">{payment.reference_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    payment.status === PaymentStatusEnum.COMPLETED
                      ? 'bg-green-100 text-green-800'
                      : payment.status === PaymentStatusEnum.FAILED
                      ? 'bg-red-100 text-red-800'
                      : payment.status === PaymentStatusEnum.PENDING
                      ? 'bg-yellow-100 text-yellow-800'
                      : payment.status === PaymentStatusEnum.REFUNDED
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {payment.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium text-base md:text-lg">${payment.amount.toFixed(2)}</p>
                </div>
                {payment.checkout_url && (
                  <div className="mt-2">
                    <a
                      href={payment.checkout_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm inline-flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Go to Payment Page
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
