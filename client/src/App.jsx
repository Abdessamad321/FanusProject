import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './components/LoginPage';
import NavBar from './components/NavBar';
import Home from './containers/Home/HomePage';
import Features from './containers/Home/Features';
import CarouselGallery from './containers/Home/Carousel';
import Steps from './containers/Home/Steps';

function App() {

  return (
    <>
    <CarouselGallery/>
    </>
  )
}

export default App
