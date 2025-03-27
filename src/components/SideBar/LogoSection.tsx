import clsx from "clsx";
type Props = {}

function    LogoSection({ }: Props) {
    return (
        <>
            <div className={clsx("flex items-center py-1 w-full  justify-between")}>
                <p className="font-bold m-auto">Admin Dashboard</p>

            </div>
        </>
    )
}

export default LogoSection