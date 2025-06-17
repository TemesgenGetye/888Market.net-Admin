// import { Bell, ChevronDown, Filter, MoreVertical, Search } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";
// import RevenueChart from "@/components/report/RevenueChart";
// import SalesDonutChart from "@/components/report/SalesDonutChart";

// export default function Report() {
//   return (
//     <main className="p-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-gray-500">
//               Total Sales
//             </CardTitle>
//             <MoreVertical size={16} className="text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$34,456.00</div>
//             <div className="flex items-center mt-1">
//               <Badge className="bg-green-100 text-green-600 hover:bg-green-100 mr-2">
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="mr-1"
//                 >
//                   <path
//                     d="M12 19V5M12 5L5 12M12 5L19 12"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//                 14%
//               </Badge>
//               <span className="text-sm text-gray-500">in the last month</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-gray-500">
//               Total Order
//             </CardTitle>
//             <MoreVertical size={16} className="text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">3456</div>
//             <div className="flex items-center mt-1">
//               <Badge className="bg-red-100 text-red-600 hover:bg-red-100 mr-2">
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="mr-1"
//                 >
//                   <path
//                     d="M12 5V19M12 19L5 12M12 19L19 12"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//                 17%
//               </Badge>
//               <span className="text-sm text-gray-500">in the last month</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-gray-500">
//               Total Revenue
//             </CardTitle>
//             <MoreVertical size={16} className="text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$1,456.00</div>
//             <div className="flex items-center mt-1">
//               <Badge className="bg-green-100 text-green-600 hover:bg-green-100 mr-2">
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="mr-1"
//                 >
//                   <path
//                     d="M12 19V5M12 5L5 12M12 5L19 12"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//                 14%
//               </Badge>
//               <span className="text-sm text-gray-500">in the last moth</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-gray-500">
//               Total Customer
//             </CardTitle>
//             <MoreVertical size={16} className="text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">42,456</div>
//             <div className="flex items-center mt-1">
//               <Badge className="bg-red-100 text-red-600 hover:bg-red-100 mr-2">
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="mr-1"
//                 >
//                   <path
//                     d="M12 5V19M12 19L5 12M12 19L19 12"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//                 11%
//               </Badge>
//               <span className="text-sm text-gray-500">in the last month</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts and Tables */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="mb-4">
//               <h3 className="text-lg font-medium">Revenue</h3>
//               <div className="flex items-center gap-4 mt-2">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-full bg-blue-500"></div>
//                   <span className="text-sm">Current Week $58,211</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                   <span className="text-sm">Previous Week $68,768</span>
//                 </div>
//               </div>
//             </div>
//             <RevenueChart />
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 gap-6">
//           <Card>
//             <CardContent className="p-6">
//               <h3 className="text-lg font-medium mb-4">Sales By Location</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="relative h-[150px] w-full">
//                   <Image
//                     src="/img/map.gif"
//                     alt="World Map"
//                     fill
//                     className="object-cover rounded-lg"
//                   />
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium text-blue-600 border-b border-blue-600 pb-1">
//                       New York
//                     </span>
//                     <span className="text-sm">72K</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium">San Francisco</span>
//                     <span className="text-sm">39K</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium">Sydney</span>
//                     <span className="text-sm">25K</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium">Singapore</span>
//                     <span className="text-sm">61K</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <h3 className="text-lg font-medium mb-4">Total Sales</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <SalesDonutChart />
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-blue-500"></div>
//                       <span className="text-sm">Direct</span>
//                     </div>
//                     <span className="text-sm">$300.56</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-blue-500"></div>
//                       <span className="text-sm">Affiliate</span>
//                     </div>
//                     <span className="text-sm">$135.18</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
//                       <span className="text-sm">Sponsored</span>
//                     </div>
//                     <span className="text-sm">$154.02</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-teal-500"></div>
//                       <span className="text-sm">E-mail</span>
//                     </div>
//                     <span className="text-sm">$48.96</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Card className="lg:col-span-2">
//           <CardContent className="p-0">
//             <div className="flex items-center justify-between p-4 border-b border-gray-100">
//               <h3 className="text-lg font-medium">Top Selling Products</h3>
//               <div className="flex items-center gap-2">
//                 <Button variant="outline" size="sm" className="gap-2">
//                   <Filter size={16} />
//                   Filter
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   See All
//                 </Button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-100">
//                     <th className="w-10 p-4">
//                       <Checkbox />
//                     </th>
//                     <th className="p-4 text-left font-medium text-sm text-gray-500">
//                       <div className="flex items-center gap-1">
//                         Product Name
//                         <ChevronDown size={16} />
//                       </div>
//                     </th>
//                     <th className="p-4 text-left font-medium text-sm text-gray-500">
//                       <div className="flex items-center gap-1">
//                         Price
//                         <ChevronDown size={16} />
//                       </div>
//                     </th>
//                     <th className="p-4 text-left font-medium text-sm text-gray-500">
//                       <div className="flex items-center gap-1">
//                         Category
//                         <ChevronDown size={16} />
//                       </div>
//                     </th>
//                     <th className="p-4 text-left font-medium text-sm text-gray-500">
//                       <div className="flex items-center gap-1">
//                         Quantity
//                         <ChevronDown size={16} />
//                       </div>
//                     </th>
//                     <th className="p-4 text-left font-medium text-sm text-gray-500">
//                       <div className="flex items-center gap-1">
//                         Amount
//                         <ChevronDown size={16} />
//                       </div>
//                     </th>
//                     <th className="p-4 text-left font-medium text-sm text-gray-500">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="border-b border-gray-100">
//                     <td className="p-4">
//                       <Checkbox />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
//                           👕
//                         </div>
//                         <span>Shirt</span>
//                       </div>
//                     </td>
//                     <td className="p-4">$76.89</td>
//                     <td className="p-4">Man Cloths</td>
//                     <td className="p-4">128</td>
//                     <td className="p-4">$6,647.15</td>
//                     <td className="p-4">
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical size={16} />
//                       </Button>
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-100">
//                     <td className="p-4">
//                       <Checkbox />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
//                           👚
//                         </div>
//                         <span>T-Shirt</span>
//                       </div>
//                     </td>
//                     <td className="p-4">$79.80</td>
//                     <td className="p-4">Women Cloths</td>
//                     <td className="p-4">89</td>
//                     <td className="p-4">$6,647.15</td>
//                     <td className="p-4">
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical size={16} />
//                       </Button>
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-100">
//                     <td className="p-4">
//                       <Checkbox />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
//                           👖
//                         </div>
//                         <span>Pant</span>
//                       </div>
//                     </td>
//                     <td className="p-4">$86.65</td>
//                     <td className="p-4">Kid Cloths</td>
//                     <td className="p-4">74</td>
//                     <td className="p-4">$6,647.15</td>
//                     <td className="p-4">
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical size={16} />
//                       </Button>
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-100">
//                     <td className="p-4">
//                       <Checkbox />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
//                           🧥
//                         </div>
//                         <span>Sweater</span>
//                       </div>
//                     </td>
//                     <td className="p-4">$56.07</td>
//                     <td className="p-4">Man Cloths</td>
//                     <td className="p-4">69</td>
//                     <td className="p-4">$6,647.15</td>
//                     <td className="p-4">
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical size={16} />
//                       </Button>
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-100">
//                     <td className="p-4">
//                       <Checkbox />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
//                           🧥
//                         </div>
//                         <span>Light Jacket</span>
//                       </div>
//                     </td>
//                     <td className="p-4">$36.00</td>
//                     <td className="p-4">Women Cloths</td>
//                     <td className="p-4">65</td>
//                     <td className="p-4">$6,647.15</td>
//                     <td className="p-4">
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical size={16} />
//                       </Button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="p-4">
//                       <Checkbox />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
//                           👔
//                         </div>
//                         <span>Half Shirt</span>
//                       </div>
//                     </td>
//                     <td className="p-4">$46.78</td>
//                     <td className="p-4">Man Cloths</td>
//                     <td className="p-4">58</td>
//                     <td className="p-4">$6,647.15</td>
//                     <td className="p-4">
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical size={16} />
//                       </Button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-medium">Monthly Target</h3>
//               <Button variant="ghost" size="icon">
//                 <MoreVertical size={16} />
//               </Button>
//             </div>

//             <div className="text-center text-sm text-gray-500 mb-8">
//               Target you've set for each month
//             </div>

//             <div className="flex justify-center mb-4">
//               <div className="relative w-48 h-48">
//                 <div className="w-full h-full rounded-full border-[16px] border-gray-100"></div>
//                 <div
//                   className="absolute top-0 left-0 w-full h-full rounded-full border-[16px] border-transparent border-t-blue-600 border-r-blue-600 border-b-blue-600"
//                   style={{ transform: "rotate(90deg)" }}
//                 ></div>
//                 <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
//                   <div className="text-3xl font-bold">75.34%</div>
//                   <div className="text-sm text-green-500">+12%</div>
//                 </div>
//               </div>
//             </div>

//             <div className="text-center mb-8">
//               <p className="text-sm text-gray-600">
//                 You earn $3267 today, its higher than last month keep up your
//                 good trends!
//               </p>
//             </div>

//             <div className="grid grid-cols-3 gap-4 text-center">
//               <div>
//                 <div className="text-sm text-gray-500">Target</div>
//                 <div className="flex items-center justify-center gap-1 font-semibold">
//                   $25k
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="text-red-500"
//                   >
//                     <path
//                       d="M12 5V19M12 5L5 12M12 5L19 12"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-500">Revenue</div>
//                 <div className="flex items-center justify-center gap-1 font-semibold">
//                   $18k
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="text-green-500"
//                   >
//                     <path
//                       d="M12 19V5M12 5L5 12M12 5L19 12"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-500">Today</div>
//                 <div className="flex items-center justify-center gap-1 font-semibold">
//                   $1.8k
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="text-green-500"
//                   >
//                     <path
//                       d="M12 19V5M12 5L5 12M12 5L19 12"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// }

import React from "react";

export default function page() {
  return <div>Report</div>;
}
