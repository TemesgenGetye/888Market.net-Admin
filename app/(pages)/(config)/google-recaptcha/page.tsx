"use client";

import { useState } from "react";
import { Check, Shield } from "lucide-react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

export default function GoogleRecaptchaConfig() {
  const [recaptchaVersion, setRecaptchaVersion] = useState("v3");

  const handleSaveConfig = () => {
    toast({
      title: "Configuration saved",
      description:
        "Google reCAPTCHA configuration has been updated successfully.",
    });
  };

  const handleTestRecaptcha = () => {
    toast({
      title: "Test successful",
      description: "Google reCAPTCHA is configured correctly.",
    });
  };

  return (
    <div className="space-y-6 p-10">
      <div>
        <h1 className="text-3xl font-bold">Google reCAPTCHA</h1>
        <p className="text-muted-foreground">
          Configure Google reCAPTCHA to protect your forms from spam
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>reCAPTCHA Configuration</CardTitle>
              <CardDescription>
                Configure your Google reCAPTCHA settings
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
            <Label>reCAPTCHA Version</Label>
            <RadioGroup
              value={recaptchaVersion}
              onValueChange={setRecaptchaVersion}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="v2" id="recaptcha-v2" />
                <Label htmlFor="recaptcha-v2">reCAPTCHA v2 (Checkbox)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="v2-invisible"
                  id="recaptcha-v2-invisible"
                />
                <Label htmlFor="recaptcha-v2-invisible">
                  reCAPTCHA v2 (Invisible)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="v3" id="recaptcha-v3" />
                <Label htmlFor="recaptcha-v3">reCAPTCHA v3</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recaptcha-site-key">Site Key</Label>
            <Input
              id="recaptcha-site-key"
              placeholder="6LdXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recaptcha-secret-key">Secret Key</Label>
            <Input
              id="recaptcha-secret-key"
              type="password"
              placeholder="6LdXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            />
          </div>

          {recaptchaVersion === "v3" && (
            <div className="space-y-2">
              <Label htmlFor="recaptcha-score-threshold">Score Threshold</Label>
              <Select defaultValue="0.5">
                <SelectTrigger id="recaptcha-score-threshold">
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.1">0.1 (Very permissive)</SelectItem>
                  <SelectItem value="0.3">0.3 (Permissive)</SelectItem>
                  <SelectItem value="0.5">0.5 (Balanced)</SelectItem>
                  <SelectItem value="0.7">0.7 (Strict)</SelectItem>
                  <SelectItem value="0.9">0.9 (Very strict)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Score threshold determines how strict the reCAPTCHA check is.
                Lower values are more permissive.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label>Enable reCAPTCHA On</Label>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Switch id="recaptcha-login" defaultChecked />
                <Label htmlFor="recaptcha-login">Login Form</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="recaptcha-register" defaultChecked />
                <Label htmlFor="recaptcha-register">Registration Form</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="recaptcha-contact" defaultChecked />
                <Label htmlFor="recaptcha-contact">Contact Form</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="recaptcha-password-reset" defaultChecked />
                <Label htmlFor="recaptcha-password-reset">Password Reset</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="recaptcha-checkout" />
                <Label htmlFor="recaptcha-checkout">Checkout Form</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="recaptcha-comments" />
                <Label htmlFor="recaptcha-comments">Comments</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleTestRecaptcha}>
            <Shield className="mr-2 h-4 w-4" /> Test reCAPTCHA
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
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>
            Configure advanced reCAPTCHA settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="recaptcha-hide-badge">Hide reCAPTCHA Badge</Label>
              <Switch id="recaptcha-hide-badge" />
            </div>
            <p className="text-sm text-muted-foreground">
              Hide the reCAPTCHA badge on your website. Note: You must include
              the reCAPTCHA terms of service in your website if you hide the
              badge.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="recaptcha-debug-mode">Debug Mode</Label>
              <Switch id="recaptcha-debug-mode" />
            </div>
            <p className="text-sm text-muted-foreground">
              Enable debug mode to log reCAPTCHA events to the console
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recaptcha-language">Language</Label>
            <Select defaultValue="auto">
              <SelectTrigger id="recaptcha-language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
              </SelectContent>
            </Select>
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
