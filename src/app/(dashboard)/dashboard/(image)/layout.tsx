import Link from "next/link";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function ImageLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <nav className="mb-8 flex gap-3">
        <Link href="/dashboard/image">Bilder</Link>
        <Link href="/dashboard/image/upload">Last opp bilde</Link>
      </nav>
      {children}
    </>
  );
}
