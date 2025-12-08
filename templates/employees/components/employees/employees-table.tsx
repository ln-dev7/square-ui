"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Search,
  Calendar,
  ChevronDown,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  CircleDashed,
  XCircle,
  FileInput,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleDot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEmployeesStore, DateFilter } from "@/store/employees-store";
import { cn } from "@/lib/utils";
import type {
  Employee,
  EmployeeStatus,
  Department,
} from "@/mock-data/employees";

const dateFilterLabels: Record<DateFilter, string> = {
  all: "Joined Date",
  today: "Today",
  yesterday: "Yesterday",
  last7days: "Last 7 days",
  last30days: "Last 30 days",
};

const departments: Department[] = ["IT", "HR", "Engineering", "Marketing", "Sales"];

const statusConfig: Record<
  EmployeeStatus,
  { label: string; icon: React.ElementType; className: string; bgClass: string }
> = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    className: "text-emerald-600",
    bgClass:
      "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800",
  },
  on_leave: {
    label: "On Leave",
    icon: CircleDashed,
    className: "text-blue-600",
    bgClass:
      "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "text-amber-600",
    bgClass:
      "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
  },
  inactive: {
    label: "Inactive",
    icon: XCircle,
    className: "text-red-600",
    bgClass: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
  },
};

const departmentColors: Record<Department, string> = {
  IT: "bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300",
  HR: "bg-pink-100 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300",
  Engineering: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
  Marketing: "bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300",
  Sales: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300",
};

const jobTitleColors: Record<string, string> = {
  "Software Engineer": "bg-indigo-100 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300",
  "HR Manager": "bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300",
  "UX Designer": "bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300",
  "Marketing Lead": "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300",
  "Sales Executive": "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300",
  "Product Manager": "bg-cyan-100 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300",
  "Data Analyst": "bg-teal-100 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300",
  "DevOps Engineer": "bg-sky-100 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300",
};

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "empId",
    header: "User ID",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-muted-foreground">
        {row.getValue("empId")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <Avatar className="size-6">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback className="text-xs bg-muted">
              {employee.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{employee.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email Address",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("email")}
      </span>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    filterFn: (row, id, value) => {
      const dept = row.getValue(id) as Department;
      return value.includes(dept);
    },
    cell: ({ row }) => {
      const department = row.getValue("department") as Department;
      return (
        <span className={cn(
          "inline-flex px-2 py-0.5 text-xs font-medium rounded",
          departmentColors[department]
        )}>
          {department}
        </span>
      );
    },
  },
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    cell: ({ row }) => {
      const jobTitle = row.getValue("jobTitle") as string;
      return (
        <span className={cn(
          "inline-flex px-2 py-0.5 text-xs font-medium rounded",
          jobTitleColors[jobTitle] || "bg-muted text-muted-foreground"
        )}>
          {jobTitle}
        </span>
      );
    },
  },
  {
    accessorKey: "joinedDate",
    header: "Joined Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("joinedDate")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value) => {
      const status = row.getValue(id) as EmployeeStatus;
      return value.includes(status);
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as EmployeeStatus;
      const config = statusConfig[status];
      const Icon = config.icon;
      return (
        <div
          className={cn(
            "inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-xs font-medium",
            config.bgClass
          )}
        >
          <Icon className={cn("size-3.5", config.className)} />
          <span className={config.className}>{config.label}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(employee.empId)}
            >
              Copy Employee ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Edit Employee</DropdownMenuItem>
            <DropdownMenuItem>Send Email</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface EmployeesTableProps {
  showFilters?: boolean;
}

export function EmployeesTable({ showFilters = true }: EmployeesTableProps) {
  const searchQuery = useEmployeesStore((state) => state.searchQuery);
  const setSearchQuery = useEmployeesStore((state) => state.setSearchQuery);
  const statusFilter = useEmployeesStore((state) => state.statusFilter);
  const setStatusFilter = useEmployeesStore((state) => state.setStatusFilter);
  const dateFilter = useEmployeesStore((state) => state.dateFilter);
  const setDateFilter = useEmployeesStore((state) => state.setDateFilter);
  const departmentFilter = useEmployeesStore(
    (state) => state.departmentFilter
  );
  const setDepartmentFilter = useEmployeesStore(
    (state) => state.setDepartmentFilter
  );
  const clearAllFilters = useEmployeesStore((state) => state.clearAllFilters);
  const allEmployees = useEmployeesStore((state) => state.employees);

  const employees = React.useMemo(() => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    return allEmployees.filter((employee) => {
      const matchesSearch =
        searchQuery === "" ||
        employee.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || employee.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "all" || employee.department === departmentFilter;

      let matchesDate = true;
      if (dateFilter !== "all" && employee.joinedTimestamp) {
        const timestamp = employee.joinedTimestamp;
        const startOfToday = new Date().setHours(0, 0, 0, 0);
        const startOfYesterday = startOfToday - day;

        switch (dateFilter) {
          case "today":
            matchesDate = timestamp >= startOfToday;
            break;
          case "yesterday":
            matchesDate =
              timestamp >= startOfYesterday && timestamp < startOfToday;
            break;
          case "last7days":
            matchesDate = timestamp >= now - 7 * day;
            break;
          case "last30days":
            matchesDate = timestamp >= now - 30 * day;
            break;
        }
      }

      return (
        matchesSearch && matchesStatus && matchesDepartment && matchesDate
      );
    });
  }, [allEmployees, searchQuery, statusFilter, departmentFilter, dateFilter]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: employees,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="rounded-xl border border-border bg-card">
      {showFilters && (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-border p-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search Employee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 w-full md:w-[200px]"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <Calendar className="size-4" />
                  {dateFilterLabels[dateFilter]}
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {(Object.keys(dateFilterLabels) as DateFilter[]).map((key) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={dateFilter === key}
                    onCheckedChange={() => setDateFilter(key)}
                  >
                    {dateFilterLabels[key]}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <CircleDot className="size-4" />
                  {statusFilter === "all"
                    ? "All Status"
                    : statusConfig[statusFilter].label}
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "all"}
                  onCheckedChange={() => setStatusFilter("all")}
                >
                  All Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                {Object.entries(statusConfig).map(([key, config]) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={statusFilter === key}
                    onCheckedChange={() =>
                      setStatusFilter(key as EmployeeStatus)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <config.icon
                        className={cn("size-3.5", config.className)}
                      />
                      {config.label}
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  {departmentFilter === "all" ? "More" : departmentFilter}
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel className="text-xs">
                  Department
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={departmentFilter === "all"}
                  onCheckedChange={() => setDepartmentFilter("all")}
                >
                  All Departments
                </DropdownMenuCheckboxItem>
                {departments.map((dept) => (
                  <DropdownMenuCheckboxItem
                    key={dept}
                    checked={departmentFilter === dept}
                    onCheckedChange={() => setDepartmentFilter(dept)}
                  >
                    {dept}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearAllFilters}>
                  Clear all filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button variant="outline" size="sm" className="h-9 gap-2">
            <FileInput className="size-4" />
            Import
          </Button>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-muted-foreground font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from(
              { length: Math.min(5, table.getPageCount()) },
              (_, i) => {
                const pageIndex = i;
                const isActive =
                  table.getState().pagination.pageIndex === pageIndex;
                return (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(pageIndex)}
                    className={cn(
                      "size-8 rounded-lg text-sm font-semibold",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {pageIndex + 1}
                  </button>
                );
              }
            )}
            {table.getPageCount() > 5 && (
              <>
                <span className="px-2 text-muted-foreground">...</span>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  className="size-8 rounded-lg text-sm font-semibold text-foreground hover:bg-muted"
                >
                  {table.getPageCount()}
                </button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2">
                Show {table.getState().pagination.pageSize}
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[5, 8, 10, 20, 50].map((size) => (
                <DropdownMenuItem
                  key={size}
                  onClick={() => table.setPageSize(size)}
                >
                  Show {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

