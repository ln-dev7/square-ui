"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
  Invoice01Icon,
  Search01Icon,
  Settings01Icon,
  MoreHorizontalIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { leads } from "@/mock-data/leads";
import { useLeadsStore, LeadStatus, LeadSource } from "@/store/leads-store";

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: {
    label: "New Leads",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  },
  contacted: {
    label: "Contacted",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  },
  qualified: {
    label: "Qualified",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  },
  negotiation: {
    label: "Negotiation",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  },
  inactive: {
    label: "Inactive",
    className:
      "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-400 border-gray-200 dark:border-gray-800",
  },
  recycled: {
    label: "Recycled",
    className:
      "bg-pink-100 text-pink-800 dark:bg-pink-950/30 dark:text-pink-400 border-pink-200 dark:border-pink-800",
  },
};

const sourceConfig: Record<LeadSource, string> = {
  website: "Website",
  paid_ads: "Paid Ads",
  referral: "Referral",
  social: "Social",
  email: "Email",
};

export function LeadsTable() {
  const {
    searchQuery,
    statusFilter,
    sourceFilter,
    ownerFilter,
    currentPage,
    itemsPerPage,
    setSearchQuery,
    setStatusFilter,
    setSourceFilter,
    setOwnerFilter,
    setCurrentPage,
    setItemsPerPage,
    clearFilters,
  } = useLeadsStore();

  const owners = useMemo(() => {
    return [...new Set(leads.map((lead) => lead.owner))];
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        searchQuery === "" ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.leadId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;
      const matchesSource =
        sourceFilter === "all" || lead.source === sourceFilter;
      const matchesOwner = ownerFilter === "all" || lead.owner === ownerFilter;

      return matchesSearch && matchesStatus && matchesSource && matchesOwner;
    });
  }, [searchQuery, statusFilter, sourceFilter, ownerFilter]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const hasActiveFilters =
    searchQuery !== "" ||
    statusFilter !== "all" ||
    sourceFilter !== "all" ||
    ownerFilter !== "all";

  return (
    <div className="bg-card text-card-foreground rounded-xl border">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between py-3 sm:py-5 px-3 sm:px-5">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="size-8">
            <HugeiconsIcon
              icon={Invoice01Icon}
              className="size-4 text-muted-foreground"
            />
          </Button>
          <h3 className="font-medium text-sm sm:text-base">Leads List</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
            />
            <Input
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 w-full sm:w-[180px]"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" className="h-9 gap-2">
                  <HugeiconsIcon icon={Settings01Icon} className="size-4" />
                  <span>Filter</span>
                  {hasActiveFilters && (
                    <Badge
                      variant="secondary"
                      className="size-5 p-0 justify-center"
                    >
                      !
                    </Badge>
                  )}
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Status
                </p>
                <Select
                  value={statusFilter}
                  onValueChange={(value) =>
                    setStatusFilter(value as LeadStatus | "all")
                  }
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {Object.entries(statusConfig).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="px-2 py-1.5">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Source
                </p>
                <Select
                  value={sourceFilter}
                  onValueChange={(value) =>
                    setSourceFilter(value as LeadSource | "all")
                  }
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {Object.entries(sourceConfig).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="px-2 py-1.5">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Owner
                </p>
                <Select
                  value={ownerFilter}
                  onValueChange={(value) => value && setOwnerFilter(value)}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="All Owners" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Owners</SelectItem>
                    {owners.map((owner) => (
                      <SelectItem key={owner} value={owner}>
                        {owner}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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

          <Button variant="outline" className="h-9 gap-2">
            <HugeiconsIcon icon={Invoice01Icon} className="size-4" />
            <span className="hidden sm:inline">Import</span>
          </Button>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[120px]">
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <span>Leads ID</span>
                  </div>
                </TableHead>
                <TableHead className="min-w-[160px]">Lead Name</TableHead>
                <TableHead className="min-w-[180px] hidden md:table-cell">
                  Email
                </TableHead>
                <TableHead className="w-[110px]">Status</TableHead>
                <TableHead className="w-[100px] hidden lg:table-cell">
                  Source
                </TableHead>
                <TableHead className="w-[140px] hidden xl:table-cell">
                  Owner
                </TableHead>
                <TableHead className="w-[130px]">Created On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Checkbox />
                      <span className="font-medium text-sm">{lead.leadId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage src={lead.avatar} />
                        <AvatarFallback className="text-xs">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{lead.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {lead.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium ${
                        statusConfig[lead.status].className
                      }`}
                    >
                      {statusConfig[lead.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {sourceConfig[lead.source]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">
                          {lead.ownerInitials}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {lead.owner}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {lead.createdAt}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7"
                            >
                              <HugeiconsIcon
                                icon={MoreHorizontalIcon}
                                className="size-4 text-muted-foreground"
                              />
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete Lead
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Showing {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredLeads.length)} of{" "}
              {filteredLeads.length}
            </span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>per page</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-4 rotate-180"
              />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  className="size-8"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            {totalPages > 5 && (
              <>
                <span className="px-1 text-muted-foreground">...</span>
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="icon"
                  className="size-8"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
