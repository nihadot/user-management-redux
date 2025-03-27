import LogoSection from "./LogoSection";
import Menus from "./Menus";


type Props = {};

function SideBar({ }: Props) {
    return (
        <aside className="fixed h-screen bg-white w-[60px]  md:w-[240px] p-1 md:p-3 left-0 z-50 ">
            <LogoSection />
            <Menus />
        </aside>
    );
}

export default SideBar;
