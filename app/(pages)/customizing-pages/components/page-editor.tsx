"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import type { PageType } from "../types/page-types"
import { SectionEditor } from "./section-editor"

interface PageEditorProps {
  page: PageType
  onPageChange: (page: PageType) => void
  onSave: () => void
  onSaveAsDraft: () => void
  onPublish: () => void
  onCancel: () => void
}

export function PageEditor({ page, onPageChange, onSave, onSaveAsDraft, onPublish, onCancel }: PageEditorProps) {
  const [activeSection, setActiveSection] = useState(0)

  const handleAddSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      type: "text",
      title: "New Section",
      content: "Add your content here",
    }
    const updatedSections = [...page.sections, newSection]
    onPageChange({ ...page, sections: updatedSections })
    setActiveSection(updatedSections.length - 1)
  }

  const handleDeleteSection = (index: number) => {
    if (page.sections.length <= 1) {
      return // Prevent deleting the last section
    }
    const updatedSections = [...page.sections]
    updatedSections.splice(index, 1)
    onPageChange({ ...page, sections: updatedSections })
    setActiveSection(Math.min(activeSection, updatedSections.length - 1))
  }

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === page.sections.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const updatedSections = [...page.sections]
    const [movedSection] = updatedSections.splice(index, 1)
    updatedSections.splice(newIndex, 0, movedSection)

    onPageChange({ ...page, sections: updatedSections })
    setActiveSection(newIndex)
  }

  const handleSectionChange = (sectionIndex: number, updatedSection: any) => {
    const updatedSections = [...page.sections]
    updatedSections[sectionIndex] = updatedSection
    onPageChange({ ...page, sections: updatedSections })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Page</CardTitle>
        <CardDescription>Make changes to your page content and layout</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input id="title" value={page.title} onChange={(e) => onPageChange({ ...page, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Page Slug</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/</span>
              <Input id="slug" value={page.slug} onChange={(e) => onPageChange({ ...page, slug: e.target.value })} />
            </div>
          </div>
        </div>

        <Separator />

        <SectionEditor
          sections={page.sections}
          activeSection={activeSection}
          onActiveChange={setActiveSection}
          onAddSection={handleAddSection}
          onDeleteSection={handleDeleteSection}
          onMoveSection={handleMoveSection}
          onSectionChange={handleSectionChange}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} className="border-blue-600 text-blue-600 hover:bg-blue-50">
          Cancel
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onSaveAsDraft} className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Save as Draft
          </Button>
          <Button variant="outline" onClick={onSave} className="border-blue-600 text-blue-600 hover:bg-blue-50">
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button onClick={onPublish} className="bg-blue-600 hover:bg-blue-700 text-white">
            Publish
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
