"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ClipboardList,
  Search,
  Filter,
  FileInput,
  MoreHorizontal,
  X,
  Eye,
  Pencil,
  Trash2,
  Copy,
  FileSpreadsheet,
  FileText,
  Database,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";
import { deals } from "@/mock-data/deals";

const stages = ["Negotiation", "Proposal Sent", "Qualified", "Discovery"];
const owners = ["Alex Ray", "Mina Swan", "John Kim", "Sarah Lee"];
const valueRanges = [
  { label: "All Values", value: "all" },
  { label: "< $10,000", value: "under10k" },
  { label: "$10,000 - $20,000", value: "10k-20k" },
  { label: "> $20,000", value: "over20k" },
];

const PAGE_SIZE_OPTIONS = [10, 20, 30, 50];

export function DealsTable() {
  const searchQuery = useDashboardStore((state) => state.searchQuery);
  const stageFilter = useDashboardStore((state) => state.stageFilter);
  const ownerFilter = useDashboardStore((state) => state.ownerFilter);
  const valueFilter = useDashboardStore((state) => state.valueFilter);
  const setSearchQuery = useDashboardStore((state) => state.setSearchQuery);
  const setStageFilter = useDashboardStore((state) => state.setStageFilter);
  const setOwnerFilter = useDashboardStore((state) => state.setOwnerFilter);
  const setValueFilter = useDashboardStore((state) => state.setValueFilter);
  const clearFilters = useDashboardStore((state) => state.clearFilters);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const hasActiveFilters =
    stageFilter !== "all" || ownerFilter !== "all" || valueFilter !== "all";

  const filteredDeals = React.useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch =
        deal.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.owner.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStage =
        stageFilter === "all" || deal.stage === stageFilter;

      const matchesOwner =
        ownerFilter === "all" || deal.owner === ownerFilter;

      let matchesValue = true;
      if (valueFilter === "under10k") {
        matchesValue = deal.value < 10000;
      } else if (valueFilter === "10k-20k") {
        matchesValue = deal.value >= 10000 && deal.value <= 20000;
      } else if (valueFilter === "over20k") {
        matchesValue = deal.value > 20000;
      }

      return matchesSearch && matchesStage && matchesOwner && matchesValue;
    });
  }, [searchQuery, stageFilter, ownerFilter, valueFilter]);

  const totalPages = Math.ceil(filteredDeals.length / pageSize);

  const paginatedDeals = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredDeals.slice(startIndex, endIndex);
  }, [filteredDeals, currentPage, pageSize]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, stageFilter, ownerFilter, valueFilter, pageSize]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:px-6 sm:py-3.5">
        <div className="flex items-center gap-2 sm:gap-2.5 flex-1">
          <Button variant="outline" size="icon" className="size-7 sm:size-8 shrink-0">
            <ClipboardList className="size-4 sm:size-[18px] text-muted-foreground" />
          </Button>
          <span className="text-sm sm:text-base font-medium">Active Deals</span>
          <Badge variant="secondary" className="ml-1 text-[10px] sm:text-xs">
            {filteredDeals.length}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 sm:size-5 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-10 w-full sm:w-[160px] lg:w-[200px] h-8 sm:h-9 text-sm"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`h-8 sm:h-9 gap-1.5 sm:gap-2 ${hasActiveFilters ? "border-primary" : ""}`}
              >
                <Filter className="size-3.5 sm:size-4" />
                <span className="hidden sm:inline">Filter</span>
                {hasActiveFilters && (
                  <span className="size-1.5 sm:size-2 rounded-full bg-primary" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]">
              <DropdownMenuLabel>Filter by Stage</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={stageFilter === "all"}
                onCheckedChange={() => setStageFilter("all")}
              >
                All Stages
              </DropdownMenuCheckboxItem>
              {stages.map((stage) => (
                <DropdownMenuCheckboxItem
                  key={stage}
                  checked={stageFilter === stage}
                  onCheckedChange={() => setStageFilter(stage)}
                >
                  {stage}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Filter by Owner</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={ownerFilter === "all"}
                onCheckedChange={() => setOwnerFilter("all")}
              >
                All Owners
              </DropdownMenuCheckboxItem>
              {owners.map((owner) => (
                <DropdownMenuCheckboxItem
                  key={owner}
                  checked={ownerFilter === owner}
                  onCheckedChange={() => setOwnerFilter(owner)}
                >
                  {owner}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Filter by Value</DropdownMenuLabel>
              {valueRanges.map((range) => (
                <DropdownMenuCheckboxItem
                  key={range.value}
                  checked={valueFilter === range.value}
                  onCheckedChange={() => setValueFilter(range.value)}
                >
                  {range.label}
                </DropdownMenuCheckboxItem>
              ))}

              {hasActiveFilters && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={clearFilters}
                    className="text-destructive"
                  >
                    <X className="size-4 mr-2" />
                    Clear all filters
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden sm:block w-px h-[22px] bg-border" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 sm:h-9 gap-1.5 sm:gap-2">
                <FileInput className="size-3.5 sm:size-4" />
                <span className="hidden sm:inline">Import</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileSpreadsheet className="size-4 mr-2" />
                Import from CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="size-4 mr-2" />
                Import from Excel
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Database className="size-4 mr-2" />
                Import from CRM
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 px-3 sm:px-6 pb-3">
          <span className="text-[10px] sm:text-xs text-muted-foreground">Filters:</span>
          {stageFilter !== "all" && (
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer text-[10px] sm:text-xs h-5 sm:h-6"
              onClick={() => setStageFilter("all")}
            >
              {stageFilter}
              <X className="size-2.5 sm:size-3" />
            </Badge>
          )}
          {ownerFilter !== "all" && (
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer text-[10px] sm:text-xs h-5 sm:h-6"
              onClick={() => setOwnerFilter("all")}
            >
              {ownerFilter}
              <X className="size-2.5 sm:size-3" />
            </Badge>
          )}
          {valueFilter !== "all" && (
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer text-[10px] sm:text-xs h-5 sm:h-6"
              onClick={() => setValueFilter("all")}
            >
              {valueRanges.find((r) => r.value === valueFilter)?.label}
              <X className="size-2.5 sm:size-3" />
            </Badge>
          )}
        </div>
      )}

      <div className="px-3 sm:px-6 pb-3 sm:pb-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[40px] font-medium text-muted-foreground text-xs sm:text-sm">
                #
              </TableHead>
              <TableHead className="min-w-[180px] font-medium text-muted-foreground text-xs sm:text-sm">
                Deal Name
              </TableHead>
              <TableHead className="hidden md:table-cell min-w-[140px] font-medium text-muted-foreground text-xs sm:text-sm">
                Client
              </TableHead>
              <TableHead className="min-w-[100px] font-medium text-muted-foreground text-xs sm:text-sm">
                Stage
              </TableHead>
              <TableHead className="min-w-[90px] font-medium text-muted-foreground text-xs sm:text-sm">
                Value
              </TableHead>
              <TableHead className="hidden lg:table-cell min-w-[150px] font-medium text-muted-foreground text-xs sm:text-sm">
                Owner
              </TableHead>
              <TableHead className="hidden sm:table-cell font-medium text-muted-foreground text-xs sm:text-sm">
                Expected Close
              </TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDeals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground text-sm"
                >
                  No deals found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              paginatedDeals.map((deal, index) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium text-xs sm:text-sm">
                    {(currentPage - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div
                        className={`flex items-center justify-center size-5 sm:size-[26px] rounded-md sm:rounded-lg text-white text-[10px] sm:text-sm font-extrabold shrink-0 ${deal.dealColor}`}
                      >
                        {deal.dealInitial}
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-xs sm:text-sm block truncate">{deal.dealName}</span>
                        <span className="text-[10px] text-muted-foreground md:hidden">{deal.client}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs sm:text-sm">
                    {deal.client}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-muted/80 text-muted-foreground font-medium text-[10px] sm:text-xs"
                    >
                      {deal.stage}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs sm:text-sm tabular-nums">
                    ${deal.value.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-5 sm:size-6 bg-muted">
                        <AvatarFallback className="text-[8px] sm:text-[10px] font-extrabold text-muted-foreground uppercase">
                          {deal.ownerInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground text-xs sm:text-sm">{deal.owner}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-xs sm:text-sm">
                    {deal.expectedClose}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 sm:size-8 text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="size-3.5 sm:size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="size-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="size-4 mr-2" />
                          Edit Deal
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="size-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-6 py-3 border-t">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <span className="hidden sm:inline">Rows per page:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground">
            {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredDeals.length)} of {filteredDeals.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>
          
          <div className="flex items-center gap-1 mx-1">
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
                  onClick={() => goToPage(pageNum)}
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
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
