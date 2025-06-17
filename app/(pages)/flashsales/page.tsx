import { Bell, ChevronDown, Clock, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function FlashSales() {
  const flashSales = [
    {
      id: 1,
      name: "Summer Flash Sale",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      discount: "50% OFF",
      timeLeft: "2 days 5 hours",
      progress: 65,
      products: 24,
      status: "Active",
    },
    {
      id: 2,
      name: "Weekend Special",
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      discount: "30% OFF",
      timeLeft: "1 day 12 hours",
      progress: 45,
      products: 18,
      status: "Active",
    },
    {
      id: 3,
      name: "Clearance Sale",
      image:
        "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      discount: "70% OFF",
      timeLeft: "5 hours 30 minutes",
      progress: 85,
      products: 32,
      status: "Active",
    },
    {
      id: 4,
      name: "Holiday Special",
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      discount: "40% OFF",
      timeLeft: "Ended",
      progress: 100,
      products: 15,
      status: "Ended",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600 hover:bg-green-100";
      case "Ended":
        return "bg-gray-100 text-gray-600 hover:bg-gray-100";
      case "Scheduled":
        return "bg-blue-100 text-blue-600 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-100";
    }
  };

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Flash Sales</h2>
          <p className="text-gray-500">
            Create and manage limited-time promotions
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Create Flash Sale
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashSales.map((sale) => (
          <Card key={sale.id} className="overflow-hidden">
            <div className="relative h-40 w-full">
              <Image
                src={sale.image || "/placeholder.svg"}
                alt={sale.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className={getStatusColor(sale.status)}>
                  {sale.status}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md font-bold">
                {sale.discount}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{sale.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                <Clock size={16} />
                <span>{sale.timeLeft}</span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{sale.progress}%</span>
                </div>
                <Progress value={sale.progress} className="h-2" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{sale.products} products</span>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
