import { Box, Button } from '@mui/material'
import { search } from '../../assets/images/webp'
import { FaNeuter } from 'react-icons/fa'

type Props = {}

function SearchBox({ }: Props) {
    return (
        <>
            <div className='md:flex hidden h-[40px] my-3 w-full border bg-white px-3 border-slate-200 rounded-md items-center relative'>
                <img src={search} className='w-4 h-4 brightness-95 object-cover' alt="" />
                <input type="search" placeholder='Search...' className=' outline-none px-2 w-full h-full' />
            </div>

            <Box  className="md:hidden mt-3 h-11 flex justify-center w-full">
                <Button
                    className=''
                    sx={{
                        color: "black",
                        width: "100%",
                        height:40,
                        minWidth:"auto",
                    }}>
                    <FaNeuter size={24} />
                </Button>
            </Box>
        </>

    )
}

export default SearchBox