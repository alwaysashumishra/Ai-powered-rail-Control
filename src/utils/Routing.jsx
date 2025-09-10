import React from 'react'
import NeedHelp from '../components/NeedHelp'
import { Route, Routes } from 'react-router-dom'


const Routing = () => {
  return (
    <Routes>
        <Route path='/need-help' element={<NeedHelp/>}/>
    </Routes>
  )
}

export default Routing