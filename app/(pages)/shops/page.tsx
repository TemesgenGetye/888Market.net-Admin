"use client";

import { useState } from "react";
import { Check, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { initialShops } from "./data/shops-data";
import { ShopDetails } from "@/components/shop/shop-details";
import { ShopsList } from "@/components/shop/shops-list";
import type { ShopType } from "./types/shop-types";

export default function ShopsManagement() {
  const [shops, setShops] = useState(initialShops);
  const [selectedShop, setSelectedShop] = useState<ShopType | null>(shops[0]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "details">("list");

  const handleSelectShop = (shop: ShopType) => {
    setSelectedShop(shop);
    setViewMode("details");
  };

  const handleBackToList = () => {
    setViewMode("list");
  };

  const handleApproveShop = (shopId: string) => {
    const updatedShops = shops.map((shop) =>
      shop.id === shopId
        ? { ...shop, status: "active", verificationStatus: "verified" }
        : shop
    );
    setShops(updatedShops);
    if (selectedShop && selectedShop.id === shopId) {
      setSelectedShop({
        ...selectedShop,
        status: "active",
        verificationStatus: "verified",
      });
    }
  };

  const handleRejectShop = (shopId: string) => {
    const updatedShops = shops.map((shop) =>
      shop.id === shopId
        ? { ...shop, status: "rejected", verificationStatus: "rejected" }
        : shop
    );
    setShops(updatedShops);
    if (selectedShop && selectedShop.id === shopId) {
      setSelectedShop({
        ...selectedShop,
        status: "rejected",
        verificationStatus: "rejected",
      });
    }
  };

  const handleSuspendShop = (shopId: string) => {
    const updatedShops = shops.map((shop) =>
      shop.id === shopId ? { ...shop, status: "suspended" } : shop
    );
    setShops(updatedShops);
    if (selectedShop && selectedShop.id === shopId) {
      setSelectedShop({ ...selectedShop, status: "suspended" });
    }
  };

  const handleActivateShop = (shopId: string) => {
    const updatedShops = shops.map((shop) =>
      shop.id === shopId ? { ...shop, status: "active" } : shop
    );
    setShops(updatedShops);
    if (selectedShop && selectedShop.id === shopId) {
      setSelectedShop({ ...selectedShop, status: "active" });
    }
  };

  const handleDeleteShop = (shopId: string) => {
    const updatedShops = shops.filter((shop) => shop.id !== shopId);
    setShops(updatedShops);
    if (selectedShop && selectedShop.id === shopId) {
      setSelectedShop(updatedShops.length > 0 ? updatedShops[0] : null);
    }
  };

  const filteredShops = shops.filter((shop) => {
    // Filter by tab
    if (activeTab === "active" && shop.status !== "active") return false;
    if (activeTab === "pending" && shop.status !== "pending") return false;
    if (activeTab === "suspended" && shop.status !== "suspended") return false;

    // Filter by status dropdown
    if (selectedStatus && shop.status !== selectedStatus) return false;

    // Filter by search
    if (
      searchQuery &&
      !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !shop.owner.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shops Management</h1>
          <p className="text-muted-foreground">
            Manage vendor shops in your marketplace
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Shop
        </Button>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Tabs
              defaultValue={activeTab}
              className="w-full md:w-auto"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-4 bg-blue-50 md:w-auto">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="suspended"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Suspended
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search shops..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Popover open={openFilter} onOpenChange={setOpenFilter}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="end">
                  <Command>
                    <CommandInput placeholder="Filter status..." />
                    <CommandList>
                      <CommandEmpty>No status found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => {
                            setSelectedStatus(null);
                            setOpenFilter(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              !selectedStatus ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          All Statuses
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setSelectedStatus("active");
                            setOpenFilter(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedStatus === "active"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          Active
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setSelectedStatus("pending");
                            setOpenFilter(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedStatus === "pending"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          Pending
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setSelectedStatus("suspended");
                            setOpenFilter(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedStatus === "suspended"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          Suspended
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setSelectedStatus("rejected");
                            setOpenFilter(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedStatus === "rejected"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          Rejected
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ShopsList
            shops={filteredShops}
            onSelectShop={handleSelectShop}
            onApproveShop={handleApproveShop}
            onRejectShop={handleRejectShop}
            onSuspendShop={handleSuspendShop}
            onActivateShop={handleActivateShop}
            onDeleteShop={handleDeleteShop}
          />
        </div>
      ) : (
        selectedShop && (
          <ShopDetails
            shop={selectedShop}
            onBack={handleBackToList}
            onApprove={() => handleApproveShop(selectedShop.id)}
            onReject={() => handleRejectShop(selectedShop.id)}
            onSuspend={() => handleSuspendShop(selectedShop.id)}
            onActivate={() => handleActivateShop(selectedShop.id)}
            onDelete={() => handleDeleteShop(selectedShop.id)}
          />
        )
      )}
    </div>
  );
}
