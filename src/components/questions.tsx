"use client";

import Left_section from '@/components/left_section';
import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import send_btn from "../app/assets/send_arrow.png";
import "./questions.css";
import Questionnaire from '@/components/questionnaire';
import close from "../app/assets/close.svg";
// import { useSearchParams, useRouter } from 'next/navigation';

type PreparationStage = 'Prelims' | 'Mains' | 'Interviews' | "";
type PreparationDuration = 'Less than 1 year' | '1-2 years' | '3+years' | "";
type CurrentStatus = 'College Student' | 'Full-Time Aspirant' | 'Working Professional' | "";

function QuestionsComponent({phone, onClose}: any) {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  const [stage, setStage] = useState<PreparationStage>('');
  const [duration, setDuration] = useState<PreparationDuration>('');
  const [status, setStatus] = useState<CurrentStatus>('');

  // const [phone, setPhone] = useState('');

  // const checkPhone = async (phone: string) => {
  //   try {
  //     const response = await fetch(`/api/waitlist?phoneNumber=${phone}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       return data.found;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error("Request failed:", error);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   const phone = searchParams.get('phone');
  //   if (phone) {
  //     if (!/^\d{10}$/.test(phone)) {
  //       alert('Please enter a valid Phone Number');
  //       router.push('/');
  //       return;
  //     }

  //     checkPhone(phone).then((found) => {
  //       if (found) {
  //         alert('Phone number already registered');
  //         router.push('/');
  //         return;
  //       } else {
  //         setPhone(phone);
  //       }
  //     });
  //   } else {
  //     router.push('/join-waitlist');
  //     return;
  //   }
  // }, [searchParams, router]);

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
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
      onClose();
      // router.push('/');
    } else {
      const data = await response.json();
      alert(data.error || 'Something went wrong');
      onClose();
      // router.push('/');
    }
  };

  return (
    <div className='bg-white flex flex-row ques_section'>
      <button className='close-btn' onClick={() => onClose()}>
        <Image src={close} alt='close' className='cursor-pointer' width={20}/>
      </button>
      <div className='left_section'>
        <Left_section/>
      </div>
      <div className='right_section_ques'>
        <h3>One last step!</h3>
        <h2>Get free premium <br />access for a year!</h2>
        <Questionnaire
          stage={stage}
          setStage={setStage}
          duration={duration}
          setDuration={setDuration}
          status={status}
          setStatus={setStatus}
        />
        <button className='flex flex-row items-center gap-3 cont_btn_ques' onClick={handleSubmit}>
          Join Waitlist
          <Image src={send_btn} alt='send' width={25}></Image>
        </button>
        <button className='skip_btn' onClick={handleSubmit}>Skip</button>
      </div>
    </div>
  );
}

export default function Questions({phone, onClose}: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionsComponent phone={phone} onClose={onClose} />
    </Suspense>
  );
}
