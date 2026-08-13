import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
function App() {
  return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Login />
        </main>

        <Footer />
      </div>
  );
}

export default App;

