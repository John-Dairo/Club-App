import AppHeader from "./AppHeader";
import MobileNav from "./MobileNav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppHeader />
      <div className="pt-12">
        {children}
      </div>
      <MobileNav />
    </>
  );
}
