"use client"

import { useState } from "react"
import { ChevronDown, Edit, FileText, Filter, MoreHorizontal, Plus, Search, Trash, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Mock data for help notes
const mockHelpNotes = [
  {
    id: "note-1",
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions to reset your password. Follow the link in the email and create a new password.",
    category: "Account",
    tags: ["password", "login", "account"],
    usageCount: 156,
    createdAt: "2023-03-10T14:30:00Z",
    updatedAt: "2023-04-15T09:20:00Z",
  },
  {
    id: "note-2",
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your account and going to the 'Orders' section. Click on the order you want to track and you'll see the current status and tracking information. Alternatively, you can use the tracking number provided in your order confirmation email on our tracking page.",
    category: "Orders",
    tags: ["tracking", "shipping", "orders"],
    usageCount: 243,
    createdAt: "2023-02-05T11:15:00Z",
    updatedAt: "2023-05-01T16:45:00Z",
  },
  {
    id: "note-3",
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. For some regions, we also offer payment options like bank transfers and cash on delivery. All payments are processed securely through our payment gateway.",
    category: "Payment",
    tags: ["payment", "checkout"],
    usageCount: 189,
    createdAt: "2023-01-20T10:00:00Z",
    updatedAt: "2023-04-10T13:30:00Z",
  },
  {
    id: "note-4",
    question: "How do I return a product?",
    answer:
      "To return a product, go to your account and select the order containing the item you wish to return. Click on 'Return Items' and follow the instructions. You'll need to select a reason for the return and print a return label. Please note that returns must be initiated within 30 days of delivery and the product must be in its original condition.",
    category: "Returns",
    tags: ["returns", "refunds"],
    usageCount: 211,
    createdAt: "2023-02-15T09:45:00Z",
    updatedAt: "2023-05-05T14:20:00Z",
  },
  {
    id: "note-5",
    question: "How long does shipping take?",
    answer:
      "Shipping times vary depending on your location and the shipping method selected at checkout. Standard shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders. Express shipping options are available for faster delivery. You can see the estimated delivery date during checkout.",
    category: "Shipping",
    tags: ["shipping", "delivery"],
    usageCount: 178,
    createdAt: "2023-03-01T13:20:00Z",
    updatedAt: "2023-04-20T11:10:00Z",
  },
  {
    id: "note-6",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary by destination. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient. These charges are not included in our shipping fees and will be collected upon delivery.",
    category: "Shipping",
    tags: ["shipping", "international"],
    usageCount: 132,
    createdAt: "2023-02-25T15:40:00Z",
    updatedAt: "2023-04-18T10:30:00Z",
  },
  {
    id: "note-7",
    question: "How do I apply a coupon code?",
    answer:
      "To apply a coupon code, add items to your cart and proceed to checkout. On the checkout page, you'll find a field labeled 'Coupon Code' or 'Discount Code'. Enter your code in this field and click 'Apply'. The discount will be automatically applied to your order if the code is valid and meets all requirements.",
    category: "Payment",
    tags: ["coupon", "discount", "checkout"],
    usageCount: 167,
    createdAt: "2023-03-15T12:10:00Z",
    updatedAt: "2023-05-02T09:45:00Z",
  },
  {
    id: "note-8",
    question: "What is your refund policy?",
    answer:
      "Our refund policy allows for full refunds on items returned within 30 days of delivery, provided they are in their original condition with all tags and packaging intact. Once we receive and inspect the returned item, we will process your refund within 3-5 business days. The refund will be issued to the original payment method used for the purchase.",
    category: "Returns",
    tags: ["refunds", "returns", "policy"],
    usageCount: 198,
    createdAt: "2023-01-30T14:50:00Z",
    updatedAt: "2023-04-25T16:15:00Z",
  },
  {
    id: "note-9",
    question: "How do I change my shipping address?",
    answer:
      "You can change your shipping address for an order only if it hasn't been shipped yet. To do this, log into your account, go to your orders, and select the order you want to modify. Click on 'Change Shipping Address' and enter the new address. If the order has already been shipped, please contact our customer support team for assistance.",
    category: "Shipping",
    tags: ["shipping", "address", "orders"],
    usageCount: 124,
    createdAt: "2023-03-05T10:30:00Z",
    updatedAt: "2023-04-30T13:40:00Z",
  },
  {
    id: "note-10",
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team through multiple channels. For immediate assistance, use the live chat feature on our website during business hours. You can also email us at support@example.com or call our toll-free number at 1-800-123-4567. Our support team is available Monday through Friday, 9 AM to 6 PM EST.",
    category: "Support",
    tags: ["contact", "support", "help"],
    usageCount: 221,
    createdAt: "2023-02-10T11:25:00Z",
    updatedAt: "2023-05-03T15:50:00Z",
  },
]

export default function HelpNotesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [openCategoryFilter, setOpenCategoryFilter] = useState(false)
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false)
  const [isEditNoteDialogOpen, setIsEditNoteDialogOpen] = useState(false)
  const [newNote, setNewNote] = useState({
    question: "",
    answer: "",
    category: "",
    tags: "",
  })

  const handleAddNote = () => {
    if (!newNote.question || !newNote.answer || !newNote.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Note added",
      description: "The help note has been added successfully.",
    })

    setIsAddNoteDialogOpen(false)
    setNewNote({
      question: "",
      answer: "",
      category: "",
      tags: "",
    })
  }

  const handleEditNote = () => {
    toast({
      title: "Note updated",
      description: "The help note has been updated successfully.",
    })

    setIsEditNoteDialogOpen(false)
  }

  const handleDeleteNote = (noteId: string) => {
    toast({
      title: "Note deleted",
      description: "The help note has been deleted successfully.",
    })

    if (selectedNote === noteId) {
      setSelectedNote(null)
    }
  }

  const filteredNotes = mockHelpNotes.filter((note) => {
    // Filter by tab
    if (activeTab !== "all" && note.category.toLowerCase() !== activeTab.toLowerCase()) return false

    // Filter by category dropdown
    if (selectedCategory && note.category !== selectedCategory) return false

    // Filter by search
    if (
      searchQuery &&
      !note.question.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !note.answer.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    return true
  })

  const selectedNoteData = selectedNote ? mockHelpNotes.find((note) => note.id === selectedNote) : null

  const categories = Array.from(new Set(mockHelpNotes.map((note) => note.category)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Help Notes</h1>
          <p className="text-muted-foreground">Manage suggested questions and answers for customer support</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddNoteDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Note
        </Button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Notes</CardTitle>
                <div className="flex gap-2">
                  <Popover open={openCategoryFilter} onOpenChange={setOpenCategoryFilter}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-4 w-4" />
                        {selectedCategory || "Category"}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="end">
                      <Command>
                        <CommandInput placeholder="Filter category..." />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => {
                                setSelectedCategory(null)
                                setOpenCategoryFilter(false)
                              }}
                            >
                              All Categories
                            </CommandItem>
                            {categories.map((category) => (
                              <CommandItem
                                key={category}
                                onSelect={() => {
                                  setSelectedCategory(category)
                                  setOpenCategoryFilter(false)
                                }}
                              >
                                {category}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6 bg-blue-50">
                  <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="payment"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Payment
                  </TabsTrigger>
                  <TabsTrigger
                    value="shipping"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Shipping
                  </TabsTrigger>
                  <TabsTrigger
                    value="returns"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Returns
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notes..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="max-h-[600px] overflow-auto">
                {filteredNotes.length === 0 ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="text-center">
                      <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">No notes found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Try adjusting your search or filter to find notes.
                      </p>
                    </div>
                  </div>
                ) : (
                  filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      className={`flex cursor-pointer flex-col border-b p-4 hover:bg-blue-50 ${
                        selectedNote === note.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedNote(note.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="font-medium">{note.question}</div>
                        <Badge variant="outline">{note.category}</Badge>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {note.answer.length > 100 ? `${note.answer.substring(0, 100)}...` : note.answer}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {note.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{note.usageCount} uses</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          {selectedNoteData ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedNoteData.question}</CardTitle>
                    <CardDescription>
                      Category: {selectedNoteData.category} • Last updated:{" "}
                      {new Date(selectedNoteData.updatedAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setIsEditNoteDialogOpen(true)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Note
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteNote(selectedNoteData.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Note
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="font-medium">Question</div>
                  <div className="mt-2">{selectedNoteData.question}</div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="font-medium">Answer</div>
                  <div className="mt-2 whitespace-pre-line">{selectedNoteData.answer}</div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="font-medium">Category</div>
                    <div className="mt-2">
                      <Badge variant="outline">{selectedNoteData.category}</Badge>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="font-medium">Tags</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedNoteData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="font-medium">Usage Count</div>
                    <div className="mt-2 text-2xl font-bold">{selectedNoteData.usageCount}</div>
                    <div className="text-xs text-muted-foreground">Times used by support agents</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="font-medium">Created</div>
                    <div className="mt-2">{new Date(selectedNoteData.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(selectedNoteData.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="font-medium">Last Updated</div>
                    <div className="mt-2">{new Date(selectedNoteData.updatedAt).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(selectedNoteData.updatedAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditNoteDialogOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Note
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Use in Response</Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-8">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No note selected</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select a note from the list to view details or{" "}
                  <button className="text-blue-600 hover:underline" onClick={() => setIsAddNoteDialogOpen(true)}>
                    create a new note
                  </button>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Note Dialog */}
      <Dialog open={isAddNoteDialogOpen} onOpenChange={setIsAddNoteDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Help Note</DialogTitle>
            <DialogDescription>Create a new help note for customer support agents.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                placeholder="Enter the question"
                value={newNote.question}
                onChange={(e) => setNewNote({ ...newNote, question: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                placeholder="Enter the answer"
                rows={6}
                value={newNote.answer}
                onChange={(e) => setNewNote({ ...newNote, answer: e.target.value })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newNote.category} onValueChange={(value) => setNewNote({ ...newNote, category: value })}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Tags help agents find relevant notes quickly</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAddNote}>
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Note Dialog */}
      <Dialog open={isEditNoteDialogOpen} onOpenChange={setIsEditNoteDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Help Note</DialogTitle>
            <DialogDescription>Update the help note details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-question">Question</Label>
              <Input id="edit-question" placeholder="Enter the question" defaultValue={selectedNoteData?.question} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-answer">Answer</Label>
              <Textarea
                id="edit-answer"
                placeholder="Enter the answer"
                rows={6}
                defaultValue={selectedNoteData?.answer}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select defaultValue={selectedNoteData?.category}>
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tags">Tags</Label>
                <Input
                  id="edit-tags"
                  placeholder="Enter tags separated by commas"
                  defaultValue={selectedNoteData?.tags.join(", ")}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleEditNote}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
