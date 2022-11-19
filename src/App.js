import { Outlet } from "react-router-dom";

import Header from './components/Header'
import Footer from './components/Footer'


export default function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className="bg-neutral-50 dark:bg-neutral-800 dark:text-white flex-1 p-4 md:p-8 mlg:py-12 lg:px-20">
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
}
