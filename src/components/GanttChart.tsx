import React, { useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { Room, Booking } from '@/src/types';
import { cn } from '@/lib/utils';

interface GanttChartProps {
  rooms: Room[];
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
}

const START_HOUR = 0;
const HOURS_TO_SHOW = 24;
const SLOT_WIDTH = 64; 
const TIME_SLOTS = Array.from({ length: HOURS_TO_SHOW }, (_, i) => i);

export default function GanttChart({ rooms, bookings, onBookingClick }: GanttChartProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'paid': return 'bg-[#C0DD97] text-[#2d3126]';
      case 'waiting': return 'bg-[#FAC775] text-[#2d3126]';
      case 'offline': return 'bg-[#D3D1C7] text-[#2d3126]';
      default: return 'bg-gray-200';
    }
  };

  const getTimeOffset = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    const decimalHours = h + m / 60;
    return decimalHours * SLOT_WIDTH;
  };

  const getBookingWidth = (duration: number) => {
    return duration * SLOT_WIDTH;
  };

  return (
    <div className="relative flex flex-col bg-white overflow-hidden rounded-lg border border-gray-200">
      <div className="overflow-x-auto" ref={scrollRef}>
        <div className="min-w-max flex flex-col">
          {/* Time Header */}
          <div className="flex border-b border-gray-200 bg-gray-50/50">
            <div className="w-[180px] min-w-[180px] sticky left-0 z-30 bg-gray-50 p-4 py-2 text-[11px] font-bold uppercase text-gray-400 border-r border-gray-200">
              Room Details
            </div>
            {TIME_SLOTS.map((hour) => (
              <div 
                key={hour} 
                className="w-[64px] min-w-[64px] py-2 text-[10px] font-bold text-gray-400 border-r border-gray-100 last:border-r-0 text-center"
              >
                {hour.toString().padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="flex flex-col max-h-[600px] overflow-y-auto">
            <div className="flex min-w-max">
              {/* Room Labels Column (Sticky) */}
              <div className="w-[180px] min-w-[180px] sticky left-0 z-20 bg-white border-r border-gray-200">
                {rooms.map((room) => (
                  <div 
                    key={room.id} 
                    className="h-[42px] px-4 flex flex-col justify-center border-b border-gray-100"
                  >
                    <span className="font-semibold text-[13px] leading-tight truncate">{room.name}</span>
                    <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tight">
                      {room.capacity} Pax
                    </span>
                  </div>
                ))}
              </div>

              {/* Timeline View area */}
              <div className="relative flex-1 bg-white">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 flex pointer-events-none">
                  {TIME_SLOTS.map((hour) => (
                    <div 
                      key={hour} 
                      className="w-[64px] min-w-[64px] h-full border-r border-gray-50 last:border-r-0"
                    />
                  ))}
                </div>

                {/* Rows & Booking Bars */}
                <div className="relative z-10 flex flex-col">
                  {rooms.map((room) => {
                    const roomBookings = bookings.filter(b => b.roomId === room.id);
                    return (
                      <div key={room.id} className="h-[42px] relative border-b border-gray-100 group transition-colors">
                        {roomBookings.map((booking) => (
                          <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02, zIndex: 10 }}
                            onClick={() => onBookingClick(booking)}
                            className={cn(
                              "absolute top-[7px] h-[28px] rounded-md shadow-sm px-2 flex items-center justify-center cursor-pointer transition-all hover:shadow-md border-none",
                              getStatusColor(booking.status)
                            )}
                            style={{
                              left: `${getTimeOffset(booking.startTime)}px`,
                              width: `${getBookingWidth(booking.duration)}px`,
                            }}
                          >
                            <span className="text-[10px] font-bold truncate">
                              {booking.startTime} - {booking.endTime}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
