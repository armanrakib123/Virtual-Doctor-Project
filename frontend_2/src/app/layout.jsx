import '../index.css';
import AppContextProvider from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Virtual Doctor',
  description: 'Book doctor appointments online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <div className='mx-4 sm:mx-[10%]'>
            <ToastContainer />
            <Navbar />
            {children}
            <Footer />
          </div>
        </AppContextProvider>
      </body>
    </html>
  );
}
