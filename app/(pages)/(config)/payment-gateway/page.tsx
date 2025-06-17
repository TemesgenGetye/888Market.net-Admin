"use client";

import { useState } from "react";
import { Check, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

export default function PaymentGatewayConfig() {
  const [testMode, setTestMode] = useState(true);

  const handleSaveConfig = () => {
    toast({
      title: "Configuration saved",
      description:
        "Payment gateway configuration has been updated successfully.",
    });
  };

  const handleTestConnection = (gateway: string) => {
    toast({
      title: "Connection successful",
      description: `Successfully connected to ${gateway}.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6 p-10">
      <div>
        <h1 className="text-3xl font-bold">Payment Gateway Configuration</h1>
        <p className="text-muted-foreground">
          Configure payment gateways for your marketplace
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="test-mode"
            checked={testMode}
            onCheckedChange={setTestMode}
          />
          <Label htmlFor="test-mode">Test Mode</Label>
        </div>
        <div className="text-sm text-muted-foreground">
          {testMode
            ? "Test mode is enabled. No real charges will be made."
            : "Live mode is enabled. Real charges will be made."}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Stripe */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-[#6772e5] flex items-center justify-center">
                  <svg
                    viewBox="0 0 60 25"
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="25"
                    className="p-1"
                  >
                    <path
                      fill="#fff"
                      d="M59.64 14.28h-8.06v-1.4h8.05v1.4zm-8.05-5.88h8.05v1.4h-8.05v-1.4zm-5.87 5.88h-4.81v-1.4h4.8v1.4zm-4.81-5.88h4.8v1.4h-4.8v-1.4zm-5.9 5.88h-4.8v-1.4h4.8v1.4zm-4.8-5.88h4.8v1.4h-4.8v-1.4zm-5.9 5.88H19.4v-1.4h4.8v1.4zm-4.8-5.88h4.8v1.4h-4.8v-1.4zm-5.9 5.88H8.6v-1.4h4.81v1.4zm-4.8-5.88h4.8v1.4H8.6v-1.4zm-5.9 5.88H0v-1.4h2.7v1.4zm0-5.88v1.4H0v-1.4h2.7zm49.13 3.03c0-.68.55-1.24 1.24-1.24.68 0 1.24.56 1.24 1.24 0 .69-.56 1.24-1.24 1.24a1.24 1.24 0 01-1.24-1.24zm-5.9 0c0-.68.56-1.24 1.24-1.24.69 0 1.24.56 1.24 1.24 0 .69-.55 1.24-1.24 1.24a1.24 1.24 0 01-1.24-1.24zm-5.9 0c0-.68.56-1.24 1.24-1.24.69 0 1.24.56 1.24 1.24 0 .69-.55 1.24-1.24 1.24a1.24 1.24 0 01-1.24-1.24zm-5.9 0c0-.68.56-1.24 1.24-1.24.69 0 1.24.56 1.24 1.24 0 .69-.55 1.24-1.24 1.24a1.24 1.24 0 01-1.24-1.24zm-5.9 0c0-.68.56-1.24 1.24-1.24.69 0 1.24.56 1.24 1.24 0 .69-.55 1.24-1.24 1.24a1.24 1.24 0 01-1.24-1.24zm-5.9 0c0-.68.56-1.24 1.24-1.24.69 0 1.24.56 1.24 1.24 0 .69-.55 1.24-1.24 1.24a1.24 1.24 0 01-1.24-1.24zm-5.9 0c0-.68.56-1.24 1.24-1.24.69 0 1.24.56 1.24 1.24 0 .69-.55 1.24-1.24 1.24a1.24 1.24 0 01-1.24-1.24z"
                    />
                  </svg>
                </div>
                <CardTitle>Stripe</CardTitle>
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
              <Label htmlFor="stripe-title">Payment Gateway Title</Label>
              <Input id="stripe-title" defaultValue="Stripe" />
            </div>

            <div className="space-y-2">
              <Label>Mode</Label>
              <RadioGroup
                defaultValue={testMode ? "test" : "live"}
                className="flex"
              >
                <div className="flex items-center space-x-2 mr-4">
                  <RadioGroupItem value="test" id="stripe-test" />
                  <Label htmlFor="stripe-test">Test</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="live" id="stripe-live" />
                  <Label htmlFor="stripe-live">Live</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stripe-secret-key">
                Secret Key {testMode && "(Test)"}
              </Label>
              <Input
                id="stripe-secret-key"
                type="password"
                placeholder="sk_test_..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stripe-published-key">
                Published Key {testMode && "(Test)"}
              </Label>
              <Input id="stripe-published-key" placeholder="pk_test_..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stripe-logo">Choose Logo</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => handleTestConnection("Stripe")}
            >
              Test Connection
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveConfig}
            >
              Save
            </Button>
          </CardFooter>
        </Card>

        {/* PayPal */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-[#003087] flex items-center justify-center">
                  <svg
                    viewBox="0 0 101 32"
                    width="60"
                    height="25"
                    className="p-1"
                  >
                    <path
                      fill="#fff"
                      d="M12.104 7.87H5.145a.524.524 0 00-.518.442L2.133 25.169a.316.316 0 00.311.366h3.478a.524.524 0 00.518-.442l.68-4.32a.524.524 0 01.518-.442h2.206c3.475 0 5.481-1.682 6.009-5.015.24-1.462.01-2.609-.683-3.415-.761-.879-2.112-1.343-3.916-1.343zm.608 4.941c-.288 1.898-1.734 1.898-3.132 1.898h-.8l.561-3.552a.315.315 0 01.311-.267h.367c.952 0 1.85 0 2.314.543.277.325.362.807.28 1.378zm15.17-4.94h-3.482a.315.315 0 00-.311.267l-2.494 15.812a.316.316 0 00.311.366h1.78a.524.524 0 00.518-.442l.67-4.24a.524.524 0 01.518-.442h2.206c3.475 0 5.481-1.682 6.009-5.015.24-1.462.01-2.609-.683-3.415-.761-.879-2.112-1.343-3.916-1.343h-.125zm.608 4.941c-.288 1.898-1.734 1.898-3.132 1.898h-.8l.561-3.552a.315.315 0 01.311-.267h.367c.952 0 1.85 0 2.314.543.277.325.362.807.28 1.378zm15.17-4.941h-3.484a.524.524 0 00-.518.442l-2.494 15.812a.316.316 0 00.311.366h3.484a.524.524 0 00.518-.442l2.494-15.812a.316.316 0 00-.311-.366zm5.073-.001h-3.475a.524.524 0 00-.518.442l-2.494 15.812a.316.316 0 00.311.366h3.475a.524.524 0 00.518-.442l2.494-15.812a.316.316 0 00-.311-.366z"
                    />
                    <path
                      fill="#fff"
                      d="M59.691 7.87h-6.959a.524.524 0 00-.518.442l-2.494 15.857a.316.316 0 00.311.366h3.566a.367.367 0 00.362-.31l.708-4.452a.524.524 0 01.518-.442h2.206c3.475 0 5.481-1.682 6.009-5.015.24-1.462.01-2.609-.683-3.415-.761-.879-2.112-1.343-3.916-1.343h-.11zm.608 4.941c-.288 1.898-1.734 1.898-3.132 1.898h-.8l.561-3.552a.315.315 0 01.311-.267h.367c.952 0 1.85 0 2.314.543.277.325.362.807.28 1.378zm15.17-4.94h-3.484a.315.315 0 00-.311.267l-2.494 15.812a.316.316 0 00.311.366h1.775a.524.524 0 00.518-.442l.675-4.24a.524.524 0 01.518-.442h2.206c3.475 0 5.481-1.682 6.009-5.015.24-1.462.01-2.609-.683-3.415-.761-.879-2.112-1.343-3.916-1.343h-.125zm.608 4.941c-.288 1.898-1.734 1.898-3.132 1.898h-.8l.561-3.552a.315.315 0 01.311-.267h.367c.952 0 1.85 0 2.314.543.277.325.362.807.28 1.378zm15.17-4.941h-3.484a.524.524 0 00-.518.442l-2.494 15.812a.316.316 0 00.311.366h3.484a.524.524 0 00.518-.442l2.494-15.812a.316.316 0 00-.311-.366z"
                    />
                  </svg>
                </div>
                <CardTitle>PayPal</CardTitle>
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
              <Label htmlFor="paypal-title">Payment Gateway Title</Label>
              <Input id="paypal-title" defaultValue="PayPal" />
            </div>

            <div className="space-y-2">
              <Label>Mode</Label>
              <RadioGroup
                defaultValue={testMode ? "sandbox" : "live"}
                className="flex"
              >
                <div className="flex items-center space-x-2 mr-4">
                  <RadioGroupItem value="sandbox" id="paypal-sandbox" />
                  <Label htmlFor="paypal-sandbox">Sandbox</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="live" id="paypal-live" />
                  <Label htmlFor="paypal-live">Live</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paypal-secret-key">
                Secret Key {testMode && "(Sandbox)"}
              </Label>
              <Input
                id="paypal-secret-key"
                type="password"
                placeholder="Secret key..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paypal-client-id">
                Published Key (Client ID) {testMode && "(Sandbox)"}
              </Label>
              <Input id="paypal-client-id" placeholder="Client ID..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paypal-logo">Choose Logo</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => handleTestConnection("PayPal")}
            >
              Test Connection
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveConfig}
            >
              Save
            </Button>
          </CardFooter>
        </Card>

        {/* Razorpay */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-[#072654] flex items-center justify-center">
                  <svg viewBox="0 0 512 512" width="24" height="24">
                    <path
                      fill="#fff"
                      d="M432 32H80c-26.51 0-48 21.49-48 48v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM337.28 297.28c-7.52 7.52-17.76 11.72-28.48 11.72-10.72 0-20.96-4.2-28.48-11.72L128 144.96 180.32 92.64l152.32 152.32c15.68 15.68 15.68 41.28 0 56.96l4.64-4.64z"
                    />
                  </svg>
                </div>
                <CardTitle>Razorpay</CardTitle>
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
              <Label htmlFor="razorpay-title">Payment Gateway Title</Label>
              <Input id="razorpay-title" defaultValue="Razorpay" />
            </div>

            <div className="space-y-2">
              <Label>Mode</Label>
              <RadioGroup
                defaultValue={testMode ? "test" : "live"}
                className="flex"
              >
                <div className="flex items-center space-x-2 mr-4">
                  <RadioGroupItem value="test" id="razorpay-test" />
                  <Label htmlFor="razorpay-test">Test</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="live" id="razorpay-live" />
                  <Label htmlFor="razorpay-live">Live</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="razorpay-secret-key">
                Secret Key {testMode && "(Test)"}
              </Label>
              <Input
                id="razorpay-secret-key"
                type="password"
                placeholder="Secret key..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="razorpay-key-id">
                Published Key (Key ID) {testMode && "(Test)"}
              </Label>
              <Input id="razorpay-key-id" placeholder="rzp_test_..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="razorpay-logo">Choose Logo</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => handleTestConnection("Razorpay")}
            >
              Test Connection
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveConfig}
            >
              Save
            </Button>
          </CardFooter>
        </Card>

        {/* Paystack */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-[#00c3f7] flex items-center justify-center">
                  <svg viewBox="0 0 512 512" width="24" height="24">
                    <path
                      fill="#fff"
                      d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208-93.3 208-208 208zm-32-112h64v-32h-64v32zm-96-16c0 53.02 42.98 96 96 96h64c53.02 0 96-42.98 96-96v-16H128v16z"
                    />
                  </svg>
                </div>
                <CardTitle>Paystack</CardTitle>
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
              <Label htmlFor="paystack-title">Payment Gateway Title</Label>
              <Input id="paystack-title" defaultValue="Paystack" />
            </div>

            <div className="space-y-2">
              <Label>Mode</Label>
              <RadioGroup
                defaultValue={testMode ? "test" : "live"}
                className="flex"
              >
                <div className="flex items-center space-x-2 mr-4">
                  <RadioGroupItem value="test" id="paystack-test" />
                  <Label htmlFor="paystack-test">Test</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="live" id="paystack-live" />
                  <Label htmlFor="paystack-live">Live</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paystack-secret-key">
                Secret Key {testMode && "(Test)"}
              </Label>
              <Input
                id="paystack-secret-key"
                type="password"
                placeholder="sk_test_..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paystack-public-key">
                Published Key {testMode && "(Test)"}
              </Label>
              <Input id="paystack-public-key" placeholder="pk_test_..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paystack-logo">Choose Logo</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => handleTestConnection("Paystack")}
            >
              Test Connection
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveConfig}
            >
              Save
            </Button>
          </CardFooter>
        </Card>

        {/* bKash */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-[#e2136e] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">bKash</span>
                </div>
                <CardTitle>bKash</CardTitle>
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
              <Label htmlFor="bkash-title">Payment Gateway Title</Label>
              <Input id="bkash-title" defaultValue="bKash" />
            </div>

            <div className="space-y-2">
              <Label>Mode</Label>
              <RadioGroup
                defaultValue={testMode ? "sandbox" : "live"}
                className="flex"
              >
                <div className="flex items-center space-x-2 mr-4">
                  <RadioGroupItem value="sandbox" id="bkash-sandbox" />
                  <Label htmlFor="bkash-sandbox">Sandbox</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="live" id="bkash-live" />
                  <Label htmlFor="bkash-live">Live</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bkash-secret-key">
                Secret Key {testMode && "(Sandbox)"}
              </Label>
              <Input
                id="bkash-secret-key"
                type="password"
                placeholder="Secret key..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bkash-app-key">
                Published Key (App Key) {testMode && "(Sandbox)"}
              </Label>
              <Input id="bkash-app-key" placeholder="App key..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bkash-logo">Choose Logo</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => handleTestConnection("bKash")}
            >
              Test Connection
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveConfig}
            >
              Save
            </Button>
          </CardFooter>
        </Card>

        {/* PayTabs */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-[#2d57a2] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PayTabs</span>
                </div>
                <CardTitle>PayTabs</CardTitle>
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
              <Label htmlFor="paytabs-title">Payment Gateway Title</Label>
              <Input id="paytabs-title" defaultValue="PayTabs" />
            </div>

            <div className="space-y-2">
              <Label>Mode</Label>
              <RadioGroup
                defaultValue={testMode ? "test" : "live"}
                className="flex"
              >
                <div className="flex items-center space-x-2 mr-4">
                  <RadioGroupItem value="test" id="paytabs-test" />
                  <Label htmlFor="paytabs-test">Test</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="live" id="paytabs-live" />
                  <Label htmlFor="paytabs-live">Live</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paytabs-secret-key">
                Secret Key {testMode && "(Test)"}
              </Label>
              <Input
                id="paytabs-secret-key"
                type="password"
                placeholder="Secret key..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paytabs-profile-id">
                Published Key (Profile ID) {testMode && "(Test)"}
              </Label>
              <Input id="paytabs-profile-id" placeholder="Profile ID..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paytabs-logo">Choose Logo</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => handleTestConnection("PayTabs")}
            >
              Test Connection
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveConfig}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
