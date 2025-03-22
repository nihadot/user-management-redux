import { useState } from 'react'
import ActionCard, { Icons } from '../../components/ActionCard/ActionCard'
import { Breadcrumb } from '../../components/Breadcrumb'

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
      label: 'Add Agencies',
      link: '/agencies/add'
    },
    {
      icon: 'view-icon',
      label: 'View Agencies',
      link: '/agencies/list'
    }
  ]


  const [breadcrumbs] = useState([
    { link: "/dashboard", title: "Home" },
    { link: "/agencies", title: "Agencies" },
  ]);



  return (
    <div className='p-2 md:p-4 '>
      <Breadcrumb items={breadcrumbs} />
      <p className='text-lg text-[#141824] mt-4 pb-4 font-medium '>All Agencies</p>

      <div className="grid grid-cols-4 gap-4">

        {data.map((item: Item) => (
          <ActionCard key={item.label} {...item} />
        ))}
      </div>
    </div>
  )
}

export default index