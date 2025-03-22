import { FaArrowRight } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Link } from "react-router";

type BreadcrumbItem = {
  link: string;
  title: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[]; // Pass an array of breadcrumb items as props
};

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex py-2.5">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-start">
          <Link
            className=" text-[12.80px] text-black/60 font-medium"
            to={item.link}
          >
            {item.title}
          </Link>

          {/* Show right arrow icon between breadcrumb items, not after the last item */}
          {index < items.length - 1 && (
            <div className="mx-1">
              <FaArrowRight  size={10}/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;
