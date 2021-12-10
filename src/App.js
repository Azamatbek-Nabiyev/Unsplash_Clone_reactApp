import React,{ useState } from 'react'
import axios from 'axios';
import { SRLWrapper } from 'simple-react-lightbox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './App.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

function App() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);

  const ACCESS_KEY = "k7YnjnQ573_lq7z4MJiu3m-URMsjXDMTno_xYN-tQ00";



  const getImages = () => {
    const urlAPI = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + ACCESS_KEY;

    if(image){
      axios.get(urlAPI).then((res) => {
        setResult(res.data.results)
      })
    } else {
      window.alert("Input is empty !")
    }
  }
  console.log(result);

  return (
    <SRLWrapper>
      <div>
        <p className='title'>Unsplash.com clone</p>
        <div className='search-section'>
            <input 
              type='text' 
              placeholder="let's search..." 
              onChange={(e) => {setImage(e.target.value)}}
            />
            <button onClick={getImages} type='submit'>Search</button>
        </div>
      <div className='result'>
        {result.map((image, id) => {
          return (
            <div className='card' key={id}>
              <a>
                <LazyLoadImage
                  src={image.urls.full}
                  effect='blur'
                  delayTime='300'
                  className='resultImage'
                />
              <p className='username'>Image by {image.user.username}</p>
              </a>
            </div>
          )
        })}
      </div>
      </div>
    </SRLWrapper>
  )
}

export default App
