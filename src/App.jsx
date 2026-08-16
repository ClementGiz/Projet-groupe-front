import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">

            <Header />

            <main className="flex-1">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="p-10">
                                <h1 className="text-3xl font-bold text-[#172A3A]">
                                 ACCUEIL
                                </h1>
                            </div>
                        }
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />
                </Routes>
            </main>

            <Footer />

        </div>
    );
}

export default App;