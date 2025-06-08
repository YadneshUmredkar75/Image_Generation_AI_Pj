import './Hero.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../StorContext/StoreContext';
const Hero = () => {
  const { isLoggedIn, setShowLogin }=useContext(StoreContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/genimage');
    } else {
      setShowLogin(true); // show login popup
    }
  };

  return (
    <div className="hero">
      <div className="contener">
        <button onClick={handleClick}>
          {isLoggedIn ? 'Start to generate an image' : 'Login to generate images'}
        </button>
      </div>
    </div>
  );
};

export default Hero;
