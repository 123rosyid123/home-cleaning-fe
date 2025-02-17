import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Professional Home Cleaning</h1>
            <p className="mb-5">Get your home sparkling clean with our professional cleaning service. Book now and experience the difference!</p>
            <Link href="/booking" className="btn btn-primary">Book Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}