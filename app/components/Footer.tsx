function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 h-[50px] w-full bg-[#1c1917]">
      <hr className="border border-gray-500 w-full" style={{ borderWidth: '0.1px' }} />
      <span className="text-center text-sm text-gray-500">
        © 2025 TaskManager. Все права защищены.
      </span>
    </footer>
  );
}

export default Footer;
