import { Nav, NavLink } from "@/components/Nav";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-2">
    <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
    </Nav>
    <div className="container my-6">{children}</div>
  </div>;
}
