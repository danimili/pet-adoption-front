import { useState, useContext, useEffect } from 'react';
import './Home.css';
import av1 from './avatarPhotos/av1.jpeg'
import av2 from './avatarPhotos/av2.jpeg'
import av3 from './avatarPhotos/av3.jpeg'
import AppContext from '../AppContext';

export default function Home() {
  const { loggedIn, setLoggedIn } = useContext(AppContext);
  const [welcome, setWelcome] = useState()

  const homePage = async (e) => {
    try {
      const name = localStorage.getItem("loggedinuser");
      setWelcome(name)
      return name
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    homePage()
    setLoggedIn(true);
  }, [])

  return (
    <>
      {loggedIn ? <h1>Welcome {welcome}</h1> : <h1>Welcome to Tel Aviv Pet Adoption</h1>}
      <div className="home-container">
        <img src="https://images.squarespace-cdn.com/content/v1/5c457bfbf2e6b156c933f36d/1579662986830-VWMHIVKDSCWR0KA0ICOZ/3+dogs+with+2+cats.jpg?format=2500w" alt="HomePetImg" style={{ height: '600px', width: '1200px', objectFit: 'cover' }} />
      </div>
      <div className='in-line-comments'>
        <div className='comments'>
          <div className='comm-txt'>“Wendy is my best friend. I could never have imagined how simple and happy life could be with a dog”</div>
          <div className='in-line-comm'>
            <div>Nico</div>
            <img className="avatar" src={av1} alt="avatar" />
          </div>
        </div>
        <div className='comments'>
          <div className='comm-txt'>”Zoey is so amazing! I am in love of her and she is a great companion.”</div>
          <div className='in-line-comm'>
            <div>Romi</div>
            <img className="avatar" src={av2} alt="avatar" />
          </div>
        </div>
        <div className='comments'>
          <div className='comm-txt'>”Messi is the best gift I could ask for. He is cute, sweet and lovely. ”</div>
          <div className='in-line-comm'>
            <div>Nir</div>
            <img className="avatar" src={av3} alt="avatar" />
          </div>
        </div>
      </div>
    </>
  )
}