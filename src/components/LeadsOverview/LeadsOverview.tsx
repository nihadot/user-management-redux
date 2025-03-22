import { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import SearchBox from '../SideBar/SearchBox';
import { Agent, Category, Developer, Status } from './Filter';
import DatePickerComponent from './Filter/DatePickerComponent';
import Table from './Filter/Table';
import SearchContainer from './SearchComponent';

type Props = {}

function LeadsOverview({ }: Props) {
    const [selectedValue, setSelectedValue] = useState<string | number>('');
    const [searchValue, setSearchValue] = useState<string>('');

    const handleChange = (e: any) => {
        const value = e.target.value;
        setSelectedValue(value); // Update state with selected value
        console.log(value, 'Selected Value');
        // You can trigger table updates or filter data here
    };

    const handleChangeSearch = (e: any) => {
        setSearchValue(e.target.value);
        // You can trigger table updates or filter data here
    }

    const options = [
        {
            id: 1,
            value: 'Category 1',
            label: 'Category 1'
        },
        {
            id: 2,
            value: 'Category 2',
            label: 'Category 2'
        },
        {
            id: 3,
            value: 'Category 3',
            label: 'Category 3'
        },
        {
            id: 4,
            value: 'Category 4',
            label: 'Category 4'
        }, {
            id: 5,
            value: 'Category 5',
            label: 'Category 5'
        }, {
            id: 6,
            value: 'Category 6',
            label: 'Category 6'
        }, {
            id: 7,
            value: 'Category 7',
            label: 'Category 7'
        }, {
            id: 8,
            value: 'Category 8',
            label: 'Category 8'
        }, {
            id: 9,
            value: 'Category 9',
            label: 'Category 9'
        }, {
            id: 10,
            value: 'Category 10',
            label: 'Category 10'
        }, {
            id: 11,
            value: 'Category 11',
            label: 'Category 11'
        }, {
            id: 12,
            value: 'Category 12',
            label: 'Category 12'
        }, {
            id: 13,
            value: 'Category 13',
            label: 'Category 13'
        }, {
            id: 14,
            value: 'Category 14',
            label: 'Category 14'
        }, {
            id: 15,
            value: 'Category 15',
            label: 'Category 15'
        }, {
            id: 16,
            value: 'Category 16',
            label: 'Category 16'
        }, {
            id: 17,
            value: 'Category 17',
            label: 'Category 17'
        }, {
            id: 18,
            value: 'Category 18',
            label: 'Category 18'
        }, {
            id: 19,
            value: 'Category 19',
            label: 'Category 19'
        }, {
            id: 20,
            value: 'Category 20',
            label: 'Category 20'
        }
    ]

    const [search, setSearch] = useState("");


    return (
        <div className='mt-10'>
            <h3 className='font-medium text-lg pb-2'>Leads Overview</h3>
            <div className="flex items-center justify-between w-full gap-0 h-full">
                {/* <div className="max-w-[250px] h-[55px] w-full">
                    <SearchBox />
                </div> */}

                <SearchContainer
                    placeholder="Search something..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => setSearch("")}
                    onSearch={() => console.log("Searching for:", search)}
                />

                <div className="flex max-w-[800px] gap-3 items-center w-full">


                </div>
            </div>

            <div className=" h-[300px] max-w-[1200px] ">
                <Table />
            </div>
        </div>
    )
}

export default LeadsOverview;
