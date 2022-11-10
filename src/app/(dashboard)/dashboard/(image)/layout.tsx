interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function ImageLayout({ children }: DashboardLayoutProps) {
  return <div>Image layout{children}</div>;
}
