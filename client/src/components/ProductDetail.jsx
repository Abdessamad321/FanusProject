import React from 'react';
import Button from './button';
import Fleche from '../assets/fleche.png';
import Share from '../assets/share.png';
import Ruban from '../assets/ruban.png';
import R from '../assets/r.jpg';
import CountdownTimer from './CountdownTimer ';
import QuantitySelector from './QuantitySelector';
import Info from './info';

export default function ProductDetail() {

    const eventDate = new Date('2024-03-01T00:00:00');

  return (
    <div className="productdetail mt-3 border-t-2 ">
        <div className="titleD flex justify-between  mx-6">
            <div className="fleche mt-4">
                <a href='/'> 
                    <img src={Fleche} className="cursor-pointer"/>
                </a>
            </div>
            <div className="title">
                <h2 className="text-lg font-bold">Title Gorem Dolar Sit Amet</h2>
                <p class='mx-5'>Owner Consectetur Elite</p>
            </div>
            <div className="icond size-20 flex mt-4 space-x-4">
                <a href="/">
                    <img src={Ruban} alt="" className="cursor-pointer " />
                </a>
                <a href="/">
                    <img src={Share} alt="" className="cursor-pointer  " />
                </a>
            </div>
        </div>
        <div className="product flex mx-8">
            <div className="productimg w-1/2 ">
                <img className=" h-3/5 w-full" src={R} alt="" />
            </div>
            <div className="productinfo border-t-2 ml-28 py-8">
                <div className="quiqly flex ms-36 ">
                    <h2 className="text-lg text-red-500 ml-[-4rem] mb-4">Quickly !! Buy your tickets quickly</h2>
                </div>
                <div className="chnoro mb-12">
                <CountdownTimer eventDate={eventDate} />
                </div>
                <div className="infos mb-12">
                    <Info />
                </div>
                <div className="last mb-6 flex space-x-4">
                    <div className="num ">
                        <QuantitySelector />
                    </div>
                    <div className="addto">
                        <Button />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
