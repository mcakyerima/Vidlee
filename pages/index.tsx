import type { NextPage } from 'next'
import axios from 'axios';
import { Video } from '../types';
import VideoCard from '../components/VideoCard'
import NoResult from '../components/NoResult'


// creating a data type for our video using typescript interface
interface IProps { 
  videos: Video[] 
}

const Home  = ( { videos }: IProps) => {
  console.log(videos)
  console.log(videos.map((video) => video.video.asset.url))
  return (
    <div className="flex flex-col gap-10 video bg-primary h-full">
   
      {
        videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id}/>
          ))
        ) :
        <NoResult text= " No Videos Found"/>
      }
    </div>
  )
}

// making an api call to our database using axios and next js sereverside Props
export const getServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/post');

  return {
    props: {
      videos: data
    }
  }
}

export default Home
