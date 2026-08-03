import './App.scss';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import RouterConfig from './config/routerConfig';

function App() {

  return (
    <div className='app'>
      <Header />
      <div className='app__content'>
        <RouterConfig />
      </div>
      <Footer />
    </div>
  )
}

export default App;