"use client";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

import {
  Bell,
  Check,
  ChevronDown,
  Filter,
  Plus,
  Search,
  Send,
  Upload,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// Mock data for users
const mockUsers = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john@example.com",
    device: "Android",
    lastActive: "2 hours ago",
    subscribed: true,
    topics: ["orders", "promotions", "news"],
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    device: "iOS",
    lastActive: "5 minutes ago",
    subscribed: true,
    topics: ["orders", "news"],
  },
  {
    id: "user-3",
    name: "Michael Brown",
    email: "michael@example.com",
    device: "Web",
    lastActive: "1 day ago",
    subscribed: false,
    topics: [],
  },
  {
    id: "user-4",
    name: "Emily Wilson",
    email: "emily@example.com",
    device: "iOS",
    lastActive: "Just now",
    subscribed: true,
    topics: ["orders", "promotions"],
  },
  {
    id: "user-5",
    name: "David Martinez",
    email: "david@example.com",
    device: "Android",
    lastActive: "3 days ago",
    subscribed: true,
    topics: ["orders"],
  },
  {
    id: "user-6",
    name: "Lisa Thompson",
    email: "lisa@example.com",
    device: "Web",
    lastActive: "1 hour ago",
    subscribed: true,
    topics: ["orders", "promotions", "news"],
  },
  {
    id: "user-7",
    name: "Robert Garcia",
    email: "robert@example.com",
    device: "Android",
    lastActive: "4 hours ago",
    subscribed: true,
    topics: ["orders", "news"],
  },
  {
    id: "user-8",
    name: "Jennifer Lee",
    email: "jennifer@example.com",
    device: "iOS",
    lastActive: "2 days ago",
    subscribed: false,
    topics: [],
  },
];

export default function FirebaseNotificationConfig() {
  const [activeTab, setActiveTab] = useState("config");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [openDeviceFilter, setOpenDeviceFilter] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationBody, setNotificationBody] = useState("");

  const handleSaveConfig = () => {
    toast({
      title: "Configuration saved",
      description:
        "Firebase notification configuration has been updated successfully.",
    });
  };

  const handleTestNotification = () => {
    toast({
      title: "Test notification sent",
      description: "A test push notification has been sent.",
    });
  };

  const handleSendNotification = () => {
    if (!notificationTitle || !notificationBody) {
      toast({
        title: "Error",
        description: "Please enter both title and body for the notification.",
        variant: "destructive",
      });
      return;
    }

    const targetText =
      selectedUsers.length > 0
        ? `${selectedUsers.length} selected users`
        : "all subscribed users";

    toast({
      title: "Notification sent",
      description: `Your notification has been sent to ${targetText}.`,
    });

    setNotificationTitle("");
    setNotificationBody("");
    setSelectedUsers([]);
  };

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const selectAllUsers = () => {
    const allUserIds = mockUsers
      .filter((user) => user.subscribed)
      .map((user) => user.id);
    setSelectedUsers(allUserIds);
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  const filteredUsers = mockUsers.filter((user) => {
    // Filter by search query
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by device type
    if (selectedDevice && user.device !== selectedDevice) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 p-10">
      <div>
        <h1 className="text-3xl font-bold">Firebase Notification</h1>
        <p className="text-muted-foreground">
          Configure Firebase Cloud Messaging for push notifications
        </p>
      </div>

      <Tabs
        defaultValue="config"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="bg-blue-50">
          <TabsTrigger
            value="config"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Configuration
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            User Management
          </TabsTrigger>
          <TabsTrigger
            value="send"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Send Notification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Firebase Configuration</CardTitle>
                  <CardDescription>
                    Configure your Firebase Cloud Messaging settings
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    Active
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firebase-api-key">API Key</Label>
                <Input id="firebase-api-key" placeholder="AIzaSyA..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firebase-auth-domain">Auth Domain</Label>
                <Input
                  id="firebase-auth-domain"
                  placeholder="your-app.firebaseapp.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firebase-project-id">Project ID</Label>
                <Input id="firebase-project-id" placeholder="your-project-id" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firebase-storage-bucket">Storage Bucket</Label>
                <Input
                  id="firebase-storage-bucket"
                  placeholder="your-app.appspot.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firebase-messaging-sender-id">
                  Messaging Sender ID
                </Label>
                <Input
                  id="firebase-messaging-sender-id"
                  placeholder="123456789012"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firebase-app-id">App ID</Label>
                <Input
                  id="firebase-app-id"
                  placeholder="1:123456789012:web:abc123def456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firebase-server-key">Server Key</Label>
                <Input
                  id="firebase-server-key"
                  type="password"
                  placeholder="AAAA..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firebase-config-file">
                  Firebase Configuration File (firebase-messaging-sw.js)
                </Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload Configuration
                    File
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleTestNotification}>
                <Bell className="mr-2 h-4 w-4" /> Send Test Notification
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSaveConfig}
              >
                Save Configuration
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure push notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-push">Enable Push Notifications</Label>
                  <Switch id="enable-push" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable or disable all push notifications
                </p>
              </div>

              <div className="space-y-2">
                <Label>Send Push Notifications For</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="push-new-order" defaultChecked />
                    <Label htmlFor="push-new-order">New Orders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="push-order-status" defaultChecked />
                    <Label htmlFor="push-order-status">
                      Order Status Updates
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="push-new-message" defaultChecked />
                    <Label htmlFor="push-new-message">New Messages</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="push-promotions" />
                    <Label htmlFor="push-promotions">Promotions</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-icon">
                  Default Notification Icon
                </Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload Icon
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended size: 192x192 pixels, PNG format
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSaveConfig}
              >
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Push Notification Subscribers</CardTitle>
                  <CardDescription>
                    Manage users who have subscribed to push notifications
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {mockUsers.filter((user) => user.subscribed).length} Active
                    Subscribers
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Popover
                      open={openDeviceFilter}
                      onOpenChange={setOpenDeviceFilter}
                    >
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-1">
                          <Filter className="h-4 w-4" />
                          {selectedDevice || "All Devices"}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0" align="end">
                        <Command>
                          <CommandInput placeholder="Filter devices..." />
                          <CommandList>
                            <CommandEmpty>No device found.</CommandEmpty>
                            <CommandGroup>
                              <CommandItem
                                onSelect={() => {
                                  setSelectedDevice(null);
                                  setOpenDeviceFilter(false);
                                }}
                              >
                                All Devices
                              </CommandItem>
                              <CommandItem
                                onSelect={() => {
                                  setSelectedDevice("Android");
                                  setOpenDeviceFilter(false);
                                }}
                              >
                                Android
                              </CommandItem>
                              <CommandItem
                                onSelect={() => {
                                  setSelectedDevice("iOS");
                                  setOpenDeviceFilter(false);
                                }}
                              >
                                iOS
                              </CommandItem>
                              <CommandItem
                                onSelect={() => {
                                  setSelectedDevice("Web");
                                  setOpenDeviceFilter(false);
                                }}
                              >
                                Web
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Button
                      variant="outline"
                      className="gap-1"
                      onClick={() => setActiveTab("send")}
                    >
                      <Send className="h-4 w-4" />
                      Send Notification
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={
                          selectedUsers.length ===
                            mockUsers.filter((u) => u.subscribed).length &&
                          selectedUsers.length > 0
                        }
                        onChange={() => {
                          if (
                            selectedUsers.length ===
                              mockUsers.filter((u) => u.subscribed).length &&
                            selectedUsers.length > 0
                          ) {
                            clearSelection();
                          } else {
                            selectAllUsers();
                          }
                        }}
                      />
                      <span className="text-sm font-medium">Select All</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedUsers.length} users selected
                    </div>
                  </div>
                  <div className="divide-y">
                    {filteredUsers.length === 0 ? (
                      <div className="p-8 text-center">
                        <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">
                          No users found
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Try adjusting your search or filter to find users.
                        </p>
                      </div>
                    ) : (
                      filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4"
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => toggleUserSelection(user.id)}
                              disabled={!user.subscribed}
                            />
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  user.subscribed
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                              <span className="text-sm">
                                {user.subscribed
                                  ? "Subscribed"
                                  : "Unsubscribed"}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {user.device}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Active: {user.lastActive}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {mockUsers.length} users
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={selectedUsers.length === 0}
                onClick={() => setActiveTab("send")}
              >
                Send to Selected
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Topics</CardTitle>
              <CardDescription>
                Manage notification topics for user subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Orders</div>
                  <div className="text-sm text-muted-foreground">
                    Order status updates and notifications
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {
                    mockUsers.filter((user) => user.topics.includes("orders"))
                      .length
                  }{" "}
                  subscribers
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Promotions</div>
                  <div className="text-sm text-muted-foreground">
                    Sales, discounts, and special offers
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {
                    mockUsers.filter((user) =>
                      user.topics.includes("promotions")
                    ).length
                  }{" "}
                  subscribers
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <div className="space-y-1">
                  <div className="font-medium">News</div>
                  <div className="text-sm text-muted-foreground">
                    Company news and updates
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {
                    mockUsers.filter((user) => user.topics.includes("news"))
                      .length
                  }{" "}
                  subscribers
                </div>
              </div>
              <div className="pt-4">
                <Button className="gap-1">
                  <Plus className="h-4 w-4" /> Add Topic
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="send" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Push Notification</CardTitle>
              <CardDescription>
                {selectedUsers.length > 0
                  ? `Send a notification to ${selectedUsers.length} selected users`
                  : "Send a notification to all subscribed users"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notification-title">Notification Title</Label>
                <Input
                  id="notification-title"
                  placeholder="Enter notification title"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-body">Notification Body</Label>
                <Textarea
                  id="notification-body"
                  placeholder="Enter notification message"
                  rows={4}
                  value={notificationBody}
                  onChange={(e) => setNotificationBody(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-image">
                  Notification Image (Optional)
                </Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload Image
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended size: 1200x600 pixels, JPG or PNG format
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-url">Action URL (Optional)</Label>
                <Input
                  id="notification-url"
                  placeholder="https://example.com/page"
                />
                <p className="text-xs text-muted-foreground">
                  URL to open when the user clicks on the notification
                </p>
              </div>

              <div className="space-y-2">
                <Label>Target</Label>
                <Select
                  defaultValue={selectedUsers.length > 0 ? "selected" : "all"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subscribers</SelectItem>
                    <SelectItem
                      value="selected"
                      disabled={selectedUsers.length === 0}
                    >
                      Selected Users ({selectedUsers.length})
                    </SelectItem>
                    <SelectItem value="topic">Topic Subscribers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedUsers.length > 0 && (
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Selected Users</div>
                    <Button variant="ghost" size="sm" onClick={clearSelection}>
                      Clear Selection
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedUsers.map((userId) => {
                      const user = mockUsers.find((u) => u.id === userId);
                      return user ? (
                        <div
                          key={userId}
                          className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800"
                        >
                          {user.name}
                          <button
                            className="ml-1 rounded-full hover:bg-blue-200"
                            onClick={() => toggleUserSelection(userId)}
                          >
                            ×
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="schedule-notification">
                    Schedule Notification
                  </Label>
                  <Switch id="schedule-notification" />
                </div>
                <Input type="datetime-local" disabled />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("users")}>
                Back to Users
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSendNotification}
                disabled={!notificationTitle || !notificationBody}
              >
                <Send className="mr-2 h-4 w-4" /> Send Notification
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                History of recently sent notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">New Summer Collection</div>
                    <div className="text-sm text-muted-foreground">
                      2 hours ago
                    </div>
                  </div>
                  <div className="mt-1 text-sm">
                    Check out our new summer collection with 20% off all items!
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <div>Sent to: All subscribers</div>
                    <div>•</div>
                    <div>Opened: 45%</div>
                    <div>•</div>
                    <div>Clicks: 12%</div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Order #12345 Shipped</div>
                    <div className="text-sm text-muted-foreground">
                      1 day ago
                    </div>
                  </div>
                  <div className="mt-1 text-sm">
                    Your order has been shipped and will arrive in 2-3 business
                    days.
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <div>Sent to: 1 user</div>
                    <div>•</div>
                    <div>Opened: 100%</div>
                    <div>•</div>
                    <div>Clicks: 100%</div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Weekend Flash Sale</div>
                    <div className="text-sm text-muted-foreground">
                      3 days ago
                    </div>
                  </div>
                  <div className="mt-1 text-sm">
                    Don't miss our weekend flash sale with up to 50% off
                    selected items!
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <div>Sent to: Topic "promotions"</div>
                    <div>•</div>
                    <div>Opened: 62%</div>
                    <div>•</div>
                    <div>Clicks: 28%</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Notifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
