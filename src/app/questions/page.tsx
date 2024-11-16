"use client";

import Left_section from '@/components/left_section';
import React from 'react'
import { useState,useEffect } from 'react';
import Image from 'next/image';
import send_btn from "../assets/send_arrow.png"
import "./questions.css"
import Questionnaire from '@/components/questionnaire';
import close from "../assets/close.svg"
import { useSearchParams, useRouter } from 'next/navigation';

type PreparationStage = 'Prelims' | 'Mains' | 'Interviews' | "";
type PreparationDuration = 'Less than 1 year' | '1-2 years' | '3+years' | "";
type CurrentStatus = 'College Student' | 'Full-Time Aspirant' | 'Working Professional' | "";

export default function Questions() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [stage, setStage] = useState<PreparationStage>('');
  const [duration, setDuration] = useState<PreparationDuration>('');
  const [status, setStatus] = useState<CurrentStatus>('');

  const [phone, setPhone] = useState('');
  
  // function to check if phone number already exists in the waitlist
  const checkPhone = async (phone: string) => {
    try {
      const response = await fetch(`/api/waitlist?phoneNumber=${phone}`);
      if(response.ok){
        const data = await response.json();
        if(data.found){
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      console.error("Request failed:", error);
      return false;
    }
  };
  

  useEffect(() => {
    const phone = searchParams.get('phone');
    if (phone) {
      // validity check for phone number
      if (!/^\d{10}$/.test(phone)) {
        alert('Please enter a valid Phone Number');
        router.push('/');
        return;
      }
      // check if phone number already exists in the waitlist
      checkPhone(phone).then((found) => {
        if (found) {
          alert('Phone number already registered');
          router.push('/');
          return;
        } else {
          setPhone(phone);
          return;
        }
      });
    }else{
      router.push('/join-waitlist');
      return;
    }
  }, []);

  const handleSubmit = async (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const response = await fetch('/api/waitlist', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phone,
        stage,
        prepDuration: duration,
        workStatus: status,
      }),
    });
    if (response.ok) {
      alert('You have been added to the waitlist!');
      router.push('/');
    } else {
      const data = await response.json();
      if(!data.error){
        alert('Something went wrong');
        router.push('/');
        return;
      }
      if(data.error == "Phone number already exists"){
        alert("Phone number already exists");
        router.push('/');
        return;
      }
      alert(data.error);
    }
  }

  return (
    <div className='bg-white flex flex-row ques_section'>
      <button className='close-btn'>
        <Image src={close} alt='close' className='cursor-pointer' width={20}/>
      </button>
      <div className='left_section'>
        <Left_section/>
      </div>
      <div className='right_section'>
        <h3>One last step!</h3>
        <h2>Get free premium <br />access for a year!</h2>
        <Questionnaire stage={stage} setStage={setStage} duration={duration} setDuration={setDuration} status={status} setStatus={setStatus}/>
        <button className='flex flex-row items-center gap-3 cont_btn' onClick={handleSubmit}>
          Join Waitlist
          <Image src={send_btn} alt='send' width={25}></Image>
        </button>
        <button className='skip_btn' onClick={handleSubmit}>Skip</button>
      </div>
    </div>
  )
}