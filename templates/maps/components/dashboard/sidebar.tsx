"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MapPin,
  Heart,
  Clock,
  Settings,
  ChevronsUpDown,
  LogOut,
  Utensils,
  Coffee,
  Wine,
  Trees,
  Landmark,
  ShoppingBag,
  Bed,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMapsStore } from "@/store/maps-store";
import { categories } from "@/mock-data/locations";

const navItems = [
  { id: "all", title: "All Locations", icon: MapPin, href: "/" },
  { id: "favorites", title: "Favorites", icon: Heart, href: "/favorites" },
  { id: "recents", title: "Recents", icon: Clock, href: "/recents" },
];

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  utensils: Utensils,
  coffee: Coffee,
  wine: Wine,
  trees: Trees,
  landmark: Landmark,
  "shopping-bag": ShoppingBag,
  bed: Bed,
  dumbbell: Dumbbell,
};

export function LocationsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const {
    locations,
    selectedCategory,
    setSelectedCategory,
    getRecentLocations,
  } = useMapsStore();

  const favoriteCount = locations.filter((l) => l.isFavorite).length;
  const recentCount = getRecentLocations().length;

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return locations.length;
    return locations.filter((l) => l.categoryId === categoryId).length;
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-2.5 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 w-full hover:bg-sidebar-accent rounded-md p-1 -m-1 transition-colors shrink-0">
              <div className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background shrink-0">
                <MapPin className="size-4" />
              </div>
              <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium">Square UI - Maps</span>
                <ChevronsUpDown className="size-3 text-muted-foreground" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <Settings className="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent className="px-2.5">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                let badge: number | undefined;
                if (item.id === "favorites") badge = favoriteCount;
                if (item.id === "recents") badge = recentCount;
                if (item.id === "all") badge = locations.length;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-8"
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {badge !== undefined && badge > 0 && (
                      <SidebarMenuBadge>{badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0 mt-4">
          <SidebarGroupLabel className="px-0 h-6">
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Categories
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={selectedCategory === "all"}
                  onClick={() => setSelectedCategory("all")}
                  className="h-7"
                >
                  <MapPin className="size-3.5" />
                  <span className="text-sm">All</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>{getCategoryCount("all")}</SidebarMenuBadge>
              </SidebarMenuItem>
              {categories.map((category) => {
                const Icon = iconMap[category.icon] || MapPin;
                const count = getCategoryCount(category.id);

                return (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton
                      isActive={selectedCategory === category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="h-7"
                    >
                      <Icon
                        className="size-3.5"
                        style={{ color: category.color }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </SidebarMenuButton>
                    {count > 0 && <SidebarMenuBadge>{count}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2.5 pb-3">
        <div className="group-data-[collapsible=icon]:hidden space-y-3">
          <p className="text-center text-[11px] text-muted-foreground">
            Map powered by{" "}
            <Link
              href="https://mapcn.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              mapcn
            </Link>{" "}
            by{" "}
            <Link
              href="https://x.com/sainianmol16"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              @sainianmol16
            </Link>
          </p>
          <p className="text-center text-[11px] text-muted-foreground">
            Map powered by{" "}
            <Link
              href="https://mapcn.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              mapcn
            </Link>{" "}
            by{" "}
            <Link
              href="https://x.com/sainianmol16"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              @sainianmol16
            </Link>
          </p>
          <div className="group/sidebar relative flex flex-col gap-2 rounded-lg border p-4 text-sm w-full bg-background">
            <div className="text-balance text-lg font-semibold leading-tight group-hover/sidebar:underline">
              Open-source layouts by lndev-ui
            </div>
            <div className="text-muted-foreground text-xs">
              Collection of beautifully crafted open-source layouts UI built
              with shadcn/ui.
            </div>
            <Link
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0"
              href="https://square.lndev.me"
            >
              <span className="sr-only">Square by lndev-ui</span>
            </Link>
            <Button size="sm" className="w-full" asChild>
              <Link
                href="https://square.lndev.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                square.lndev.me
              </Link>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
