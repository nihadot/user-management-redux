import { FaAdversal, FaBlog, FaCity, FaItunes, FaLanguage, FaLongArrowAltUp, FaMeteor, FaNewspaper, FaProjectDiagram, FaRProject, FaSignOutAlt, FaUsers, FaVideo } from "react-icons/fa";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router";
import { JSX, useState } from "react";
import { motion } from "framer-motion";

type MenuItem = {
    id: number;
    name: string;
    link?: string;
    icon: JSX.Element;
    subMenu?: { name: string; link: string; icon: JSX.Element; }[];
};

// Define menu items
const menuItems: MenuItem[] = [
    { id: 1, link: "/admin/manage-users", name: "Manage Users", icon: <FaRProject /> },
    { id: 2, link: "/profile", name: "Profile", icon: <FaMeteor /> },
   
];

const Menus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const handleToggle = (id: number) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);


    const handleLogout = async () => {
        try {
            await logout().unwrap(); // ✅ Calls API and handles errors
            navigate("/login"); // ✅ Redirect after successful logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <motion.div
            className="flex flex-col gap-2 mt-3 w-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {menuItems.map((item) => {
                const isActive = location.pathname === item.link;

                return (
                    <div key={item.id} className="w-full">
                        {/* Main Menu Item */}
                        <motion.div
                            onClick={() => {
                                if (item.subMenu) {
                                    handleToggle(item.id);
                                } else if (item.link) {
                                    navigate(item.link);
                                }
                            }}
                            className={clsx(
                                "flex px-4 w-full  rounded-md cursor-pointer h-11 justify-between items-center py-3 gap-3 transition-all",
                                {
                                    "bg-black text-white": isActive,
                                    "hover:bg-gray-200 hover:text-black": !isActive
                                }
                            )}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <motion.label
                                    className="md:flex hidden text-sm"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {item.name}
                                </motion.label>
                            </div>
                            {item.subMenu && (
                                <motion.span
                                    animate={{ rotate: openDropdown === item.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaChevronDown />
                                </motion.span>
                            )}
                        </motion.div>

                        {/* Dropdown Menu with Animation */}
                        {item.subMenu && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: openDropdown === item.id ? "auto" : 0,
                                    opacity: openDropdown === item.id ? 1 : 0
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="flex w-[140px] px-2 md:px-0  md:pl-10 md:w-full flex-col bg-white border md:border-none border-gray-200 rounded-lg md:rounded-none py-3 absolute md:relative gap-1 left-16 md:left-0 transition-all">
                                    {item.subMenu.map((subItem, idx) => {
                                        const isSubActive = location.pathname === subItem.link;

                                        return (
                                            <motion.div
                                                key={idx}
                                                onClick={() => navigate(subItem.link)}
                                                className={clsx(
                                                    "text-black flex px-3 h-10 md:h-12 border border-transparent w-full cursor-pointer items-center gap-2 transition-all rounded-md",
                                                    {
                                                        "bg-gray-900 text-white": isSubActive,
                                                        "hover:bg-gray-100": !isSubActive
                                                    }
                                                )}
                                                whileTap={{ scale: 0.98 }}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: idx * 0.08 }}
                                            >
                                                {subItem.icon}
                                                <span className="text-sm">{subItem.name}</span>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                            </motion.div>
                        )}
                    </div>
                );
            })}


            {/* logout */}
            {/* Logout Menu */}
            <motion.div
                onClick={() => setShowLogoutPrompt(true)} // ✅ Show logout prompt
                className="flex px-4 w-full rounded-md cursor-pointer h-11 justify-between items-center py-3 gap-3 transition-all hover:bg-gray-200 hover:text-black"
                whileTap={{ scale: 0.95 }}
            >
                <div className="flex items-center gap-3">
                    <FaSignOutAlt />
                    <motion.label
                        className="md:flex hidden text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        Logout
                    </motion.label>
                </div>
            </motion.div>



            {/* Logout Confirmation Modal */}
            {showLogoutPrompt && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={handleLogout} // ✅ Confirm logout
                            >
                                Logout
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={() => setShowLogoutPrompt(false)} // ✅ Cancel logout
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </motion.div>
    );
};

export default Menus;
