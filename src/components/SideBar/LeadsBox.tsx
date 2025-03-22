import React from 'react'
import { leads } from '../../assets/images/webp'

type Props = {}

function LeadsBox({ }: Props) {
  return (
    <div className='flex w-full border-slate-200 border justify-between px-4 items-center h-[40px] rounded-md bg-white'>
      <div className="flex items-center gap-1">
        <img src={leads} className='w-4 h-4 object-cover' alt="" />
        <label htmlFor="" className='sm:block hidden'>Leads</label>
      </div>
      <div className="font-medium sm:block hidden text-base">
        109
      </div>
    </div>
  )
}

export default LeadsBox