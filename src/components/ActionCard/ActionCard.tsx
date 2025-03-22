import { FaEdit, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';

export type Icons = 'add-icon' | 'edit-icon' | 'view-icon';
type Props = {
    label: string,
    link: string,
    icon: Icons
}

function ActionCard({ icon, label, link }: Props) {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(link)} className="h-14 border flex items-center justify-between px-4 w-full border-[#DEDEDE] rounded-[12px]">
            <label htmlFor="">{label}</label>
            {icon === 'add-icon' && <FaPlus />}
            {icon === 'view-icon' && <FaEdit />}
        </div>
    )
}

export default ActionCard