import { Badge } from "@/components/ui/badge";
import {
  Bell,
  ChevronDown,
  Search,
  User,
  Lock,
  CreditCard,
  BellIcon,
  Globe,
  HelpCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Settings() {
  return (
    <main className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Settings</h2>
        <p className="text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64">
            <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
              <TabsTrigger value="account" className="justify-start w-full">
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start w-full">
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              {/* <TabsTrigger value="billing" className="justify-start w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </TabsTrigger> */}
              <TabsTrigger
                value="notifications"
                className="justify-start w-full"
              >
                <BellIcon className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              {/* <TabsTrigger value="appearance" className="justify-start w-full">
                <Globe className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="help" className="justify-start w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </TabsTrigger> */}
            </TabsList>
          </div>
          <div className="flex-1">
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account information and profile details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6">
                    <Image
                      src="/logo.jpg"
                      alt="avatar"
                      width={100}
                      height={100}
                    />
                    <div>
                      <Button variant="outline" size="sm" className="mb-2">
                        Change Avatar
                      </Button>
                      <p className="text-sm text-gray-500">
                        JPG, GIF or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Wolde" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Giyorgis" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="wolde@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="YBS" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] rounded-md border border-gray-200 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="An Investor in software products and ecommerce...."
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and security preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable 2FA</p>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-500">
                          Receive updates about your orders
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-500">
                          Receive marketing emails and promotions
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Product Updates</p>
                        <p className="text-sm text-gray-500">
                          Receive updates about new products
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Manage your billing information and payment methods.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">Current Plan</p>
                          <p className="text-sm text-gray-500">
                            You are currently on the Pro plan
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
                          Pro
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Next billing date: June 12, 2025
                        </p>
                        <Button variant="outline" size="sm">
                          Change Plan
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">Payment Method</p>
                          <p className="text-sm text-gray-500">
                            Visa ending in 4242
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Expires: 12/2025
                        </p>
                        <Button variant="outline" size="sm">
                          Add New
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">Billing Address</p>
                          <p className="text-sm text-gray-500">
                            123 Main St, New York, NY 10001
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </main>
  );
}
