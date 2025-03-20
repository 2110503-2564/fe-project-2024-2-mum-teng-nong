'use client';
import React from "react";
import styles from "./banner.module.css"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Banner = () => {
  const covers = ['/img/cover.jpg',
    '/img/cover2.jpg',
    '/img/cover3.jpg',
    '/img/cover4.jpg'
  ]
  const [index, setIndex] = useState(0)
  const router = useRouter();
  const {data:session} = useSession()
  console.log(session?.user.token)
  return (
    <div className={styles.banner} onClick={() => {setIndex((index+1)%4)}}>
      <Image 
        src={covers[index]} 
        alt="cover"
        fill={true}
        objectFit="cover"
        data-testid="banner-image"
        id="banner-image"
      />
      <div className={styles.text}>
        <h1 className="text-4xl font-serif">Where every event finds its venue</h1>
      </div>
      {
        session?<div className="z-30 absolute top-5 right-10 text-black font-extrabold text-2xl bg-white rounded ">Welcome {session.user?.name} </div> : null
      }
      <button 
        className="bg-white text-cyan-600 border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-5 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent"
        onClick={(e) => {
          e.stopPropagation(); // Fixed the typo here
          router.push('/venue');
        }}
      >
        Select Venue
      </button>
    </div>
  );
};

export default Banner;