import { useState } from 'react'
import { Breadcrumb } from '../../../components/Breadcrumb';
import AddUserForm from './AddUserForm';

type Props = {}

function index({ }: Props) {

    const [breadcrumbs] = useState([
        { link: "/dashboard", title: "Home" },
        { link: "/agencies", title: "Agencies" },
        { link: "#", title: "Add Agencies" },
    ]);

    return (
        <section className='max-w-md p-4'>
            <Breadcrumb items={breadcrumbs} />
            <p className='text-lg text-[#141824] mt-4 pb-4 font-medium '>Add Agencies</p> 

            <AddUserForm/>
        </section>
    )
}

export default index