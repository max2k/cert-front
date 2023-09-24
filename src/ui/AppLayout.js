import { Outlet } from "react-router-dom"
import Header from "./Header"

function AppLayout() {
    return (
        <div>
            <Header/>

            <div className="overflow-scrol">
                <main className="mx-auto max-w-3xl" >
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default AppLayout
