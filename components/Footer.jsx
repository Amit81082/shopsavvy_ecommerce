export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 p-4 text-center fixed bottom-0 left-0 right-0">
      <p>&copy; {currentYear} ShopSavvy. All rights reserved.</p>
    </footer>
  );

}
