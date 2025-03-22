import React, { useEffect, useState } from 'react'
import { AllAgencyItem } from '../types';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { Skeleton } from '@mui/material';
import SearchContainer from '../../../components/LeadsOverview/SearchComponent';
import AgencyCard from '../AgencyCard';

type Props = {}

function index({ }: Props) {

    const [breadcrumbs] = useState([
        { link: "/dashboard", title: "Home" },
        { link: "/agencies", title: "agencies" },
        { link: "#", title: "All Agencies" },
    ]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [agencies, setAllAgencies] = useState<AllAgencyItem[]>([]);
    const [hasMore, setHasMore] = useState(true); // Track if there's more data to load
    const [isFetching, setIsFetching] = useState(false);

    const MAX_PAGES = 20; // Maximum number of pages to fetch



    useEffect(() => {
        if (data && data.data) {
            if (page === 1) {
                setAllAgencies(data.data);
            } else {
                setAllAgencies(prev => [...prev, ...data.data]);
            }

            if (data.data.length === 0 || data.data.length < 20 || page >= MAX_PAGES) {
                setHasMore(false); // No more data to fetch
            } else {
                setHasMore(true); // More data available
            }

            setIsFetching(false);
        }
    }, [data, page])

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1); // Reset to the first page when searching
        setAllAgencies([]);
        setHasMore(true); // Allow fetching new data
    }

    return (
        <section className='p-4 min-h-screen'>

            <Breadcrumb items={breadcrumbs} />

            <p className='text-lg text-[#141824] mt-4 pb-4 font-medium '>All Agencies</p>

            <div className="w-full mt-1">
                {isLoading && page === 1 ? (
                    <div className='grid gap-3 grid-cols-4 space-y-1'>
                        {Array.from({ length: 30 }).map((_, index) => (
                            <Skeleton key={index} variant="rectangular" width="100%" className='rounded-[6px]' height={80} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="max-w-[300px] w-full pb-4">
                            <SearchContainer
                                placeholder="Search something..."
                                value={search}
                                onChange={handleChangeSearch}
                                onClear={() => setSearch("")}
                                onSearch={() => console.log("Searching for:", search)}
                            />
                        </div>

                        <div className='grid gap-3 grid-cols-4 space-y-1'>
                            {agencies.map((item: AllAgencyItem, index: number) => (
                                <AgencyCard item={item} key={index} />
                            ))}
                        </div>

                        {isFetchingMore && (
                            <div className='grid gap-3 grid-cols-4 space-y-1 mt-4'>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <Skeleton key={index} variant="rectangular" width="100%" className='rounded-[6px]' height={80} />
                                ))}
                            </div>
                        )}

                        {(!hasMore || page >= MAX_PAGES) && (
                            <div className="text-center text-gray-500 mt-4">
                                No more items to load.
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}

export default index