import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState , useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // by default we will assume our app is serverside rendered
  // so we set isServerside to true
  const [isServerside, setIsServerside] = useState(true);

  // use a useEffect hook to set serverSide render to false
  // since our app has already been rendered if a useEffect hook is called
  useEffect(() => {
    setIsServerside(false);
   
  }, [])

   // if isServerside then we dont wanna show our components
  //  if(isServerside) return null;
   return (
    <div>
      <Navbar/>
      <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh overflow-hidden xl:hover:overflow-auto">
            <Sidebar/>
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[80vh] videos flex-1">
              <Component {...pageProps} />
          </div>
      </div>
    </div>
   )
}

export default MyApp
