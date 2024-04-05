import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AttendeeList } from "./pages/attendee-list";
import { Header } from "./components/header";
import { Events } from "./pages/events";
import { NotFound } from "./pages/404";

export function App() {
    return (
        <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/eventos" Component={Events}></Route>
                    <Route path="/participantes" Component={AttendeeList}></Route>
                    <Route path="*" Component={NotFound}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}




