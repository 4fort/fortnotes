import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Notes from "./pages/Notes";
import UpdateNote from "./pages/UpdateNote";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <main className='h-full bg-neutral-900 text-white'>
            <nav className='h-20 flex flex-col justify-center items-center font-medium border-b-[1px] border-stone-700'>
              <h1>fortnotes</h1>
              <div className='w-full flex justify-evenly font-thin text-white/30'>
                <Link to='/'>Notes</Link>
              </div>
            </nav>
            <Routes>
              <Route path='/' element={<Notes />} />
              <Route path='/:id' element={<UpdateNote />} />
            </Routes>
          </main>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
