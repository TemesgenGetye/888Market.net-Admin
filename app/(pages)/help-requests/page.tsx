"use client"

import { useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Filter,
  MessageSquare,
  MoreHorizontal,
  Search,
  Send,
  UserCircle,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Mock data for help requests
const mockHelpRequests = [
  {
    id: "req-1",
    user: {
      id: "user-1",
      name: "John Smith",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Payment issue with my recent order",
    status: "open",
    priority: "high",
    category: "Payment",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T14:45:00Z",
    assignedTo: null,
    messages: [
      {
        id: "msg-1",
        sender: "user",
        content:
          "I'm having trouble with my payment for order #12345. The payment was processed but the order still shows as 'payment pending'.",
        timestamp: "2023-05-15T10:30:00Z",
        attachments: [],
      },
      {
        id: "msg-2",
        sender: "system",
        content: "Your request has been received. A support agent will assist you shortly.",
        timestamp: "2023-05-15T10:31:00Z",
        attachments: [],
      },
    ],
  },
  {
    id: "req-2",
    user: {
      id: "user-2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Cannot access my account",
    status: "in-progress",
    priority: "medium",
    category: "Account",
    createdAt: "2023-05-14T09:15:00Z",
    updatedAt: "2023-05-15T11:20:00Z",
    assignedTo: {
      id: "agent-1",
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    messages: [
      {
        id: "msg-3",
        sender: "user",
        content:
          "I'm unable to log into my account. I've tried resetting my password but I'm not receiving the reset email.",
        timestamp: "2023-05-14T09:15:00Z",
        attachments: [],
      },
      {
        id: "msg-4",
        sender: "system",
        content: "Your request has been received. A support agent will assist you shortly.",
        timestamp: "2023-05-14T09:16:00Z",
        attachments: [],
      },
      {
        id: "msg-5",
        sender: "agent",
        content:
          "Hello Sarah, I'm Michael from customer support. I'll help you with your account access issue. Could you please confirm the email address you're trying to use for login?",
        timestamp: "2023-05-14T10:30:00Z",
        attachments: [],
      },
      {
        id: "msg-6",
        sender: "user",
        content: "Hi Michael, I'm using sarah@example.com for login.",
        timestamp: "2023-05-14T10:45:00Z",
        attachments: [],
      },
      {
        id: "msg-7",
        sender: "agent",
        content:
          "Thank you for confirming. I've checked our system and it seems there might be an issue with our email delivery to your domain. Let me try to send a password reset link manually.",
        timestamp: "2023-05-14T11:00:00Z",
        attachments: [],
      },
    ],
  },
  {
    id: "req-3",
    user: {
      id: "user-3",
      name: "David Martinez",
      email: "david@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Request for product return",
    status: "resolved",
    priority: "low",
    category: "Returns",
    createdAt: "2023-05-10T14:20:00Z",
    updatedAt: "2023-05-12T16:30:00Z",
    assignedTo: {
      id: "agent-2",
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    messages: [
      {
        id: "msg-8",
        sender: "user",
        content: "I'd like to return a product I purchased last week. It's not what I expected and I'd like a refund.",
        timestamp: "2023-05-10T14:20:00Z",
        attachments: [],
      },
      {
        id: "msg-9",
        sender: "system",
        content: "Your request has been received. A support agent will assist you shortly.",
        timestamp: "2023-05-10T14:21:00Z",
        attachments: [],
      },
      {
        id: "msg-10",
        sender: "agent",
        content:
          "Hello David, I'm Emily from customer support. I'd be happy to help with your return request. Could you please provide your order number?",
        timestamp: "2023-05-10T15:00:00Z",
        attachments: [],
      },
      {
        id: "msg-11",
        sender: "user",
        content: "Hi Emily, my order number is #67890.",
        timestamp: "2023-05-10T15:10:00Z",
        attachments: [],
      },
      {
        id: "msg-12",
        sender: "agent",
        content:
          "Thank you for providing your order number. I've processed your return request and you should receive a confirmation email shortly with instructions on how to return the item. Once we receive the item, we'll process your refund within 3-5 business days.",
        timestamp: "2023-05-10T15:30:00Z",
        attachments: [],
      },
      {
        id: "msg-13",
        sender: "user",
        content: "Thank you for your help!",
        timestamp: "2023-05-10T15:35:00Z",
        attachments: [],
      },
      {
        id: "msg-14",
        sender: "agent",
        content: "You're welcome! Is there anything else I can help you with today?",
        timestamp: "2023-05-10T15:40:00Z",
        attachments: [],
      },
      {
        id: "msg-15",
        sender: "user",
        content: "No, that's all. Thanks again!",
        timestamp: "2023-05-10T15:45:00Z",
        attachments: [],
      },
      {
        id: "msg-16",
        sender: "agent",
        content:
          "Great! I'm marking this request as resolved. If you have any other questions in the future, feel free to reach out to us. Have a wonderful day!",
        timestamp: "2023-05-10T15:50:00Z",
        attachments: [],
      },
    ],
  },
  {
    id: "req-4",
    user: {
      id: "user-4",
      name: "Lisa Thompson",
      email: "lisa@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Question about product specifications",
    status: "open",
    priority: "medium",
    category: "Product",
    createdAt: "2023-05-15T08:45:00Z",
    updatedAt: "2023-05-15T08:45:00Z",
    assignedTo: null,
    messages: [
      {
        id: "msg-17",
        sender: "user",
        content:
          "I'm interested in purchasing the XYZ product, but I have some questions about its specifications. Can you provide more details about its dimensions and compatibility?",
        timestamp: "2023-05-15T08:45:00Z",
        attachments: [],
      },
      {
        id: "msg-18",
        sender: "system",
        content: "Your request has been received. A support agent will assist you shortly.",
        timestamp: "2023-05-15T08:46:00Z",
        attachments: [],
      },
    ],
  },
  {
    id: "req-5",
    user: {
      id: "user-5",
      name: "Robert Garcia",
      email: "robert@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Shipping delay for order #54321",
    status: "in-progress",
    priority: "high",
    category: "Shipping",
    createdAt: "2023-05-13T16:20:00Z",
    updatedAt: "2023-05-15T09:30:00Z",
    assignedTo: {
      id: "agent-3",
      name: "Jennifer Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    messages: [
      {
        id: "msg-19",
        sender: "user",
        content:
          "My order #54321 was supposed to be delivered yesterday, but I haven't received it yet. Can you check the status?",
        timestamp: "2023-05-13T16:20:00Z",
        attachments: [],
      },
      {
        id: "msg-20",
        sender: "system",
        content: "Your request has been received. A support agent will assist you shortly.",
        timestamp: "2023-05-13T16:21:00Z",
        attachments: [],
      },
      {
        id: "msg-21",
        sender: "agent",
        content:
          "Hello Robert, I'm Jennifer from customer support. I apologize for the delay with your order. Let me check the status for you right away.",
        timestamp: "2023-05-13T17:00:00Z",
        attachments: [],
      },
      {
        id: "msg-22",
        sender: "agent",
        content:
          "I've checked with our shipping department, and it appears there was a delay at the distribution center. Your order has been processed and should be delivered within the next 24 hours. I'll send you the updated tracking information shortly.",
        timestamp: "2023-05-13T17:15:00Z",
        attachments: [],
      },
      {
        id: "msg-23",
        sender: "user",
        content: "Thank you for checking. I'll keep an eye out for the delivery.",
        timestamp: "2023-05-13T17:30:00Z",
        attachments: [],
      },
    ],
  },
]

// Mock data for support agents
const mockAgents = [
  {
    id: "agent-1",
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Senior Support Agent",
    status: "online",
  },
  {
    id: "agent-2",
    name: "Emily Wilson",
    email: "emily@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Support Agent",
    status: "online",
  },
  {
    id: "agent-3",
    name: "Jennifer Lee",
    email: "jennifer@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Support Agent",
    status: "busy",
  },
  {
    id: "agent-4",
    name: "Daniel Johnson",
    email: "daniel@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Support Supervisor",
    status: "offline",
  },
]

export default function HelpRequestsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [openStatusFilter, setOpenStatusFilter] = useState(false)
  const [openCategoryFilter, setOpenCategoryFilter] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message to send.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Reply sent",
      description: "Your reply has been sent to the user.",
    })

    setReplyMessage("")
  }

  const handleAssignRequest = (requestId: string, agentId: string) => {
    toast({
      title: "Request assigned",
      description: `Request has been assigned to ${mockAgents.find((agent) => agent.id === agentId)?.name}.`,
    })
  }

  const handleUpdateStatus = (requestId: string, status: string) => {
    toast({
      title: "Status updated",
      description: `Request status has been updated to ${status}.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Clock className="mr-1 h-3 w-3" /> Open
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <MessageSquare className="mr-1 h-3 w-3" /> In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Resolved
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const filteredRequests = mockHelpRequests.filter((request) => {
    // Filter by tab
    if (activeTab === "open" && request.status !== "open") return false
    if (activeTab === "in-progress" && request.status !== "in-progress") return false
    if (activeTab === "resolved" && request.status !== "resolved") return false
    if (activeTab === "assigned" && !request.assignedTo) return false
    if (activeTab === "unassigned" && request.assignedTo) return false

    // Filter by status dropdown
    if (selectedStatus && request.status !== selectedStatus) return false

    // Filter by category dropdown
    if (selectedCategory && request.category !== selectedCategory) return false

    // Filter by search
    if (
      searchQuery &&
      !request.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const selectedRequestData = selectedRequest
    ? mockHelpRequests.find((request) => request.id === selectedRequest)
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Help Requests</h1>
        <p className="text-muted-foreground">Manage and respond to customer support requests</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Requests</CardTitle>
                <div className="flex gap-2">
                  <Popover open={openStatusFilter} onOpenChange={setOpenStatusFilter}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-4 w-4" />
                        {selectedStatus ? selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) : "Status"}
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
                                setSelectedStatus(null)
                                setOpenStatusFilter(false)
                              }}
                            >
                              All Statuses
                            </CommandItem>
                            <CommandItem
                              onSelect={() => {
                                setSelectedStatus("open")
                                setOpenStatusFilter(false)
                              }}
                            >
                              Open
                            </CommandItem>
                            <CommandItem
                              onSelect={() => {
                                setSelectedStatus("in-progress")
                                setOpenStatusFilter(false)
                              }}
                            >
                              In Progress
                            </CommandItem>
                            <CommandItem
                              onSelect={() => {
                                setSelectedStatus("resolved")
                                setOpenStatusFilter(false)
                              }}
                            >
                              Resolved
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

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
                            <CommandItem
                              onSelect={() => {
                                setSelectedCategory("Payment")
                                setOpenCategoryFilter(false)
                              }}
                            >
                              Payment
                            </CommandItem>
                            <CommandItem
                              onSelect={() => {
                                setSelectedCategory("Account")
                                setOpenCategoryFilter(false)
                              }}
                            >
                              Account
                            </CommandItem>
                            <CommandItem
                              onSelect={() => {
                                setSelectedCategory("Product")
                                setOpenCategoryFilter(false)
                              }}
                            >
                              Product
                            </CommandItem>
                            <CommandItem
                              onSelect={() => {
                                setSelectedCategory("Shipping")
                                setOpenCategoryFilter(false)
                              }}
                            >
                              Shipping
                            </CommandItem>
                            <CommandItem
                              onSelect={() => {
                                setSelectedCategory("Returns")
                                setOpenCategoryFilter(false)
                              }}
                            >
                              Returns
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 bg-blue-50">
                  <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="open" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    Open
                  </TabsTrigger>
                  <TabsTrigger
                    value="in-progress"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    In Progress
                  </TabsTrigger>
                  <TabsTrigger
                    value="resolved"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Resolved
                  </TabsTrigger>
                  <TabsTrigger
                    value="unassigned"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Unassigned
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requests..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="max-h-[600px] overflow-auto">
                {filteredRequests.length === 0 ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="text-center">
                      <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">No requests found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Try adjusting your search or filter to find requests.
                      </p>
                    </div>
                  </div>
                ) : (
                  filteredRequests.map((request) => (
                    <div
                      key={request.id}
                      className={`flex cursor-pointer flex-col border-b p-4 hover:bg-blue-50 ${
                        selectedRequest === request.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedRequest(request.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={request.user.avatar || "/placeholder.svg"} alt={request.user.name} />
                            <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.user.name}</div>
                            <div className="text-sm text-muted-foreground">{request.user.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(request.status)}
                          {getPriorityBadge(request.priority)}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="font-medium">{request.subject}</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {request.messages[request.messages.length - 1].content.length > 100
                            ? `${request.messages[request.messages.length - 1].content.substring(0, 100)}...`
                            : request.messages[request.messages.length - 1].content}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {new Date(request.updatedAt).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{request.category}</Badge>
                          {request.assignedTo ? (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <UserCircle className="h-3 w-3" />
                              <span>{request.assignedTo.name}</span>
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground">Unassigned</div>
                          )}
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
          {selectedRequestData ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedRequestData.subject}</CardTitle>
                    <CardDescription>
                      Request #{selectedRequestData.id} • {selectedRequestData.category} •{" "}
                      {new Date(selectedRequestData.createdAt).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedRequestData.status)}
                    {getPriorityBadge(selectedRequestData.priority)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(selectedRequestData.id, "open")}
                          disabled={selectedRequestData.status === "open"}
                        >
                          Mark as Open
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(selectedRequestData.id, "in-progress")}
                          disabled={selectedRequestData.status === "in-progress"}
                        >
                          Mark as In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(selectedRequestData.id, "resolved")}
                          disabled={selectedRequestData.status === "resolved"}
                        >
                          Mark as Resolved
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Assign to</DropdownMenuLabel>
                        {mockAgents.map((agent) => (
                          <DropdownMenuItem
                            key={agent.id}
                            onClick={() => handleAssignRequest(selectedRequestData.id, agent.id)}
                            disabled={selectedRequestData.assignedTo?.id === agent.id}
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{agent.name}</span>
                              <div
                                className={`ml-1 h-2 w-2 rounded-full ${
                                  agent.status === "online"
                                    ? "bg-green-500"
                                    : agent.status === "busy"
                                      ? "bg-yellow-500"
                                      : "bg-gray-500"
                                }`}
                              ></div>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={selectedRequestData.user.avatar || "/placeholder.svg"}
                        alt={selectedRequestData.user.name}
                      />
                      <AvatarFallback>{selectedRequestData.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedRequestData.user.name}</div>
                      <div className="text-sm text-muted-foreground">{selectedRequestData.user.email}</div>
                    </div>
                  </div>
                  <div>
                    {selectedRequestData.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">Assigned to:</div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={selectedRequestData.assignedTo.avatar || "/placeholder.svg"}
                              alt={selectedRequestData.assignedTo.name}
                            />
                            <AvatarFallback>{selectedRequestData.assignedTo.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{selectedRequestData.assignedTo.name}</div>
                        </div>
                      </div>
                    ) : (
                      <Select onValueChange={(value) => handleAssignRequest(selectedRequestData.id, value)}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Assign to agent" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockAgents.map((agent) => (
                            <SelectItem key={agent.id} value={agent.id}>
                              <div className="flex items-center gap-2">
                                <span>{agent.name}</span>
                                <div
                                  className={`ml-1 h-2 w-2 rounded-full ${
                                    agent.status === "online"
                                      ? "bg-green-500"
                                      : agent.status === "busy"
                                        ? "bg-yellow-500"
                                        : "bg-gray-500"
                                  }`}
                                ></div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedRequestData.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-start" : "justify-end"
                      } ${message.sender === "system" ? "opacity-70" : ""}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === "user"
                            ? "bg-gray-100"
                            : message.sender === "system"
                              ? "bg-gray-200"
                              : "bg-blue-100"
                        }`}
                      >
                        {message.sender !== "user" && message.sender !== "system" && (
                          <div className="mb-1 flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={selectedRequestData.assignedTo?.avatar || "/placeholder.svg"}
                                alt={selectedRequestData.assignedTo?.name}
                              />
                              <AvatarFallback>{selectedRequestData.assignedTo?.name.charAt(0) || "A"}</AvatarFallback>
                            </Avatar>
                            <div className="text-xs font-medium">{selectedRequestData.assignedTo?.name}</div>
                          </div>
                        )}
                        <div>{message.content}</div>
                        <div className="mt-1 text-right text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Separator />
                {selectedRequestData.status !== "resolved" ? (
                  <div className="w-full space-y-4">
                    <Textarea
                      placeholder="Type your reply here..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={4}
                    />
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Add Template
                        </Button>
                        <Button variant="outline" size="sm">
                          Attach File
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleUpdateStatus(selectedRequestData.id, "resolved")}
                        >
                          Resolve
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSendReply}>
                          <Send className="mr-2 h-4 w-4" /> Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>This request has been resolved</span>
                    </div>
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-100"
                      onClick={() => handleUpdateStatus(selectedRequestData.id, "open")}
                    >
                      Reopen Request
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-8">
              <div className="text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No request selected</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select a request from the list to view details and respond.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
