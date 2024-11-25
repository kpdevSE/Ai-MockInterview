"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderComponent() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-between w-[90%] mx-auto h-[100px] p-3">
      <Image src={"/logo.svg"} alt="logo" width={90} height={90} />
      <ul className="hidden md:flex items-center justify-center gap-3">
        <Link href={"/dashboard"}>
          <li
            className={`text-sky-600 font-semibold text-md cursor-pointer font-serif ${
              pathname == "/dashboard" && "text-sky-950"
            }`}
          >
            Dashboards
          </li>
        </Link>
        <Link href={"/dashboard/questions"}>
          <li
            className={`text-sky-600 font-semibold text-md cursor-pointer font-serif ${
              pathname == "/dashboard/questions" && "text-sky-950"
            }`}
          >
            Questions
          </li>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <li
            className={`text-sky-600 font-semibold text-md cursor-pointer font-serif ${
              pathname == "/dashboard/upgrade" && "text-sky-950"
            }`}
          >
            Upgrade
          </li>
        </Link>
        <Link href={"/dashboard/how"}>
          <li
            className={`text-sky-600 font-semibold text-md cursor-pointer font-serif ${
              pathname == "/dashboard/how" && "text-sky-950"
            }`}
          >
            How it Works
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  );
}
