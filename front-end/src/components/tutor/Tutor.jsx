import { Route, Routes } from "react-router-dom";
import { Registration } from "./Registration.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { TutorRegistrationProvider } from "./TutorRegistrationProvider";

export function Tutor() {
    return (
        <>
            <Routes>
                <Route path={`dashboard`} element={<Dashboard />} />
            </Routes>
        </>
    )
}