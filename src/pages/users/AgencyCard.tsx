import { AllAgencyItem } from './types'
import { FaPen, FaTrash } from 'react-icons/fa';
import { useDeleteEmirateMutation } from '../../features/emirate/emirateApi';
import { useNavigate } from 'react-router';
import { errorToast } from '../../components/Toast';
import { useDeleteDeveloperMutation } from '../../features/developers/developersApi';
import { useDeleteAgencyMutation } from '../../features/agency/agencyApi';
import { AllAmenitiesItem } from '../amenities/types';

type Props = {
    item: AllAmenitiesItem;
}

function AgencyCard({ item }: Props) {


    const [deleteAgency, { }] = useDeleteAgencyMutation();

    const handleDelete = async (row: any) => {
        try {
            if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
                await deleteAgency(row._id).unwrap();;
            }
        } catch (error: any) {

            errorToast(error?.data?.message || error.message || 'error occurred please try again later');

        }
    };

    const navigate = useNavigate();

    return (
        <div className='flex border rounded-[12px] w-full p-4 gap-1 border-[#DEDEDE] bg-white'>
            <div className="flex gap-0 w-full flex-col">
                <p className='text-lg font-normal font-poppins pb-2'>{item.name}</p>
                <div className="flex gap-2 w-full h-8 ">
                    <button onClick={() => handleDelete(item)} className='border flex justify-center items-center gap-3 bg-white rounded-[5px] text-black p-0 w-full'  >
                        <label htmlFor="" className='text-sm'>Delete</label>
                        <FaTrash size={12} />
                    </button>
                    <button onClick={() => navigate(`/agencies/edit/${item.slug}`)} className='border flex justify-center items-center gap-3 bg-[#DEDEDE] rounded-[5px] text-white w-full p-0'  > <label htmlFor="" className='text-sm text-black'>Edit</label>
                        <FaPen color='#000' size={12} /></button>
                </div>
            </div>
        </div>
    )
}

export default AgencyCard