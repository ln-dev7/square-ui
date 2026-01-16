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
import { Slider } from "@/components/ui/slider";
import {
  Home,
  Heart,
  Search,
  Settings,
  ChevronsUpDown,
  LogOut,
  Filter,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRentalsStore } from "@/store/rentals-store";
import { propertyTypeLabels, type PropertyType } from "@/mock-data/listings";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "all", title: "All Properties", icon: Home, href: "/" },
  { id: "favorites", title: "Favorites", icon: Heart, href: "/favorites" },
];

const propertyTypes: PropertyType[] = [
  "apartment",
  "house",
  "villa",
  "studio",
  "loft",
  "cottage",
];

export function RentalsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const {
    listings,
    searchQuery,
    setSearchQuery,
    selectedPropertyTypes,
    togglePropertyType,
    priceRange,
    setPriceRange,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    getFilteredListings,
    getFavoriteListings,
    resetFilters,
  } = useRentalsStore();

  const favoriteCount = listings.filter((l) => l.isFavorite).length;
  const allCount = listings.length;
  const filteredCount = getFilteredListings().length;

  const activeFiltersCount =
    selectedPropertyTypes.length +
    (priceRange[0] !== 0 || priceRange[1] !== 500 ? 1 : 0) +
    (bedrooms !== null ? 1 : 0) +
    (bathrooms !== null ? 1 : 0);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-2.5 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 w-full hover:bg-sidebar-accent rounded-md p-1 -m-1 transition-colors shrink-0">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                <Home className="size-4" />
              </div>
              <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium">Square UI - Rentals</span>
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
                if (item.id === "all") badge = allCount;

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
              Search
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 pb-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 pl-7 text-sm"
                />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0 mt-4">
          <SidebarGroupLabel className="px-0 h-6 flex items-center justify-between">
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Filters
            </span>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-1.5 text-[10px]"
                onClick={resetFilters}
              >
                Clear
              </Button>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-4">
              <div>
                <p className="text-xs font-medium mb-2 text-sidebar-foreground">
                  Property type
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {propertyTypes.map((type) => (
                    <Button
                      key={type}
                      variant={
                        selectedPropertyTypes.includes(type)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => togglePropertyType(type)}
                      className={cn(
                        "h-7 text-xs px-2",
                        selectedPropertyTypes.includes(type) &&
                          "bg-primary text-primary-foreground"
                      )}
                    >
                      {propertyTypeLabels[type]}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium mb-2 text-sidebar-foreground">
                  Price range
                </p>
                <div className="space-y-2">
                  <div className="px-2">
                    <Slider
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={(value) =>
                        setPriceRange([value[0], value[1]])
                      }
                      min={0}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        ${priceRange[0]}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ${priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium mb-2 text-sidebar-foreground">
                  Rooms
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-sidebar-foreground">
                      Bedrooms
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          setBedrooms(
                            bedrooms !== null && bedrooms > 0
                              ? bedrooms - 1
                              : null
                          )
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-xs">
                        {bedrooms ?? "Any"}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setBedrooms((bedrooms ?? 0) + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-sidebar-foreground">
                      Bathrooms
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          setBathrooms(
                            bathrooms !== null && bathrooms > 0
                              ? bathrooms - 1
                              : null
                          )
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-xs">
                        {bathrooms ?? "Any"}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setBathrooms((bathrooms ?? 0) + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
