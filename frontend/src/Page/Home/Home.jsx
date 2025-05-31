import React from 'react'
import Hero from '../../component/Hero/Hero'
import AboutProject from '../../component/AboutProject/AboutProject'

         
function Home(login, setLogin) {
  return (
   <>
   <Hero setLogin={setLogin}/>
   <AboutProject />
   </>
  )
}

export default Home
