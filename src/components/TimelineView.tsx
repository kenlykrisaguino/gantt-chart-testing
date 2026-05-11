import React, { useState, useMemo } from 'react';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { 
  LayoutDashboard, 
  Table as TableIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

import { BRANCHES, ROOMS, MOCK_BOOKINGS } from '@/src/data';
import { Booking, Room, BookingStatus } from '@/src/types';
import GanttChart from './GanttChart';
import BookingDetailModal from './BookingDetailModal';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TimelineView() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2026-05-11'));
  const [selectedBranch, setSelectedBranch] = useState<string>(BRANCHES[0].name);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBookings = useMemo(() => {
    const curDateStr = format(currentDate, 'yyyy-MM-dd');
    return MOCK_BOOKINGS.filter(b => b.date === curDateStr && b.branch === selectedBranch);
  }, [currentDate, selectedBranch]);

  const handlePrevDay = () => setCurrentDate(prev => subDays(prev, 1));
  const handleNextDay = () => setCurrentDate(prev => addDays(prev, 1));
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F1EFE8] p-4 md:p-8 font-sans text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList className="text-[10px] uppercase tracking-widest font-bold">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-gray-400 hover:text-gray-600">DASHBOARD</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-300"> / </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin" className="text-gray-400 hover:text-gray-600">ADMIN</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-300"> / </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/orders" className="text-gray-400 hover:text-gray-600">ORDERS</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-300"> / </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-orange-600">TIMELINE VIEW</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold text-gray-900">Booking timeline</h1>
            <p className="text-[11px] text-gray-500 font-medium">Visual overview of room bookings and availability</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-gray-200 h-9 px-4 text-xs font-bold flex items-center gap-2 rounded-md shadow-sm">
              <TableIcon className="w-4 h-4" />
              Table view
            </Button>
            <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white h-9 px-4 text-xs font-bold flex items-center gap-2 rounded-md shadow-[0_4px_10px_rgba(255,87,34,0.2)]">
              <Plus className="w-4 h-4" />
              Add order
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="p-3 border-gray-200 bg-white shadow-sm rounded-lg border-[0.5px]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Branch</span>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-[180px] h-8 bg-gray-50/50 border-gray-200 text-sm font-semibold">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map(branch => (
                      <SelectItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-8 w-px bg-gray-200" />
              
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Select Date</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={handlePrevDay} className="h-8 w-8 hover:bg-gray-100">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-bold text-gray-800 w-32 text-center">{format(currentDate, 'dd MMMM yyyy')}</span>
                  <Button variant="ghost" size="icon" onClick={handleNextDay} className="h-8 w-8 hover:bg-gray-100">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Popover>
                    <PopoverTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 text-[#FF5722] hover:bg-orange-50 cursor-pointer")}>
                      <CalendarIcon className="w-4 h-4" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={currentDate}
                        onSelect={(date) => date && setCurrentDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pr-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C0DD97]" />
                <span className="text-[11px] text-gray-600 font-bold">Paid</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FAC775]" />
                <span className="text-[11px] text-gray-600 font-bold">Waiting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D3D1C7]" />
                <span className="text-[11px] text-gray-600 font-bold">Offline</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Gantt Chart Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-0">
          <GanttChart 
            rooms={ROOMS} 
            bookings={filteredBookings} 
            onBookingClick={handleBookingClick}
          />
        </div>

        {/* Detail Modal */}
        {selectedBooking && (
          <BookingDetailModal 
            booking={selectedBooking}
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
          />
        )}
      </div>
    </div>
  );
}
