import {Outlet} from "react-router-dom"
import ThemeToggle from "@/components/ThemeToggle"

const Layout = () => {
    return (
        <>
            <div className="min-h-screen">
                <Outlet/>
            </div>
            <ThemeToggle/>
        </>
    )
}

export default Layout