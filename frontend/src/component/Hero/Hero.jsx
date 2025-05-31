import './Hero.css';
import { useNavigate } from 'react-router-dom';

const Hero = ( setLogin) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (setLogin) {
      navigate('/genimage');
    } else {
      alert('Please sign up or login first to generate images');
      
    }
  };

  return (
    <div className="hero">
      <div className='contener'>
        <button onClick={handleClick}>Start to generate a image</button>
      </div>
    </div>
  );
};

export default Hero;