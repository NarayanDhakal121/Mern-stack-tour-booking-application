import React from 'react'
import { Route,Routes ,Navigate} from 'react-router-dom'
import SearchResultList from '../Pages/SearchResultList'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Tour from '../Pages/Tour'
import About from '../Pages/About'
import TourDetails from '../Pages/TourDetails'
import Register from '../Pages/Register'
import Thankyou from '../Pages/Thankyou'

const Router = () => {
  return (
 
    <Routes>
        <Route path ='/' element={<Navigate to ='/home'/>}/>
        <Route path ='/home' element={<Home/>}/>
        <Route path ='/tour' element={<Tour/>}/>
        <Route path ='/about' element={<About/>}/>
        <Route path ='/tours/:id' element={<TourDetails/>}/>
        <Route path ='/login' element={<Login/>}/>
        <Route path="/tour/search" element={<SearchResultList/>} />
        <Route path ='/register' element={<Register/>}/>
        <Route path ='/thank-you' element={<Thankyou/>}/>
    </Routes>
  )
}

export default Router