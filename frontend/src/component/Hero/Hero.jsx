import './Hero.css';
import { useNavigate } from 'react-router-dom';

const Hero = ( setLogin) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (setLogin) {
      navigate('/genimage');
    } else {
      navigate('/login');
      
    }
  };

  return (
    <div className="hero">
      <div className='contener'>
        <button onClick={handleClick}/>
        {setLogin ? 'Start to generate an image' : 'Login to generate images'}
      </div>
    </div>
  );
};

export default Hero;