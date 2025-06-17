"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

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

export default function MailConfig() {
  const [testEmail, setTestEmail] = useState("");

  const handleSaveConfig = () => {
    toast({
      title: "Configuration saved",
      description: "Mail configuration has been updated successfully.",
    });
  };

  const handleTestMail = () => {
    if (!testEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address for testing.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Test email sent",
      description: `A test email has been sent to ${testEmail}.`,
    });
  };

  return (
    <div className="space-y-6 p-10">
      <div>
        <h1 className="text-3xl font-bold">Mail Configuration</h1>
        <p className="text-muted-foreground">
          Configure email settings for your application
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mail Configuration</CardTitle>
              <CardDescription>
                Configure your mail server settings
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
          <div className="space-y-2">
            <Label htmlFor="mail-mailer">Mail Mailer</Label>
            <Select defaultValue="smtp">
              <SelectTrigger id="mail-mailer">
                <SelectValue placeholder="Select mail mailer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smtp">SMTP</SelectItem>
                <SelectItem value="sendmail">Sendmail</SelectItem>
                <SelectItem value="mailgun">Mailgun</SelectItem>
                <SelectItem value="ses">Amazon SES</SelectItem>
                <SelectItem value="postmark">Postmark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mail-host">Mail Host</Label>
              <Input id="mail-host" placeholder="smtp.example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mail-port">Mail Port</Label>
              <Input id="mail-port" placeholder="587" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mail-username">Mail Username</Label>
              <Input id="mail-username" placeholder="username@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mail-password">Mail Password</Label>
              <Input
                id="mail-password"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mail-encryption">Mail Encryption</Label>
              <Select defaultValue="tls">
                <SelectTrigger id="mail-encryption">
                  <SelectValue placeholder="Select encryption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mail-from-address">Mail From Address</Label>
              <Input id="mail-from-address" placeholder="noreply@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mail-from-name">Mail From Name</Label>
            <Input id="mail-from-name" placeholder="Your Company Name" />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Input
              placeholder="Enter email address for testing"
              className="flex-1"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
            <Button variant="outline" onClick={handleTestMail}>
              <Send className="mr-2 h-4 w-4" /> Send Test Email
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

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>
            Configure which email templates are enabled
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Switch id="email-welcome" defaultChecked />
              <Label htmlFor="email-welcome">Welcome Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="email-order-confirmation" defaultChecked />
              <Label htmlFor="email-order-confirmation">
                Order Confirmation
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="email-shipping" defaultChecked />
              <Label htmlFor="email-shipping">Shipping Updates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="email-password-reset" defaultChecked />
              <Label htmlFor="email-password-reset">Password Reset</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="email-newsletter" defaultChecked />
              <Label htmlFor="email-newsletter">Newsletter</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="email-abandoned-cart" />
              <Label htmlFor="email-abandoned-cart">Abandoned Cart</Label>
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
