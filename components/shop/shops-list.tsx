"use client";

import {
  AlertCircle,
  Check,
  Clock,
  Edit,
  ExternalLink,
  MoreHorizontal,
  ShieldAlert,
  Star,
  Store,
  Trash,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { ShopType } from "../types/shop-types";

interface ShopsListProps {
  shops: ShopType[];
  onSelectShop: (shop: ShopType) => void;
  onApproveShop: (shopId: string) => void;
  onRejectShop: (shopId: string) => void;
  onSuspendShop: (shopId: string) => void;
  onActivateShop: (shopId: string) => void;
  onDeleteShop: (shopId: string) => void;
}

export function ShopsList({
  shops,
  onSelectShop,
  onApproveShop,
  onRejectShop,
  onSuspendShop,
  onActivateShop,
  onDeleteShop,
}: ShopsListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <Check className="mr-1 h-3 w-3" /> Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <AlertCircle className="mr-1 h-3 w-3" /> Suspended
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <ShieldAlert className="h-3 w-3" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Verified Seller</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "pending":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                  <Clock className="h-3 w-3" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Verification Pending</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {shops.length === 0 ? (
        <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <Store className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No shops found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter to find shops.
            </p>
          </div>
        </div>
      ) : (
        shops.map((shop) => (
          <Card key={shop.id} className="overflow-hidden">
            <div className="relative h-40 bg-blue-50">
              {shop.coverImage ? (
                <img
                  src={shop.coverImage || "/placeholder.svg"}
                  alt={shop.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Store className="h-16 w-16 text-blue-300" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
                <h3 className="text-lg font-semibold">{shop.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">
                      {shop.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs">•</span>
                  <span className="text-sm">{shop.productsCount} products</span>
                </div>
              </div>
              <div className="absolute right-2 top-2 flex gap-1">
                {getVerificationBadge(shop.verificationStatus)}
              </div>
            </div>
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusBadge(shop.status)}
                  <span className="text-sm text-muted-foreground">
                    Since {shop.joinedDate}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onSelectShop(shop)}>
                      <Edit className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Shop
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {shop.status === "pending" && (
                      <>
                        <DropdownMenuItem
                          onClick={() => onApproveShop(shop.id)}
                        >
                          <Check className="mr-2 h-4 w-4 text-green-600" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRejectShop(shop.id)}>
                          <XCircle className="mr-2 h-4 w-4 text-red-600" />
                          Reject
                        </DropdownMenuItem>
                      </>
                    )}
                    {shop.status === "active" && (
                      <DropdownMenuItem onClick={() => onSuspendShop(shop.id)}>
                        <AlertCircle className="mr-2 h-4 w-4 text-yellow-600" />
                        Suspend
                      </DropdownMenuItem>
                    )}
                    {shop.status === "suspended" && (
                      <DropdownMenuItem onClick={() => onActivateShop(shop.id)}>
                        <Check className="mr-2 h-4 w-4 text-green-600" />
                        Activate
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDeleteShop(shop.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Owner:</span>
                  <span className="text-sm">{shop.owner}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm">{shop.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Phone:</span>
                  <span className="text-sm">{shop.phone}</span>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => onSelectShop(shop)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
