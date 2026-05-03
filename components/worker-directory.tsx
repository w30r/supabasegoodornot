"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  MapPin, 
  CreditCard, 
  Filter, 
  X, 
  Briefcase, 
  Activity, 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Worker {
  id: string;
  full_name: string;
  passport_number: string;
  role: string;
  status: string;
  site_location: string;
  last_active: string;
}

interface WorkerDirectoryProps {
  initialWorkers: Worker[];
}

type SortKey = keyof Worker;
type SortOrder = "asc" | "desc" | null;

export function WorkerDirectory({ initialWorkers }: WorkerDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({
    key: "full_name",
    order: null,
  });

  const router = useRouter();

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(
      new Set(initialWorkers.map((w) => w.site_location))
    );
    return uniqueLocations.sort();
  }, [initialWorkers]);

  const roles = useMemo(() => {
    const uniqueRoles = Array.from(
      new Set(initialWorkers.map((w) => w.role))
    );
    return uniqueRoles.sort();
  }, [initialWorkers]);

  const handleSort = (key: SortKey) => {
    let order: SortOrder = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.order === "asc") order = "desc";
      else if (sortConfig.order === "desc") order = null;
    }
    setSortConfig({ key, order });
  };

  const filteredAndSortedWorkers = useMemo(() => {
    // 1. Filter
    const filtered = initialWorkers.filter((worker) => {
      const matchesSearch =
        worker.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (worker.passport_number &&
          worker.passport_number.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLocation =
        locationFilter === "all" || worker.site_location === locationFilter;

      const matchesStatus =
        statusFilter === "all" || worker.status === statusFilter;

      const matchesRole =
        roleFilter === "all" || worker.role === roleFilter;

      return matchesSearch && matchesLocation && matchesStatus && matchesRole;
    });

    // 2. Sort
    if (!sortConfig.order) return filtered;

    return [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      if (aValue < bValue) {
        return sortConfig.order === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [initialWorkers, searchQuery, locationFilter, statusFilter, roleFilter, sortConfig]);

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("all");
    setStatusFilter("all");
    setRoleFilter("all");
    setSortConfig({ key: "full_name", order: null });
  };

  const handleRowClick = (id: string) => {
    router.push(`/workerdetails/${id}`);
  };

  const isFiltered = searchQuery !== "" || locationFilter !== "all" || statusFilter !== "all" || roleFilter !== "all" || sortConfig.order !== null;

  const SortIndicator = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortConfig.key !== columnKey || sortConfig.order === null) {
      return <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortConfig.order === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4 text-primary" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4 text-primary" />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Worker Directory</h2>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or passport..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Location Filter */}
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Role Filter */}
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2 truncate">
                <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Role" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2 truncate">
                <Activity className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on_leave">On Leave</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-9 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
              <tr>
                <th 
                  className="px-6 py-4 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort("full_name")}
                >
                  <div className="flex items-center">
                    Full Name <SortIndicator columnKey="full_name" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort("passport_number")}
                >
                  <div className="flex items-center">
                    Passport No. <SortIndicator columnKey="passport_number" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort("role")}
                >
                  <div className="flex items-center">
                    Role <SortIndicator columnKey="role" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status <SortIndicator columnKey="status" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort("site_location")}
                >
                  <div className="flex items-center">
                    Site Location <SortIndicator columnKey="site_location" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort("last_active")}
                >
                  <div className="flex items-center">
                    Last Active <SortIndicator columnKey="last_active" />
                  </div>
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAndSortedWorkers.map((worker) => (
                <tr
                  key={worker.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer group"
                  onClick={() => handleRowClick(worker.id)}
                >
                  <td className="px-6 py-4 font-medium group-hover:text-primary transition-colors">
                    {worker.full_name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-muted-foreground">
                      <CreditCard className="h-3 w-3 mr-2" />
                      {worker.passport_number || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4">{worker.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        worker.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : worker.status === "on_leave"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {worker.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      {worker.site_location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(worker.last_active).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                    }}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredAndSortedWorkers.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-muted-foreground"
                  >
                    No workers match your search or filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
