import { useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import ActionCard, { Icons } from "../../components/ActionCard/ActionCard";

type Props = {}


type Item = {
    label: string,
    link: string,
    icon: Icons
}

function index({ }: Props) {


    const data: Item[] = [
        {
            icon: 'add-icon',
            label: 'Add User',
            link: '/admin/users/add'
        },
        {
            icon: 'view-icon',
            label: 'Manage Users',
            link: '/admin/users/list'
        },
    ]


    const [breadcrumbs] = useState([
        { link: "/admin/manage-users", title: "Home" },
        { link: "/admin/manage-users", title: "Manage Ads" },
    ]);

    return (
        <div className='p-2 md:p-4 '>
            <Breadcrumb items={breadcrumbs} />
            <p className='text-lg text-[#141824] mt-4 pb-4 font-medium '>Manage Users</p>

            <div className="grid grid-cols-4 gap-4">

                {data.map((item: Item) => (
                    <ActionCard key={item.label} {...item} />
                ))}
            </div>
        </div>
    )
}

export default index