import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../../features/addprodSlice';
import { IoCartOutline } from 'react-icons/io5';
import {Buffer} from 'buffer'
// import LZString from 'lzma'
// import LazyLoad from 'react-lazyload';
const Prodcard = ({items,width}) => {
    console.log(items);
const dispatch=useDispatch()
const base64String = btoa(
    String.fromCharCode(...new Uint8Array(items?.images?.data?.data))
  );
//   var compressed = LZString.compress(base64String);
//   console.log(compressed)
// const base64data = Buffer.from(items?.images?.data?.data, 'binary').toString('base64');
    return (
        <>
        <Link to={`/details/${items._id}`}  >
    
         <div className="bg-white border-[1px] mb-5 border-solid border-[gray] dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
            <img
              alt="Property Image"
              className="w-full h-48 object-cover"
              height={250}
              src={`data:image/png;base64,${base64String}`}
              style={{
                aspectRatio: "400/250",
                objectFit: "contain",
              }}
              width={400}
            />
            <div className="p-4 border-t-[1px] border-t-solid border-t-[gray]">
              <h4 className="text-lg font-semibold">{items.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 mb-2">{items.desc}</p>
              <p className="text-lg font-semibold">RS {items.price}</p>
            </div>
          </div>
              </Link>
        </>
    )
}

export default Prodcard