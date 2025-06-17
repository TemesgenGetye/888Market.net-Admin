"use client"

import { useState } from "react"
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Clock,
  ExternalLink,
  MapPin,
  ShieldAlert,
  ShoppingBag,
  Star,
  Store,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import type { ShopType } from "../types/shop-types"

interface ShopDetailsProps {
  shop: ShopType
  onBack: () => void
  onApprove: () => void
  onReject: () => void
  onSuspend: () => void
  onActivate: () => void
  onDelete: () => void
}

export function ShopDetails({ shop, onBack, onApprove, onReject, onSuspend, onActivate, onDelete }: ShopDetailsProps) {
  const [editMode, setEditMode] = useState(false)
  const [editedShop, setEditedShop] = useState(shop)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <Check className="mr-1 h-3 w-3" /> Active
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <AlertCircle className="mr-1 h-3 w-3" /> Suspended
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <ShieldAlert className="mr-1 h-3 w-3" /> Verified Seller
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Verification Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <XCircle className="mr-1 h-3 w-3" /> Verification Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Shop Details</h2>
      </div>

      <div className="relative h-60 rounded-lg bg-blue-50 overflow-hidden">
        {shop.coverImage ? (
          <img src={shop.coverImage || "/placeholder.svg"} alt={shop.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Store className="h-24 w-24 text-blue-300" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-lg bg-white">
              {shop.logo ? (
                <img
                  src={shop.logo || "/placeholder.svg"}
                  alt={`${shop.name} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-blue-100">
                  <Store className="h-8 w-8 text-blue-600" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{shop.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">{shop.rating.toFixed(1)}</span>
                </div>
                <span>•</span>
                <span>{shop.productsCount} products</span>
                <span>•</span>
                <span>Joined {shop.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {getStatusBadge(shop.status)}
        {getVerificationBadge(shop.verificationStatus)}
        <div className="flex-1"></div>
        <Button variant="outline" className="gap-1 border-blue-600 text-blue-600 hover:bg-blue-50">
          <ExternalLink className="h-4 w-4" />
          Visit Shop
        </Button>
        {shop.status === "pending" && (
          <>
            <Button onClick={onReject} variant="outline" className="gap-1 border-red-600 text-red-600 hover:bg-red-50">
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button onClick={onApprove} className="gap-1 bg-green-600 text-white hover:bg-green-700">
              <Check className="h-4 w-4" />
              Approve
            </Button>
          </>
        )}
        {shop.status === "active" && (
          <Button onClick={onSuspend} className="gap-1 bg-yellow-600 text-white hover:bg-yellow-700">
            <AlertCircle className="h-4 w-4" />
            Suspend
          </Button>
        )}
        {shop.status === "suspended" && (
          <Button onClick={onActivate} className="gap-1 bg-green-600 text-white hover:bg-green-700">
            <Check className="h-4 w-4" />
            Activate
          </Button>
        )}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-blue-50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Products
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Orders
          </TabsTrigger>
          <TabsTrigger value="reviews" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Reviews
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${shop.stats.totalSales.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {shop.stats.salesTrend > 0 ? "+" : ""}
                  {shop.stats.salesTrend}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shop.productsCount}</div>
                <p className="text-xs text-muted-foreground">
                  {shop.stats.productsTrend > 0 ? "+" : ""}
                  {shop.stats.productsTrend} from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shop.stats.ordersCount}</div>
                <p className="text-xs text-muted-foreground">
                  {shop.stats.ordersTrend > 0 ? "+" : ""}
                  {shop.stats.ordersTrend}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shop.stats.customersCount}</div>
                <p className="text-xs text-muted-foreground">
                  {shop.stats.customersTrend > 0 ? "+" : ""}
                  {shop.stats.customersTrend}% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shop Information</CardTitle>
                <CardDescription>Basic information about the shop</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Owner</div>
                    <div>{shop.owner}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Email</div>
                    <div>{shop.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Phone</div>
                    <div>{shop.phone}</div>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Description</div>
                  <div className="mt-1">{shop.description}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Address</div>
                  <div className="mt-1 flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <div>{shop.address}</div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Category</div>
                    <div>{shop.category}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Commission Rate</div>
                    <div>{shop.commissionRate}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Details</CardTitle>
                <CardDescription>Documents and verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Verification Status</div>
                  <div>{getVerificationBadge(shop.verificationStatus)}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Business Registration</div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-10 w-10 rounded border bg-muted flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">business_registration.pdf</div>
                      <div className="text-xs text-muted-foreground">
                        Uploaded on {shop.verificationDocuments.uploadDate}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">ID Verification</div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-10 w-10 rounded border bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">id_verification.pdf</div>
                      <div className="text-xs text-muted-foreground">
                        Uploaded on {shop.verificationDocuments.uploadDate}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Tax Information</div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-10 w-10 rounded border bg-muted flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">tax_information.pdf</div>
                      <div className="text-xs text-muted-foreground">
                        Uploaded on {shop.verificationDocuments.uploadDate}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage products from this shop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="text-sm font-medium">Product list will be displayed here</div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">View All Products</Button>
                </div>
                <div className="p-8 text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Product listing</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This shop has {shop.productsCount} products in the marketplace.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Recent orders from this shop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="text-sm font-medium">Order list will be displayed here</div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">View All Orders</Button>
                </div>
                <div className="p-8 text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Order history</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This shop has {shop.stats.ordersCount} orders in total.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>Customer reviews for this shop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="text-sm font-medium">Review list will be displayed here</div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">View All Reviews</Button>
                </div>
                <div className="p-8 text-center">
                  <Star className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Customer reviews</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This shop has an average rating of {shop.rating.toFixed(1)} stars.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Shop Settings</CardTitle>
              <CardDescription>Manage shop settings and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="shop-name">Shop Name</Label>
                  <Input id="shop-name" defaultValue={shop.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shop-description">Description</Label>
                  <Textarea id="shop-description" rows={4} defaultValue={shop.description} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="shop-email">Email</Label>
                    <Input id="shop-email" type="email" defaultValue={shop.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shop-phone">Phone</Label>
                    <Input id="shop-phone" defaultValue={shop.phone} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shop-address">Address</Label>
                  <Textarea id="shop-address" rows={2} defaultValue={shop.address} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="shop-category">Category</Label>
                    <Input id="shop-category" defaultValue={shop.category} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shop-commission">Commission Rate (%)</Label>
                    <Input id="shop-commission" type="number" defaultValue={shop.commissionRate} />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for this shop</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Delete Shop</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete this shop and all its data. This action cannot be undone.
                    </p>
                  </div>
                  <Button variant="destructive" onClick={onDelete}>
                    Delete Shop
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
