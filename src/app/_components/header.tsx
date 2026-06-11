import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-12 mt-8 flex items-center">
      <Link href="/" className="hover:underline">
        波比事务所
      </Link>
    </h2>
  );
};

export default Header;
