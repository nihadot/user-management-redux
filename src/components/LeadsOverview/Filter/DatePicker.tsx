import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

type Props = {};

function CustomDatePicker({}: Props) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Handle Date Change
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        console.log("Selected Date:", date);
        setIsOpen(false); // Close the calendar after selection
    };

    return (
        <div className="relative w-64">
            {/* Input Box (Click to Show Picker) */}
            <div 
                className="flex items-center border rounded-lg px-3 py-2 cursor-pointer border-gray-300 bg-gray-100 hover:bg-gray-200 transition-all"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedDate ? (
                    <div className="flex items-center gap-2 w-full justify-between">
                        <span className="text-sm">{selectedDate.toLocaleString()}</span>
                        <FaTimes
                            size={14}
                            className="text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent closing picker
                                setSelectedDate(null);
                            }}
                        />
                    </div>
                ) : (
                    <span className="text-sm text-gray-500">Pick Date & Time</span>
                )}

                <FaCalendarAlt size={16} className="text-gray-600 ml-2" />
            </div>

            {/* Date Picker (Appears When Clicking the Input Box) */}
            {isOpen && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg p-2 z-10">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()} // Prevent past date selection
                        maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))} // Selectable within 3 months
                        inline
                    />
                </div>
            )}

            <input type="date" name="" id="" />
            <input type="time" name="" id="" />
        </div>
    );
}

export default CustomDatePicker;
