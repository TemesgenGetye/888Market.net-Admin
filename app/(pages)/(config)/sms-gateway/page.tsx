"use client";

import { useState } from "react";
import { Check } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

export default function SmsGatewayConfig() {
  const [testPhoneNumber, setTestPhoneNumber] = useState("");

  const handleSaveConfig = () => {
    toast({
      title: "Configuration saved",
      description: "SMS gateway configuration has been updated successfully.",
    });
  };

  const handleTestSms = (provider: string) => {
    if (!testPhoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a phone number for testing.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Test SMS sent",
      description: `A test SMS has been sent to ${testPhoneNumber} via ${provider}.`,
    });
  };

  return (
    <div className="space-y-6 p-10">
      <div>
        <h1 className="text-3xl font-bold">SMS Gateway Configuration</h1>
        <p className="text-muted-foreground">
          Configure SMS gateways for notifications and authentication
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Twilio */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-[#F22F46] flex items-center justify-center">
                  <svg viewBox="0 0 30 30" width="24" height="24">
                    <path
                      fill="#fff"
                      d="M15 0C6.7 0 0 6.7 0 15s6.7 15 15 15 15-6.7 15-15S23.3 0 15 0zm0 26C8.9 26 4 21.1 4 15S8.9 4 15 4s11 4.9 11 11-4.9 11-11 11zm6.8-14.7c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1zm-13.6 0c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1zm6.8 5c-4.1 0-7.5 1.9-7.5 4.3v.7h15v-.7c0-2.4-3.4-4.3-7.5-4.3z"
                    />
                  </svg>
                </div>
                <CardTitle>Twilio</CardTitle>
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
              <Label htmlFor="twilio-account-sid">Account SID</Label>
              <Input id="twilio-account-sid" placeholder="AC..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twilio-auth-token">Auth Token</Label>
              <Input
                id="twilio-auth-token"
                type="password"
                placeholder="Auth token..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twilio-from-number">From Number</Label>
              <Input id="twilio-from-number" placeholder="+1234567890" />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Input
                placeholder="Enter phone number for testing"
                className="flex-1"
                value={testPhoneNumber}
                onChange={(e) => setTestPhoneNumber(e.target.value)}
              />
              <Button variant="outline" onClick={() => handleTestSms("Twilio")}>
                Test
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveConfig}
            >
              Save Configuration
            </Button>
          </CardFooter>
        </Card>

        {/* Telesign */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-[#3cbfae] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TS</span>
                </div>
                <CardTitle>Telesign</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Inactive
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telesign-customer-id">Customer ID</Label>
              <Input id="telesign-customer-id" placeholder="Customer ID..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telesign-api-key">API Key</Label>
              <Input
                id="telesign-api-key"
                type="password"
                placeholder="API key..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telesign-sender-id">Sender ID</Label>
              <Input id="telesign-sender-id" placeholder="Sender ID..." />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Input
                placeholder="Enter phone number for testing"
                className="flex-1"
                value={testPhoneNumber}
                onChange={(e) => setTestPhoneNumber(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={() => handleTestSms("Telesign")}
              >
                Test
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveConfig}
            >
              Save Configuration
            </Button>
          </CardFooter>
        </Card>

        {/* MessageBird */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-[#2481d7] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="#fff"
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    />
                  </svg>
                </div>
                <CardTitle>MessageBird</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Inactive
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="messagebird-api-key">API Key</Label>
              <Input
                id="messagebird-api-key"
                type="password"
                placeholder="API key..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="messagebird-originator">Originator</Label>
              <Input
                id="messagebird-originator"
                placeholder="Your business name or number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="messagebird-access-key">Access Key</Label>
              <Input
                id="messagebird-access-key"
                type="password"
                placeholder="Access key..."
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Input
                placeholder="Enter phone number for testing"
                className="flex-1"
                value={testPhoneNumber}
                onChange={(e) => setTestPhoneNumber(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={() => handleTestSms("MessageBird")}
              >
                Test
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveConfig}
            >
              Save Configuration
            </Button>
          </CardFooter>
        </Card>

        {/* Nexmo (Vonage) */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-[#7D00FF] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="#fff"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                    />
                  </svg>
                </div>
                <CardTitle>Vonage (Nexmo)</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Inactive
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nexmo-api-key">API Key</Label>
              <Input id="nexmo-api-key" placeholder="API key..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nexmo-api-secret">API Secret</Label>
              <Input
                id="nexmo-api-secret"
                type="password"
                placeholder="API secret..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nexmo-from">From</Label>
              <Input
                id="nexmo-from"
                placeholder="Your business name or number"
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Input
                placeholder="Enter phone number for testing"
                className="flex-1"
                value={testPhoneNumber}
                onChange={(e) => setTestPhoneNumber(e.target.value)}
              />
              <Button variant="outline" onClick={() => handleTestSms("Vonage")}>
                Test
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveConfig}
            >
              Save Configuration
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SMS Settings</CardTitle>
          <CardDescription>Configure general SMS settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-sms">Enable SMS Notifications</Label>
              <Switch id="enable-sms" defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground">
              Enable or disable all SMS notifications
            </p>
          </div>

          <div className="space-y-2">
            <Label>Send SMS Notifications For</Label>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Switch id="sms-otp" defaultChecked />
                <Label htmlFor="sms-otp">OTP Verification</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms-order-confirmation" defaultChecked />
                <Label htmlFor="sms-order-confirmation">
                  Order Confirmation
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms-shipping" defaultChecked />
                <Label htmlFor="sms-shipping">Shipping Updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms-delivery" defaultChecked />
                <Label htmlFor="sms-delivery">Delivery Confirmation</Label>
              </div>
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
