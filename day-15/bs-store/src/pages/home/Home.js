import React from 'react'
import Banner from '../../components/banner'
import { BannerContainer } from '../../components/banner/styles'
import Footer from '../../components/footer'
import Sliders from '../../components/slider'
import { RightsContainer, RightsText } from './style'


export default function Home() {
  return (
    <>
    <Banner/>
    <Sliders/>
    <Footer/>
    <RightsContainer>
      <RightsText alignItems={'center'}>
        <h6>This Website has been designed by BTK and innova Bootcamp Participants.</h6>
      </RightsText>
    </RightsContainer>
    </>
  )
}
