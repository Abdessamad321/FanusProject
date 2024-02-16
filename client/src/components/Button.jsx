import Shop from '../assets/shop.png';

export default function Button() {
  return (
    <div>
      <button className="flex items-center justify-center bg-custom-brown rounded-full
       text-white font-semibold text-base focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-gray-800 w-60 h-12">
        <img src={Shop} alt="Shop Icon" className="mr-2 w-5 h-5" />
        Add To Cart
      </button>
    </div>
  );
}
