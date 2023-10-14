import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Notes from "./pages/Notes";
import AddNote from "./pages/AddNote";
import UpdateNote from "./pages/UpdateNote";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className='h-screen bg-neutral-900 text-white'>
          <nav className='h-20 flex flex-col justify-center items-center font-medium border-b-[1px] border-stone-700'>
            <h1>fortnotes</h1>
            <div className='w-full flex justify-evenly font-thin text-white/30'>
              <Link to='/'>Notes</Link>
              <Link to='/add'>Add new note</Link>
            </div>
          </nav>
          <Routes>
            <Route path='/' element={<Notes />} />
            <Route path='/add' element={<AddNote />} />
            <Route path='/:id' element={<UpdateNote />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
