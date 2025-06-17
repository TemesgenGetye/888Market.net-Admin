"use client"

import { ChevronDown, ImageIcon, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import type { SectionType } from "../types/page-types"

// Section type options
const sectionTypes = [
  { value: "hero", label: "Hero Section" },
  { value: "text", label: "Text Section" },
  { value: "text-with-image", label: "Text with Image" },
  { value: "gallery", label: "Image Gallery" },
]

interface SectionEditorProps {
  sections: SectionType[]
  activeSection: number
  onActiveChange: (index: number) => void
  onAddSection: () => void
  onDeleteSection: (index: number) => void
  onMoveSection: (index: number, direction: "up" | "down") => void
  onSectionChange: (index: number, section: SectionType) => void
}

export function SectionEditor({
  sections,
  activeSection,
  onActiveChange,
  onAddSection,
  onDeleteSection,
  onMoveSection,
  onSectionChange,
}: SectionEditorProps) {
  const handleSectionTypeChange = (type: string, index: number) => {
    const updatedSection = { ...sections[index], type }
    onSectionChange(index, updatedSection)
  }

  const handleFieldChange = (field: string, value: string, index: number) => {
    const updatedSection = { ...sections[index], [field]: value }
    onSectionChange(index, updatedSection)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Page Sections</h3>
        <Button onClick={onAddSection} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="space-y-4 md:col-span-1">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-blue-50 ${
                activeSection === index ? "border-blue-600 bg-blue-50" : ""
              }`}
              onClick={() => onActiveChange(index)}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{section.title}</p>
                  <p className="text-xs text-muted-foreground">{section.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation()
                    onMoveSection(index, "up")
                  }}
                  disabled={index === 0}
                >
                  <ChevronDown className="h-4 w-4 rotate-180" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation()
                    onMoveSection(index, "down")
                  }}
                  disabled={index === sections.length - 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteSection(index)
                  }}
                  disabled={sections.length <= 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border md:col-span-3">
          {sections[activeSection] && (
            <div className="p-4">
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="section-title">Section Title</Label>
                  <Input
                    id="section-title"
                    value={sections[activeSection].title}
                    onChange={(e) => handleFieldChange("title", e.target.value, activeSection)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section-type">Section Type</Label>
                  <Select
                    value={sections[activeSection].type}
                    onValueChange={(value) => handleSectionTypeChange(value, activeSection)}
                  >
                    <SelectTrigger id="section-type">
                      <SelectValue placeholder="Select section type" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Hero Section Fields */}
              {sections[activeSection].type === "hero" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-subtitle">Subtitle</Label>
                    <Input
                      id="hero-subtitle"
                      value={sections[activeSection].subtitle || ""}
                      onChange={(e) => handleFieldChange("subtitle", e.target.value, activeSection)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-image">Background Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id="hero-image"
                        value={sections[activeSection].image || ""}
                        onChange={(e) => handleFieldChange("image", e.target.value, activeSection)}
                      />
                      <Button variant="outline" className="flex-shrink-0">
                        <ImageIcon className="mr-2 h-4 w-4" /> Upload
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="hero-button-text">Button Text</Label>
                      <Input
                        id="hero-button-text"
                        value={sections[activeSection].buttonText || ""}
                        onChange={(e) => handleFieldChange("buttonText", e.target.value, activeSection)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-button-link">Button Link</Label>
                      <Input
                        id="hero-button-link"
                        value={sections[activeSection].buttonLink || ""}
                        onChange={(e) => handleFieldChange("buttonLink", e.target.value, activeSection)}
                      />
                    </div>
                  </div>
                  <div className="mt-4 aspect-[21/9] w-full overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={sections[activeSection].image || "/placeholder.svg?height=600&width=1200"}
                      alt="Hero preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Text Section Fields */}
              {sections[activeSection].type === "text" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-content">Content</Label>
                    <Textarea
                      id="text-content"
                      rows={8}
                      value={sections[activeSection].content || ""}
                      onChange={(e) => handleFieldChange("content", e.target.value, activeSection)}
                    />
                  </div>
                </div>
              )}

              {/* Text with Image Section Fields */}
              {sections[activeSection].type === "text-with-image" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-image-content">Content</Label>
                    <Textarea
                      id="text-image-content"
                      rows={6}
                      value={sections[activeSection].content || ""}
                      onChange={(e) => handleFieldChange("content", e.target.value, activeSection)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text-image">Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id="text-image"
                        value={sections[activeSection].image || ""}
                        onChange={(e) => handleFieldChange("image", e.target.value, activeSection)}
                      />
                      <Button variant="outline" className="flex-shrink-0">
                        <ImageIcon className="mr-2 h-4 w-4" /> Upload
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image-position">Image Position</Label>
                    <Select
                      value={sections[activeSection].imagePosition || "right"}
                      onValueChange={(value) => handleFieldChange("imagePosition", value, activeSection)}
                    >
                      <SelectTrigger id="image-position">
                        <SelectValue placeholder="Select image position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={sections[activeSection].image || "/placeholder.svg?height=400&width=600"}
                      alt="Image preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Gallery Section Fields */}
              {sections[activeSection].type === "gallery" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Gallery Images</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="relative aspect-square overflow-hidden rounded-lg border">
                          <img
                            src={`/placeholder.svg?height=300&width=300&text=Image ${i + 1}`}
                            alt={`Gallery image ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute bottom-2 right-2 h-8 w-8 rounded-full p-0"
                          >
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
