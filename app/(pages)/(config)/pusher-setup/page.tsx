"use client";

import { useState } from "react";
import { Check, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

export default function PusherSetupConfig() {
  const [enableRealtime, setEnableRealtime] = useState(true);

  const handleSaveConfig = () => {
    toast({
      title: "Configuration saved",
      description: "Pusher configuration has been updated successfully.",
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Connection successful",
      description: "Successfully connected to the Pusher service.",
    });
  };

  return (
    <div className="space-y-6 p-10">
      <div>
        <h1 className="text-3xl font-bold">Pusher Setup</h1>
        <p className="text-muted-foreground">
          Configure real-time features with Pusher
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="enable-realtime"
            checked={enableRealtime}
            onCheckedChange={setEnableRealtime}
          />
          <Label htmlFor="enable-realtime">Enable Real-time Features</Label>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <Info className="h-4 w-4" />
          <span>
            Real-time features include live notifications, chat, and activity
            updates
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pusher Configuration</CardTitle>
              <CardDescription>
                Configure your Pusher account for real-time features
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pusher-app-id">App ID</Label>
              <Input id="pusher-app-id" placeholder="App ID..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pusher-app-key">App Key</Label>
              <Input id="pusher-app-key" placeholder="App Key..." />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pusher-app-secret">App Secret</Label>
              <Input
                id="pusher-app-secret"
                type="password"
                placeholder="App Secret..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pusher-cluster">Cluster</Label>
              <Select defaultValue="eu">
                <SelectTrigger id="pusher-cluster">
                  <SelectValue placeholder="Select cluster" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us2">us2 (US East)</SelectItem>
                  <SelectItem value="us3">us3 (US West)</SelectItem>
                  <SelectItem value="eu">eu (Europe)</SelectItem>
                  <SelectItem value="ap1">ap1 (Asia Pacific)</SelectItem>
                  <SelectItem value="ap2">ap2 (Asia Pacific 2)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="pusher-tls">Use TLS</Label>
              <Switch id="pusher-tls" defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground">
              Enable TLS encryption for secure communication (recommended)
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleTestConnection}>
            Test Connection
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
          <CardTitle>Real-time Features</CardTitle>
          <CardDescription>
            Configure which features use real-time updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Switch id="realtime-notifications" defaultChecked />
              <Label htmlFor="realtime-notifications">Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="realtime-chat" defaultChecked />
              <Label htmlFor="realtime-chat">Chat Messages</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="realtime-orders" defaultChecked />
              <Label htmlFor="realtime-orders">Order Updates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="realtime-user-presence" />
              <Label htmlFor="realtime-user-presence">User Presence</Label>
            </div>
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
    </div>
  );
}
