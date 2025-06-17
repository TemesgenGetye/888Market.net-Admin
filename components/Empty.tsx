import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface EmptyProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  className?: string;
}

export default function Empty({
  icon,
  title,
  description,
  action,
  className,
}: EmptyProps) {
  return (
    <Card className={cn("border-none rounded-none", className)}>
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            {description}
          </p>
        )}
        {action && (
          <Button
            onClick={action.onClick}
            variant={action.variant || "default"}
            className="bg-blue-500 hover:bg-blue-600 transition"
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
