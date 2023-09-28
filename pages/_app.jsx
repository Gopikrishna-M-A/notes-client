import Navbar from '../components/Utils/navbar';
import Foot from '../components/Utils/footer';
import '../public/styles/app.css'
import { CloseSquareFilled } from '@ant-design/icons';

function App({ Component, pageProps }) {
  return (
    <div className='layout'>
      <Navbar className='navbar-layout'/>
      <Component {...pageProps} className='content-layout'/>
      <Foot className='footer-layout'/>
    </div>
  );
}

export default App;