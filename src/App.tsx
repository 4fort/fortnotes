import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Notes from "./pages/Notes";
import AddNote from "./components/AddNote";
import UpdateNote from "./pages/UpdateNote";
import * as Dialog from "@radix-ui/react-dialog";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className='h-screen bg-neutral-900 text-white'>
          <nav className='h-20 flex flex-col justify-center items-center font-medium border-b-[1px] border-stone-700'>
            <h1>fortnotes</h1>
            <div className='w-full flex justify-evenly font-thin text-white/30'>
              <Link to='/'>Notes</Link>
              <Dialog.Root>
                <Dialog.Trigger>Add new note</Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
                  <Dialog.Content className='bg-neutral-900/40 backdrop-blur-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] rounded-lg p-6 text-white border-[1px] border-stone-700'>
                    <AddNote />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </nav>
          <Routes>
            <Route path='/' element={<Notes />} />
            <Route path='/:id' element={<UpdateNote />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
