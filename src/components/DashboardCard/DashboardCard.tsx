import { DashboardItem } from '../../pages/types'

type Props = {
    item: DashboardItem
}

function DashboardCard({ item }: Props) {
    return (
        <div className='border bg-gray-100 border-gray-200  w-full rounded-md px-4 py-5 gap-3 flex items-center justify-start'>
            <img src={item.icons} alt="leads" className='w-8 h-8 object-cover' />
            <div className="flex gap-0 flex-col">
                <label htmlFor="" className='text-lg font-medium'>{item.count}</label>
                <label htmlFor="" className='text-sm font-normal hidden md:block '>{item.name}</label>
            </div>
        </div>
    )
}

export default DashboardCard