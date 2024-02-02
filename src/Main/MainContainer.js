import React from 'react';
import {isMobile} from 'react-device-detect';

import Main from './Main'
import MainMobile from './MainMobile';

const MainContainer = () => {

  return (
    <>
    {isMobile? <MainMobile/> : <Main/>}
    </>
  )
}
export default MainContainer