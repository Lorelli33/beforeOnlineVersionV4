import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { format, addDays, startOfDay, addMonths, isValid, parseISO } from 'date-fns';

interface DateSelectorProps {
  selectedDate: string;
  selectedTime: string;
  returnDate?: string;
  returnTime?: string;
  isReturn?: boolean;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onReturnDateSelect?: (date: string) => void;
  onReturnTimeSelect?: (time: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function DateSelector({
  selectedDate,
  selectedTime,
  returnDate,
  returnTime,
  isReturn = false,
  onDateSelect,
  onTimeSelect,
  onReturnDateSelect,
  onReturnTimeSelect,
  onBack,
  onContinue
}: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    // If there's a valid selected date, use that as the initial month
    if (selectedDate && isValid(parseISO(selectedDate))) {
      return parseISO(selectedDate);
    }
    return new Date();
  });
  
  const [customTime, setCustomTime] = useState(selectedTime || "13:00");
  const [customReturnTime, setCustomReturnTime] = useState(returnTime || "13:00");
  const [activeTab, setActiveTab] = useState<'departure' | 'return'>('departure');
  const today = startOfDay(new Date());

  // Generate dates for the current month view
  const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDayOfWeek = startDate.getDay();
  
  // Create array of dates
  const dates = [];
  for (let i = 0; i < 42; i++) {
    const date = addDays(startDate, i - startDayOfWeek);
    if (i >= startDayOfWeek && date <= endDate) {
      dates.push(date);
    }
  }

  const handlePrevMonth = () => {
    setCurrentMonth(prev => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    if (activeTab === 'departure') {
      setCustomTime(newTime);
      onTimeSelect(newTime);
    } else {
      setCustomReturnTime(newTime);
      if (onReturnTimeSelect) onReturnTimeSelect(newTime);
    }
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    if (activeTab === 'departure') {
      onDateSelect(dateStr);
      
      // If return date is before the new departure date, update it
      if (isReturn && returnDate && parseISO(returnDate) < date) {
        if (onReturnDateSelect) onReturnDateSelect(dateStr);
      }
    } else if (isReturn && onReturnDateSelect) {
      // Ensure return date is not before departure date
      if (selectedDate && parseISO(selectedDate) <= date) {
        onReturnDateSelect(dateStr);
      }
    }
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      // Validate the date and time combination
      const dateTime = new Date(`${selectedDate}T${selectedTime}`);
      
      // For return flights, also validate return date/time
      if (isReturn && returnDate && returnTime) {
        const returnDateTime = new Date(`${returnDate}T${returnTime}`);
        const departureDateTime = new Date(`${selectedDate}T${selectedTime}`);
        
        if (isValid(returnDateTime) && isValid(departureDateTime) && returnDateTime > departureDateTime) {
          onContinue();
          return;
        } else if (!isValid(returnDateTime) || returnDateTime <= departureDateTime) {
          // If return date/time is invalid or before departure, don't continue
          return;
        }
      }
      
      if (isValid(dateTime) && dateTime > new Date()) {
        onContinue();
      }
    }
  };

  const isDateDisabled = (date: Date) => {
    return date < today;
  };

  const isDateSelected = (date: Date) => {
    if (activeTab === 'departure' && selectedDate) {
      const selectedDateTime = parseISO(selectedDate);
      return isValid(selectedDateTime) && 
             format(date, 'yyyy-MM-dd') === format(selectedDateTime, 'yyyy-MM-dd');
    } else if (activeTab === 'return' && returnDate) {
      const returnDateTime = parseISO(returnDate);
      return isValid(returnDateTime) && 
             format(date, 'yyyy-MM-dd') === format(returnDateTime, 'yyyy-MM-dd');
    }
    return false;
  };

  const isReturnDateDisabled = (date: Date) => {
    // Return date can't be before departure date
    return date < today || (selectedDate && date < parseISO(selectedDate));
  };

  return (
    <div className="h-full flex flex-col max-h-[calc(100vh-120px)] bg-white">
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-gray-600"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Select Date & Time
        </h2>
      </div>

      {/* Tabs for Return Flight */}
      {isReturn && (
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('departure')}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'departure' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Departure
          </button>
          <button
            onClick={() => setActiveTab('return')}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'return' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Return
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-8 bg-white">
          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {dates.map((date, index) => {
                const isSelected = isDateSelected(date);
                const isToday = format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
                const isDisabled = activeTab === 'departure' 
                  ? isDateDisabled(date) 
                  : isReturnDateDisabled(date);
                const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

                return (
                  <button
                    key={index}
                    onClick={() => !isDisabled && handleDateSelect(date)}
                    disabled={isDisabled}
                    className={`
                      flex flex-col items-center justify-center p-3 rounded-xl transition-all
                      ${isSelected 
                        ? 'bg-black text-white' 
                        : isDisabled
                          ? 'text-gray-300 cursor-not-allowed'
                          : isCurrentMonth
                            ? 'hover:bg-gray-100 text-gray-900'
                            : 'text-gray-400 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span className="text-sm">
                      {format(date, 'd')}
                    </span>
                    {isToday && (
                      <span className={`text-[10px] mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                        Today
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div id="time-selection" className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">
              {activeTab === 'departure' ? 'Select Departure Time' : 'Select Return Time'}
            </h3>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="time"
                value={activeTab === 'departure' ? customTime : customReturnTime}
                onChange={handleTimeChange}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-sm shadow-sm"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime || (isReturn && (!returnDate || !returnTime))}
            className="w-full bg-black text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-gray-900"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}