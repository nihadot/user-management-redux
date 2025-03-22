import {  FaUser } from "react-icons/fa";
import { logo } from "../../assets/images/webp"
import clsx from "clsx";
import { Box, Button } from "@mui/material";
type Props = {}

function LogoSection({}: Props) {
  return (
    <>
                <div className={clsx("flex items-center py-1 w-full justify-between")}>
                    <img src={logo} className="w-32 h-8 md:block hidden object-contain" alt="" />
                    <Box  className="h-11 md:hidden flex justify-center w-full">
                <Button
                    className=''
                    sx={{
                        color: "black",
                        width: "100%",
                        minWidth:"auto",
                    }}>
                    <FaUser size={20} />
                </Button>
            </Box>
                </div>
            </>
  )
}

export default LogoSection