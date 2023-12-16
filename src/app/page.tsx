import Bag from '@/components/Bag';

export default async function Home() {
  let products = [];

  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${apiBaseUrl}/api/products`);

    if (!response.ok) {
      // Log and handle non-OK responses
      console.error('Server error:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    products = data.products;
  } catch (error) {
    // Log and handle errors in fetching or parsing the response
    console.error('Fetch error:', error);
    // You might want to set some state here to show an error message in the UI
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          {'Click on the bag icon ;)'}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Bag products={products} />
        </div>
      </div>
    </main>
  );
}
