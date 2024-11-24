"use client";

import Left_section from '@/components/left_section';
import React from 'react'
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import Image from 'next/image';
import arrow from "../app/assets/continue_arrow.svg"
import close from "../app/assets/close.svg"
import "./join-waitlist.css"

export default function Join_waitlist({phone, setPhone, onClose, onOpen}: any) {
  // const [phone, setPhone] = useState('');
  // const router = useRouter();

  const handleSubmit = async (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!phone) {
      alert('Please enter a Phone Number');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid Phone Number');
      return;
    }
    onClose();
    onOpen();

    // redirect to questions page with phone number
    // router.push(`/questions?phone=${phone}`);
  };

  return (
    <div className='bg-white flex flex-row join_container z-50'>
      <button className='close-btn' onClick={() => onClose()}>
        <Image src={close} alt='close' width={20}/>
      </button>
      <div className='left_section'>
        <Left_section/>
      </div>
      <div className='right_section bg-white'>
        <h3>Join the Waitlist</h3>
        <h2>Get free premium <br />access for a year!</h2>
        <div className="input-container">
          <span className="country-code">+91</span>
          <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your number..."/>
          <button className="send-button" onClick={handleSubmit}>
            <Image src={arrow} alt="Send" style={{width: "24px", height:"24px"}}/>
          </button>
        </div>
        {/* <p>You&apos;ll be recieving a code on this number!</p> */}
        {/* <a href="/verify-otp"><button className='flex flex-row items-center gap-[8px] cont_btn'> */}
        <button className='flex flex-row items-center gap-3 cont_btn' onClick={handleSubmit}>
          Continue
          <Image src={arrow} alt='send' width={20}></Image>
        </button>
      </div>
    </div>
  )
}