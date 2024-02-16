import React from 'react';
import ig from '../assets/ig.png';
import fb from '../assets/fb.png';
import x from '../assets/x.png';
import w from '../assets/world.png';
import d from '../assets/dolar.png';
import 'tailwindcss/tailwind.css';

export default function Footer() {
  return (
    <div className="footer border-t p-5 mx-5">
        <div className="footer-1 flex justify-between ">
            <div className="logo">
            <h1 className="text-4xl font-bold text-orange-500">LOGO</h1>
            </div>
            <div class="Services mt-5">
                <h2 class="text-lg font-bold text-custom-brown">Services</h2>
                    <a href='planing' className="block text-gray-700 mb-2">Planning Event</a>
                    <a href='finding' className="block text-gray-700 mb-2">Finding Event</a>
                    <a href='create' className="block text-gray-700 mb-2">Create Event</a>
                    <a href='event' className="block text-gray-700 mb-2">Event Payment System</a>
            </div>
            <div className="Aboutus mt-5 pr-4 ">
                <h2 className="text-lg font-bold text-custom-brown">About us</h2>
                <a href='styry' className="block text-gray-700 mb-2">Our story</a>
                <a href='Benifits' className="block text-gray-700 mb-2">Benefits</a>
                <a href='Team' className="block text-gray-700 mb-2">Team</a>
                <a href='Careers' className="block text-gray-700 mb-2">Careers</a>
            </div>
            <div className="Helps mt-5">
            <h2 className="text-lg font-bold text-custom-brown">Helps</h2>
                <a href='faqs' className="block text-gray-700 mb-2">FAQs</a>
                <a href='contact' className="block text-gray-700 mb-2">Contact Us</a>
            </div>
            <div className="vide mt-5"></div>
        </div>
        <div className="footer-2  text-white mt-5 py-5">
            <div className="flex justify-between max-w-7xl mx-auto px-4 py-6">
                <div className="copyright text-gray-600 mt-2">
                    Copyright 2024, Logopsum.All rights reserved.
                </div>
                <div className="h flex justify-between">
                    <div className="en flex items-center">
                        <img src={w} alt="" className="w-6 h-6 mr-2"/> 
                        <a href='/' className="text-black">English(EN)</a>
                    </div>
                    <div className="devise flex items-center">
                        <img src={d} alt="" className="w-6 h-6 mr-2"/>
                        <a href='/' className="text-black">USD</a>
                    </div>
                </div>
                <div className="socialMediaIcons flex">
                    <a href='/instagram'><img  src={ig} alt="instagram" className="w-6 h-6 mr-2"/></a>
                    <a href='facebook'><img  src={fb} alt="facebook" className="w-6 h-6 mr-2"/></a>
                    <a href='x'><img src={x} alt="x" className="w-6 h-6 mr-2"/></a>
                </div>
            </div>
        </div>
    </div>
  );
}
