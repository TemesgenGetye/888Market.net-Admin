import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"

import type { PageType } from "../types/page-types"
import { SectionRenderer } from "./section-renderer"

interface PageViewerProps {
  page: PageType
}

export function PageViewer({ page }: PageViewerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{page.title}</CardTitle>
        <CardDescription>
          URL: /{page.slug} • Status: {page.status} • Last Updated: {page.lastUpdated}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {page.sections.map((section, index) => (
          <div key={section.id} className="rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">
                Section {index + 1}: {section.type}
              </h3>
            </div>
            <SectionRenderer section={section} />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant={page.status === "Published" ? "default" : "outline"}
              className={
                page.status === "Published" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-600 border-blue-600"
              }
            >
              {page.status}
            </Badge>
            <span className="text-sm text-muted-foreground">Last updated: {page.lastUpdated}</span>
          </div>
          <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            <Eye className="mr-2 h-4 w-4" /> View on Site
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
