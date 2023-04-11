import type { NextPage, NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
// import useCurrentUser from '../hooks/useCurrentUser';
import Navbar from '../components/Navbar';
import Billboard from '../components/Billboard';
import MovieList from '../components/MovieList';
import useMoviesList from '../hooks/useMovieList';
import useFavorites from '../hooks/useFavorites';
import InfoModal from '../components/InfoModal';
import useInfoModalStore from '../hooks/useInfoModal';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Home: NextPage = () => {
  const { data: movies = [] } = useMoviesList();
  const { data: favorites =[] } = useFavorites();
  const {isOpen , closeModal} = useInfoModalStore();

  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard/>
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies}/>
        <MovieList title='My List' data={favorites} />
      </div>
    </>
  )
}

export default Home
