import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/theme/mode-toggle";

export default function Navbar() {
  return (
    <header className="w-full bg-background border-b border-border shadow-sm z-20 sticky top-0">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Media Mapper Logo"
              width={28}
              height={28}
              className="dark:invert text-primary"
            />
            <span className="text-xl font-medium">Media Mapper</span>
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/about"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
