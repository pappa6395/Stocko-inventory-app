"use client";

import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { sidebarLinks } from "@/config/sidebar";
import Logo from "../global/Logo";
import { Session } from "next-auth";
import { filterLinks } from "@/lib/filterLinks";
export default function Sidebar({ session }: { session: Session | null }) {
  const filteredLinks = filterLinks(sidebarLinks, session?.user ?? null);
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link href='/dashboard'>
            <Logo labelShown={false} />
        </Link>
        {filteredLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <TooltipProvider key={i}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href ?? "#"}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>
    </aside>
  );
}
