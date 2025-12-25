"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  SlidersHorizontalIcon,
  ArrowUpDownIcon,
  Upload01Icon,
  PieChartIcon,
  SnowIcon,
  FireIcon,
  Tick01Icon,
  Cancel01Icon,
  UserIcon,
  Mail01Icon,
  HandPointingRight01Icon,
  Activity01Icon,
  Globe02Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Linkedin01Icon,
  CallIcon,
  UserMultiple02Icon,
  Target01Icon,
  FlashIcon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { leads, LeadType, LeadStatus, LeadSource } from "@/mock-data/dashboard";
import { useDashboardStore } from "@/store/dashboard-store";
import { cn } from "@/lib/utils";

type SortField = "name" | "email" | "followUp" | "status" | "score";
type SortOrder = "asc" | "desc";

function getSortIcon(
  sortField: SortField,
  sortOrder: SortOrder,
  field: SortField
) {
  if (sortField !== field)
    return <HugeiconsIcon icon={ArrowUpDownIcon} className="size-3" />;
  return sortOrder === "asc" ? (
    <HugeiconsIcon icon={ArrowUp01Icon} className="size-3" />
  ) : (
    <HugeiconsIcon icon={ArrowDown01Icon} className="size-3" />
  );
}

function TypeBadge({ type }: { type: LeadType }) {
  if (type === "cold") {
    return (
      <div
        className="flex items-center gap-1 px-2 py-1 rounded-lg border border-cyan-500/40 w-fit"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0.06) 30%, rgba(6, 182, 212, 0) 100%), linear-gradient(90deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)",
        }}
      >
        <HugeiconsIcon icon={SnowIcon} className="size-3.5 text-cyan-400" />
        <span className="text-sm font-medium text-cyan-400">Cold</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 px-2 py-1 rounded-lg border border-pink-500/40 w-fit"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.06) 30%, rgba(236, 72, 153, 0) 100%), linear-gradient(90deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)",
      }}
    >
      <HugeiconsIcon icon={FireIcon} className="size-3.5 text-pink-400" />
      <span className="text-sm font-medium text-pink-400">Warm</span>
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  if (status === "closed") {
    return (
      <div
        className="flex items-center gap-1 px-2 py-1 rounded-lg border border-emerald-500/40 w-fit"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.06) 30%, rgba(16, 185, 129, 0) 100%), linear-gradient(90deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)",
        }}
      >
        <HugeiconsIcon icon={Tick01Icon} className="size-3.5 text-emerald-400" />
        <span className="text-sm font-medium text-emerald-400">Closed</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 px-2 py-1 rounded-lg border border-amber-500/40 w-fit"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.06) 30%, rgba(245, 158, 11, 0) 100%), linear-gradient(90deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)",
      }}
    >
      <HugeiconsIcon icon={Cancel01Icon} className="size-3.5 text-amber-400" />
      <span className="text-sm font-medium text-amber-400">Lost</span>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const getScoreStyle = () => {
    if (score >= 80)
      return { barClass: "bg-emerald-500", textClass: "text-emerald-400" };
    if (score >= 50)
      return { barClass: "bg-cyan-500", textClass: "text-cyan-400" };
    return { barClass: "bg-amber-500", textClass: "text-amber-400" };
  };

  const { barClass, textClass } = getScoreStyle();

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-12 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-all",
            barClass
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn("text-xs font-semibold min-w-[28px]", textClass)}>
        {score}
      </span>
    </div>
  );
}

function SourceBadge({ source }: { source: LeadSource }) {
  const sourceConfig: Record<
    LeadSource,
    { icon: typeof Linkedin01Icon; label: string; bgClass: string; textClass: string }
  > = {
    linkedin: {
      icon: Linkedin01Icon,
      label: "LinkedIn",
      bgClass: "bg-blue-500/10",
      textClass: "text-blue-400",
    },
    google: {
      icon: Search01Icon,
      label: "Google",
      bgClass: "bg-red-500/10",
      textClass: "text-red-400",
    },
    referral: {
      icon: UserMultiple02Icon,
      label: "Referral",
      bgClass: "bg-violet-500/10",
      textClass: "text-violet-400",
    },
    website: {
      icon: Globe02Icon,
      label: "Website",
      bgClass: "bg-cyan-500/10",
      textClass: "text-cyan-400",
    },
    "cold-call": {
      icon: CallIcon,
      label: "Cold Call",
      bgClass: "bg-orange-500/10",
      textClass: "text-orange-400",
    },
  };

  const config = sourceConfig[source];

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-md w-fit",
        config.bgClass
      )}
    >
      <HugeiconsIcon icon={config.icon} className={cn("size-3", config.textClass)} />
      <span className={cn("text-xs font-medium", config.textClass)}>
        {config.label}
      </span>
    </div>
  );
}

export function LeadsTable() {
  const {
    searchQuery,
    typeFilter,
    statusFilter,
    sourceFilter,
    setSearchQuery,
    setTypeFilter,
    setStatusFilter,
    setSourceFilter,
    clearFilters,
  } = useDashboardStore();

  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredAndSortedLeads = useMemo(() => {
    const result = leads.filter((lead) => {
      const matchesSearch =
        searchQuery === "" ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === "all" || lead.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;
      const matchesSource =
        sourceFilter === "all" || lead.source === sourceFilter;

      return matchesSearch && matchesType && matchesStatus && matchesSource;
    });

    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "email":
          comparison = a.email.localeCompare(b.email);
          break;
        case "followUp":
          comparison = a.followUp.localeCompare(b.followUp);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "score":
          comparison = a.score - b.score;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [
    searchQuery,
    typeFilter,
    statusFilter,
    sourceFilter,
    sortField,
    sortOrder,
  ]);

  const totalPages = Math.ceil(filteredAndSortedLeads.length / itemsPerPage);
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedLeads.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedLeads, currentPage, itemsPerPage]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const toggleSelectAll = () => {
    if (selectedLeads.length === paginatedLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(paginatedLeads.map((lead) => lead.id));
    }
  };

  const toggleSelectLead = (id: string) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    typeFilter !== "all" ||
    statusFilter !== "all" ||
    sourceFilter !== "all";

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedLeads([]);
  };

  const handleItemsPerPageChange = (value: string | null) => {
    if (value) {
      setItemsPerPage(Number(value));
      setCurrentPage(1);
      setSelectedLeads([]);
    }
  };

  return (
    <div className="bg-card text-card-foreground rounded-xl border overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3.5 border-b">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-base">Lead Management</h3>
          <div className="h-5 w-px bg-border hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
              />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 w-[200px] text-sm bg-muted/50 border-border/50"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5 bg-muted/50 border-border/50"
                  >
                    <HugeiconsIcon icon={SlidersHorizontalIcon} className="size-3.5" />
                    <span>Filter</span>
                    {hasActiveFilters && (
                      <span className="size-1.5 rounded-full bg-primary" />
                    )}
                  </Button>
                }
              />
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuGroup>
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">
                      Type
                    </p>
                    <div className="space-y-1">
                      <DropdownMenuCheckboxItem
                        checked={typeFilter === "all"}
                        onCheckedChange={() => setTypeFilter("all")}
                      >
                        All Types
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={typeFilter === "cold"}
                        onCheckedChange={() => setTypeFilter("cold")}
                      >
                        <HugeiconsIcon icon={SnowIcon} className="size-3 mr-1.5 text-cyan-400" />
                        Cold
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={typeFilter === "warm"}
                        onCheckedChange={() => setTypeFilter("warm")}
                      >
                        <HugeiconsIcon icon={FireIcon} className="size-3 mr-1.5 text-pink-400" />
                        Warm
                      </DropdownMenuCheckboxItem>
                    </div>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">
                      Status
                    </p>
                    <div className="space-y-1">
                      <DropdownMenuCheckboxItem
                        checked={statusFilter === "all"}
                        onCheckedChange={() => setStatusFilter("all")}
                      >
                        All Status
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusFilter === "closed"}
                        onCheckedChange={() => setStatusFilter("closed")}
                      >
                        <HugeiconsIcon icon={Tick01Icon} className="size-3 mr-1.5 text-emerald-400" />
                        Closed
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusFilter === "lost"}
                        onCheckedChange={() => setStatusFilter("lost")}
                      >
                        <HugeiconsIcon icon={Cancel01Icon} className="size-3 mr-1.5 text-amber-400" />
                        Lost
                      </DropdownMenuCheckboxItem>
                    </div>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">
                      Source
                    </p>
                    <div className="space-y-1">
                      <DropdownMenuCheckboxItem
                        checked={sourceFilter === "all"}
                        onCheckedChange={() => setSourceFilter("all")}
                      >
                        All Sources
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={sourceFilter === "linkedin"}
                        onCheckedChange={() => setSourceFilter("linkedin")}
                      >
                        <HugeiconsIcon icon={Linkedin01Icon} className="size-3 mr-1.5 text-blue-400" />
                        LinkedIn
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={sourceFilter === "google"}
                        onCheckedChange={() => setSourceFilter("google")}
                      >
                        <HugeiconsIcon icon={Search01Icon} className="size-3 mr-1.5 text-red-400" />
                        Google
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={sourceFilter === "referral"}
                        onCheckedChange={() => setSourceFilter("referral")}
                      >
                        <HugeiconsIcon icon={UserMultiple02Icon} className="size-3 mr-1.5 text-violet-400" />
                        Referral
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={sourceFilter === "website"}
                        onCheckedChange={() => setSourceFilter("website")}
                      >
                        <HugeiconsIcon icon={Globe02Icon} className="size-3 mr-1.5 text-cyan-400" />
                        Website
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={sourceFilter === "cold-call"}
                        onCheckedChange={() => setSourceFilter("cold-call")}
                      >
                        <HugeiconsIcon icon={CallIcon} className="size-3 mr-1.5 text-orange-400" />
                        Cold Call
                      </DropdownMenuCheckboxItem>
                    </div>
                  </div>
                </DropdownMenuGroup>
                {hasActiveFilters && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clearFilters}>
                      Clear all filters
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5 bg-muted/50 border-border/50"
                  >
                    <HugeiconsIcon icon={ArrowUpDownIcon} className="size-3.5" />
                    <span>Sort</span>
                  </Button>
                }
              />
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => toggleSort("name")}>
                    Name{" "}
                    {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleSort("email")}>
                    Email{" "}
                    {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleSort("followUp")}>
                    Follow-up{" "}
                    {sortField === "followUp" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleSort("status")}>
                    Status{" "}
                    {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleSort("score")}>
                    Score{" "}
                    {sortField === "score" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 bg-muted/50 border-border/50"
                >
                  <HugeiconsIcon icon={Upload01Icon} className="size-3.5" />
                  <span className="hidden sm:inline">Export/Import</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Import from CSV</DropdownMenuItem>
                <DropdownMenuItem>Import from Excel</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 bg-muted/50 border-border/50"
                >
                  <HugeiconsIcon icon={PieChartIcon} className="size-3.5" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>View analytics</DropdownMenuItem>
                <DropdownMenuItem>Lead distribution</DropdownMenuItem>
                <DropdownMenuItem>Conversion rates</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Generate report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="sm:hidden flex flex-wrap items-center gap-2 px-4 py-3 border-b">
        <div className="relative flex-1">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
          />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 w-full text-sm bg-muted/50 border-border/50"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 bg-muted/50 border-border/50"
              >
                <HugeiconsIcon icon={SlidersHorizontalIcon} className="size-3.5" />
                {hasActiveFilters && (
                  <span className="size-1.5 rounded-full bg-primary" />
                )}
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <div className="px-2 py-1.5">
                <p className="text-xs font-medium text-muted-foreground mb-1.5">
                  Type
                </p>
                <div className="space-y-1">
                  <DropdownMenuCheckboxItem
                    checked={typeFilter === "all"}
                    onCheckedChange={() => setTypeFilter("all")}
                  >
                    All Types
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={typeFilter === "cold"}
                    onCheckedChange={() => setTypeFilter("cold")}
                  >
                    Cold
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={typeFilter === "warm"}
                    onCheckedChange={() => setTypeFilter("warm")}
                  >
                    Warm
                  </DropdownMenuCheckboxItem>
                </div>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div className="px-2 py-1.5">
                <p className="text-xs font-medium text-muted-foreground mb-1.5">
                  Status
                </p>
                <div className="space-y-1">
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === "all"}
                    onCheckedChange={() => setStatusFilter("all")}
                  >
                    All Status
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === "closed"}
                    onCheckedChange={() => setStatusFilter("closed")}
                  >
                    Closed
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === "lost"}
                    onCheckedChange={() => setStatusFilter("lost")}
                  >
                    Lost
                  </DropdownMenuCheckboxItem>
                </div>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div className="px-2 py-1.5">
                <p className="text-xs font-medium text-muted-foreground mb-1.5">
                  Source
                </p>
                <div className="space-y-1">
                  <DropdownMenuCheckboxItem
                    checked={sourceFilter === "all"}
                    onCheckedChange={() => setSourceFilter("all")}
                  >
                    All Sources
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sourceFilter === "linkedin"}
                    onCheckedChange={() => setSourceFilter("linkedin")}
                  >
                    LinkedIn
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sourceFilter === "google"}
                    onCheckedChange={() => setSourceFilter("google")}
                  >
                    Google
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sourceFilter === "referral"}
                    onCheckedChange={() => setSourceFilter("referral")}
                  >
                    Referral
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sourceFilter === "website"}
                    onCheckedChange={() => setSourceFilter("website")}
                  >
                    Website
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sourceFilter === "cold-call"}
                    onCheckedChange={() => setSourceFilter("cold-call")}
                  >
                    Cold Call
                  </DropdownMenuCheckboxItem>
                </div>
              </div>
            </DropdownMenuGroup>
            {hasActiveFilters && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearFilters}>
                  Clear all filters
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-muted/50 border-border/50"
              >
                <HugeiconsIcon icon={ArrowUpDownIcon} className="size-3.5" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => toggleSort("name")}>
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("email")}>
                Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("followUp")}>
                Follow-up
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("status")}>
                Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("score")}>
                Score
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/30">
              <TableHead className="w-[160px]">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={
                      selectedLeads.length === paginatedLeads.length &&
                      paginatedLeads.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                    className="border-border/50 bg-background/70"
                  />
                  <button
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                    onClick={() => toggleSort("name")}
                  >
                    <span>Name</span>
                    {getSortIcon(sortField, sortOrder, "name")}
                  </button>
                </div>
              </TableHead>
              <TableHead className="w-[85px]">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <HugeiconsIcon icon={UserIcon} className="size-3.5" />
                  <span>Type</span>
                </div>
              </TableHead>
              <TableHead className="w-[180px]">
                <button
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                  onClick={() => toggleSort("email")}
                >
                  <HugeiconsIcon icon={Mail01Icon} className="size-3.5" />
                  <span>Email</span>
                  {getSortIcon(sortField, sortOrder, "email")}
                </button>
              </TableHead>
              <TableHead className="w-[95px]">
                <button
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                  onClick={() => toggleSort("followUp")}
                >
                  <HugeiconsIcon icon={HandPointingRight01Icon} className="size-3.5" />
                  <span>Follow-up</span>
                  {getSortIcon(sortField, sortOrder, "followUp")}
                </button>
              </TableHead>
              <TableHead className="w-[90px]">
                <button
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                  onClick={() => toggleSort("status")}
                >
                  <HugeiconsIcon icon={Activity01Icon} className="size-3.5" />
                  <span>Status</span>
                  {getSortIcon(sortField, sortOrder, "status")}
                </button>
              </TableHead>
              <TableHead className="w-[85px]">
                <button
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                  onClick={() => toggleSort("score")}
                >
                  <HugeiconsIcon icon={FlashIcon} className="size-3.5" />
                  <span>Score</span>
                  {getSortIcon(sortField, sortOrder, "score")}
                </button>
              </TableHead>
              <TableHead className="w-[95px]">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <HugeiconsIcon icon={Target01Icon} className="size-3.5" />
                  <span>Source</span>
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <HugeiconsIcon icon={Globe02Icon} className="size-3.5" />
                  <span>Website</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads.map((lead) => (
              <TableRow key={lead.id} className="border-border/50">
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={() => toggleSelectLead(lead.id)}
                      className="border-border/50 bg-background/70"
                    />
                    <Avatar className="size-6">
                      <AvatarImage src={lead.avatar} />
                      <AvatarFallback className="text-xs">
                        {lead.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{lead.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <TypeBadge type={lead.type} />
                </TableCell>
                <TableCell className="max-w-[180px]">
                  <span className="text-sm truncate block">{lead.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm whitespace-nowrap">
                    {lead.followUp}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={lead.status} />
                </TableCell>
                <TableCell>
                  <ScoreBadge score={lead.score} />
                </TableCell>
                <TableCell>
                  <SourceBadge source={lead.source} />
                </TableCell>
                <TableCell className="max-w-[120px]">
                  <span className="text-sm text-muted-foreground truncate block">
                    {lead.website || "-"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              filteredAndSortedLeads.length
            )}{" "}
            of {filteredAndSortedLeads.length} leads
          </span>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="h-8 w-[70px] bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="hidden sm:inline">per page</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <HugeiconsIcon icon={ArrowLeftDoubleIcon} className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          </Button>

          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  className="size-8"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <HugeiconsIcon icon={ArrowRightDoubleIcon} className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

