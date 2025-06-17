"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
  showIcon?: boolean;
}

export default function Error({
  title = "Something went wrong",
  description = "We encountered an error while fetching the data. Please try again.",
  onRetry,
  retryLabel = "Try again",
  className,
  showIcon = true,
}: ErrorProps) {
  return (
    <Card
      className={cn("bg-destructive/5 border-none rounded-none", className)}
    >
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        {showIcon && (
          <div className="mb-4 text-destructive">
            <AlertCircle className="h-12 w-12" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          {description}
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="gap-2 bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
            {retryLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
