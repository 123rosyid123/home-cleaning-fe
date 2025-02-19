import { Metadata } from 'next';
import AddressContent from './AddressContent';

export const metadata: Metadata = {
  title: 'Addresses - Home Cleaning',
  description: 'Manage your delivery addresses',
};

export default function AddressPage() {
  return <AddressContent />;
}
