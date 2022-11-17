import './home.scss';
import Navbar from '../../components/Navbar/Navbar';
import MovieTable  from '../../components/table/MovieTable';

const Home = () => {
  
  return (
    <div className='home'>

      <div className='header'>
        <Navbar/>
      </div>
      
      <MovieTable/>
    </div>
  )
}

export default Home