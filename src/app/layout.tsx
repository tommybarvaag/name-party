import { Toaster } from "@/components/ui/toast";
import "@/styles/globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
