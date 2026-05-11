import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  DoorClosed, 
  MapPin, 
  Trash2, 
  Edit3, 
  Printer,
  ChevronRight
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Booking } from '@/src/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface BookingDetailModalProps {
  booking: Booking;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingDetailModal({ booking, isOpen, onOpenChange }: BookingDetailModalProps) {
  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'paid': return <Badge className="bg-[#C0DD97] text-[#3D5221] hover:bg-[#C0DD97] border-none px-3 py-1 text-xs rounded-full">Paid</Badge>;
      case 'waiting': return <Badge className="bg-[#FAC775] text-[#63481D] hover:bg-[#FAC775] border-none px-3 py-1 text-xs rounded-full">Waiting</Badge>;
      case 'offline': return <Badge className="bg-[#D3D1C7] text-[#42423F] hover:bg-[#D3D1C7] border-none px-3 py-1 text-xs rounded-full">Offline</Badge>;
      default: return null;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-none rounded-xl shadow-2xl">
        <div className="bg-white p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                {booking.status === 'paid' && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">PAID</span>
                )}
                {booking.status === 'waiting' && (
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full">WAITING</span>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">#{booking.orderId}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600 rounded-full h-8 w-8">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50/80 rounded-lg border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 font-bold shadow-sm">
              {booking.customerName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{booking.customerName}</p>
              <p className="text-xs text-gray-500 font-medium">{booking.customerPhone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
              <Calendar className="w-3.5 h-3.5 text-gray-400" /> {format(new Date(booking.date), 'dd MMMM yyyy')}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
              <Clock className="w-3.5 h-3.5 text-gray-400" /> {booking.startTime} - {booking.endTime} ({booking.duration}h)
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
              <DoorClosed className="w-3.5 h-3.5 text-gray-400" /> {booking.roomName}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-gray-400" /> {booking.branch}
            </div>
          </div>

          {/* Visual Timeline Bar */}
          <div className="mb-8 px-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Visual Timeline</p>
            <div className="h-1.5 w-full bg-gray-100 rounded-full relative overflow-hidden">
              {(() => {
                const [startH, startM] = booking.startTime.split(':').map(Number);
                const adjustedStart = startH + startM / 60;
                const leftPos = (adjustedStart / 24) * 100;
                const widthPos = (booking.duration / 24) * 100;
                
                return (
                  <div 
                    className={cn(
                      "absolute h-full rounded-full transition-all duration-500",
                      booking.status === 'paid' ? 'bg-[#C0DD97]' : 
                      booking.status === 'waiting' ? 'bg-[#FAC775]' : 'bg-[#D3D1C7]'
                    )}
                    style={{
                      left: `${leftPos}%`,
                      width: `${widthPos}%`
                    }}
                  />
                );
              })()}
            </div>
            <div className="flex justify-between mt-1 text-[9px] font-black text-gray-300 tracking-tighter">
              <span>12:00 AM</span>
              <span>12:00 PM</span>
              <span>11:59 PM</span>
            </div>
          </div>

          <div className="border-t border-gray-50 pt-5 mb-6 space-y-2">
            {booking.charges.map((charge, index) => (
              <div key={index} className="flex justify-between text-xs font-bold text-gray-400">
                <div className="flex flex-col">
                  <span>{charge.name}</span>
                  {charge.description && <span className="text-[10px] font-normal text-gray-400/80">{charge.description}</span>}
                </div>
                <span className="text-gray-600">{formatCurrency(charge.nominal)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-1">
              <span className="text-sm font-bold text-gray-900">Total Payment</span> 
              <span className="text-lg font-bold text-[#FF5722]">{formatCurrency(booking.total)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 py-1 px-0 text-[10px] font-bold border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 h-9 flex items-center justify-center gap-1 rounded-md">
              <Trash2 className="w-3.5 h-3.5" /> Cancel
            </Button>
            <Button variant="outline" className="flex-1 py-1 px-0 text-[10px] font-bold border-gray-200 text-gray-600 hover:bg-gray-50 h-9 flex items-center justify-center gap-1 rounded-md">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </Button>
            <Button className="flex-1 py-1 px-0 text-[10px] font-bold bg-[#FF5722] hover:bg-[#E64A19] text-white h-9 flex items-center justify-center gap-1 rounded-md shadow-md shadow-orange-500/20">
              <Printer className="w-3.5 h-3.5" /> Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
