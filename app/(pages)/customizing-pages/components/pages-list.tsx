"use client"

import { useState } from "react"

import { Check, ChevronDown, Copy, Edit, FileText, Globe, MoreHorizontal, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { PageType } from "../types/page-types"

interface PagesListProps {
  pages: PageType[]
  selectedPage: PageType
  activeTab: string
  selectedStatus: string | null
  onSelectPage: (page: PageType) => void
  onDeletePage: (pageId: string) => void
  onDuplicatePage: (page: PageType) => void
  onTabChange: (value: string) => void
  onStatusChange: (status: string | null) => void
}

export function PagesList({
  pages,
  selectedPage,
  activeTab,
  selectedStatus,
  onSelectPage,
  onDeletePage,
  onDuplicatePage,
  onTabChange,
  onStatusChange,
}: PagesListProps) {
  const [openFilter, setOpenFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPages = pages.filter((page) => {
    // Filter by tab
    if (activeTab === "published" && page.status !== "Published") return false
    if (activeTab === "drafts" && page.status !== "Draft") return false

    // Filter by status dropdown
    if (selectedStatus && page.status !== selectedStatus) return false

    // Filter by search
    if (searchQuery && !page.title.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Pages</CardTitle>
          <div className="flex gap-2">
            <Popover open={openFilter} onOpenChange={setOpenFilter}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  {selectedStatus || "All Statuses"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="end">
                <Command>
                  <CommandInput placeholder="Filter status..." />
                  <CommandList>
                    <CommandEmpty>No status found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          onStatusChange(null)
                          setOpenFilter(false)
                        }}
                      >
                        <Check className={`mr-2 h-4 w-4 ${!selectedStatus ? "opacity-100" : "opacity-0"}`} />
                        All Statuses
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          onStatusChange("Published")
                          setOpenFilter(false)
                        }}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${selectedStatus === "Published" ? "opacity-100" : "opacity-0"}`}
                        />
                        Published
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          onStatusChange("Draft")
                          setOpenFilter(false)
                        }}
                      >
                        <Check className={`mr-2 h-4 w-4 ${selectedStatus === "Draft" ? "opacity-100" : "opacity-0"}`} />
                        Draft
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-3 bg-blue-50">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="published" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Published
            </TabsTrigger>
            <TabsTrigger value="drafts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Drafts
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2 px-4 py-2">
          <Input
            placeholder="Search pages..."
            className="h-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="max-h-[400px] overflow-auto">
          {filteredPages.map((page) => (
            <div
              key={page.id}
              className={`flex cursor-pointer items-center justify-between border-b p-4 hover:bg-blue-50 ${
                selectedPage.id === page.id ? "bg-blue-50" : ""
              }`}
              onClick={() => onSelectPage(page)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{page.title}</span>
                  <Badge variant={page.status === "Published" ? "default" : "outline"}>{page.status}</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  <span>/{page.slug}</span>
                  <span>•</span>
                  <span>Updated {page.lastUpdated}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectPage(page)
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onDuplicatePage(page)
                    }}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeletePage(page.id)
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
