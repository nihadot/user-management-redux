import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { agentItem } from '../../../data';

type Props = {}

function Agent({ }: Props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full h-[55px]" ref={dropdownRef}>
            {/* Agent Selector */}
            <div
                className=" h-full border rounded-md border-gray-200 flex justify-between items-center px-3 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {/* Selected Agent or Placeholder */}
                {selectedAgent ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-black">{selectedAgent}</span>
                        <FaTimes
                            size={12}
                            className="text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAgent(null);
                            }}
                        />
                    </div>
                ) : (
                    <span className="text-sm text-black/60 block">Agent</span>
                )}

                {/* Chevron Icon */}
                <FaChevronDown
                    size={14}
                    className={clsx("text-black/70 block transition-all duration-300", isDropdownOpen ? 'rotate-180' : 'rotate-0')}
                />
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute z-10 left-0 top-12 right-0 bg-white border border-gray-200 text-black/70 text-sm rounded-md shadow-lg p-1 flex flex-col gap-0"
                    >
                        {agentItem.map((item, index) => (
                            <li
                                key={index}
                                className="cursor-pointer px-3 py-2 hover:bg-gray-100 rounded"
                                onClick={() => {
                                    setSelectedAgent(item.name);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Agent;
