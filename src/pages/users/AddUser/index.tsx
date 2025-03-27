import { useState } from 'react'
import { Breadcrumb } from '../../../components/Breadcrumb';
import AddUserForm from './AddUserForm';

type Props = {}

function index({ }: Props) {

    const [breadcrumbs] = useState([
        { link: "/admin", title: "Home" },
        { link: "/admin/manage-users", title: "Manage Users" },
        { link: "#", title: "Add User" },
    ]);

    return (
        <section className='p-4'>
            <Breadcrumb items={breadcrumbs} />
            <p className='text-lg text-[#141824] mt-4 pb-4 font-medium '>Add User</p>

            <AddUserForm />
        </section>
    )
}

export default index