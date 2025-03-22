import LogoSection from "./LogoSection";
import Menus from "./Menus";
import SearchBox from "./SearchBox";


type Props = {};

function SideBar({ }: Props) {
    return (
        <aside className="fixed h-screen bg-white w-[60px]  md:w-[240px] p-1 md:p-3 left-0 z-50 ">
            <LogoSection />
            <SearchBox />
            <Menus />
        </aside>
    );
}

export default SideBar;
