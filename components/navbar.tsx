"use client";

import {
  PiHouse,
  PiHouseFill,
  PiFilmStrip,
  PiFilmStripFill,
  PiTelevision,
  PiTelevisionFill,
  PiMagnifyingGlass,
  PiMagnifyingGlassFill,
} from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const LINKS = [
    {
      name: "Home",
      href: "/",
      icon: <PiHouse className="w-6 h-6" />,
      iconActive: <PiHouseFill className="w-6 h-6 text-blue-500" />,
    },
    {
      name: "Movies",
      href: "/movie",
      icon: <PiFilmStrip className="w-6 h-6" />,
      iconActive: <PiFilmStripFill className="w-6 h-6 text-blue-500" />,
    },
    {
      name: "TV Shows",
      href: "/tv",
      icon: <PiTelevision className="w-6 h-6" />,
      iconActive: <PiTelevisionFill className="w-6 h-6 text-blue-500" />,
    },
    {
      name: "Search",
      href: "/search",
      icon: <PiMagnifyingGlass className="w-6 h-6" />,
      iconActive: <PiMagnifyingGlassFill className="w-6 h-6 text-blue-500" />,
    },
  ];

  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-evenly h-full lg:flex-col lg:justify-start">
      {LINKS.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="h-full w-full inline-flex items-center justify-center lg:h-24"
        >
          <span className="sr-only">{link.name}</span>
          {pathname === link.href ? link.iconActive : link.icon}
        </Link>
      ))}
    </nav>
  );
}
