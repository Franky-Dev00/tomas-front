import { Link } from "react-router"
import { CartModal } from "./cart-modal"
import UserMenu from "./login-dropdow"

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img className="w-15 h-15" src="https://t6lun8rso7.ufs.sh/f/c9j148Rt2n3CZwi2mKBpwEBVfqjpL401tCYQhKcnTUHX6NAG" alt="icono" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Venganza de Samael
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <UserMenu />
          <CartModal />
        </div>
      </div>
    </nav>
  )
}
