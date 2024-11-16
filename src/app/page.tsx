"use client";
import Link from "next/link"
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "./assets/vartha_logo.png"
import phoneImg from "./assets/phone.png"
import send_btn from "./assets/send_arrow.png"
import down_arrow from "./assets/down_arrow.png"
import quiz from "./assets/quiz.png" 
import monitoring from "./assets/monitoring.png"
import checklist from "./assets/checklist.png"
import details_image from "./assets/details_right.png"
import "./home.css"
import TestimonialCarousel from '@/components/carousel';
import NotesCarousel from "@/components/notes";
import article_import from "./assets/article_import.png"
import know_web from "./assets/know_web.png"
import leaderboard from "./assets/leaderboard.png"
import integration from "./assets/integration.png"
import goal_tracking from "./assets/goal_tracking.png"
import go_btn from "./assets/go_btn.png"
import ext_send_btn from "./assets/ext_send_btn.png"
import ext_send_btn_lower from "./assets/ext_sent_btn_lower.png"
import { useState } from "react";

export default function Home() {

  const router = useRouter();

  const [phone, setPhone] = useState('');

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
    // redirect to questions page with phone number
    router.push(`/questions?phone=${phone}`);
  };


  return (
    <div className="top_page">

    
    <div className="home_page">
      <nav className="flex flex-row justify-between items-center" style={{height: "90px", width: "1200px", margin: "0 auto"}}>
        <div className="flex flex-row items-center" id="log_div" style={{width: "127px"}}>
          <Image src={logo} alt="head" style={{height: "32px", width: "32px", borderRadius: "50%"}}></Image>
          <h4 style={{fontFamily: "'libre-caslon-text', sans-serif", paddingLeft: "8px", fontSize: "24px"}}>vartha.ai</h4>
        </div>
        <div className="flex flex-row gap-[24px] nav_links">
          <Link href="/overview">OVERVIEW</Link>
          <Link href="/features">FEATURES</Link>
          <Link href="/benefits">BENEFITS</Link>
        </div>
        <a href="/join-waitlist">
        <div>
          <button className="join_waitlist_btn">JOIN WAITLIST</button>
        </div>
        </a>
      </nav>
      <div className="hero_section_wrapper">

      <section className="hero_section flex flex-row justify-between">
        <div className="hero_text">
          <h4>DISCOVER VARTHA.AI</h4>
          <h2>Effortlessly learn and <br />retain the most relevant <br />current affairs.</h2>
          <h5>Join us in building the premier current affairs <br />platform for India&apos;s next billion users. Request early <br />access with just your phone number.</h5>
          <div className="input-container">
            <span className="country-code">+91</span>
            <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your number..."/>
            <button className="send-button" onClick={(e) => handleSubmit(e)}>
              <Image src={send_btn} alt="Send"/>
            </button>
          </div>
          <button className="ext_join_btn" onClick={(e) => handleSubmit(e)}>
            Join Waitlist
            <Image src={ext_send_btn} alt="Send"/>
          </button>
          <h6>Start for free. No Credit Card Required!</h6>
          <p>SCROLL DOWN</p>
        </div>
        <Image src={phoneImg} alt="phone" className="hero_phone z-0"></Image>
      </section>
      </div>
      <div className="scroll_div relative z-20"><Image src={down_arrow} alt="scroll" height={20}/></div>
      <section className="details bg-white z-10 relative">
        <h3>
          Everything you need <br />to reach closer to <br />your ideal potential.
        </h3>
        <div className="details_container flex flex-row z-0 relative">
          <div className="details_left">
            <div className="details_box">
              <Image src={monitoring} alt="learn"></Image>
              <h6>Evolve learning methods with data.</h6>
              <p>We dot the hard-work of analysis.</p>
            </div>
            <div className="details_box">
              <Image src={checklist} alt="notes"></Image>
              <h6>Let your notes update itself.</h6>
              <p>Always be up-to-date. Internet led.</p>
            </div>
            <div className="details_box">
              <Image src={quiz} alt="quiz"></Image>
              <h6>Learn via rewarding quizzes.</h6>
              <p>Use scientifically-proven techniques.</p>
            </div>
          </div>
          <div className="details_right">
            <Image src={details_image} alt="details"></Image>
          </div>
        </div>
      </section>
      <section className="carousel">
        <p className="hear_cust">Hear from <br />our customers</p>
        <TestimonialCarousel/>
      </section>
      <section className="notes">
        <NotesCarousel/>
      </section>
      <section className="footer">
        <div className="footer_features">
          <div>
            <Image src={article_import} alt="article import"></Image>
            <h3>Article Import</h3>
            <p>Custom quizzes from any <br />internet article.</p>
          </div>
          <div>
            <Image src={know_web} alt="knowledge web"></Image>
            <h3>Knowledge Web</h3>
            <p>Memorise every connection <br />you need to make.</p>
          </div>
          <div>
            <Image src={leaderboard} alt="leaderboards"></Image>
            <h3>Leaderboards</h3>
            <p>Compete with global and local <br />leaderboards.</p>
          </div>
          <div>
            <Image src={integration} alt="integrations"></Image>
            <h3>Integrations</h3>
            <p>Sync with your favourite <br />sources of information.</p>
          </div>
          <div>
            <Image src={goal_tracking} alt="goal tracking"></Image>
            <h3>Goal Tracking</h3>
            <p>Build habits of daily learning <br />and revision.</p>
          </div>
        </div>
        <div className="footer_final">
          <div className="footer_info flex flex-row justify-between">
            <div className="footer_join">
              <h3>Revise and learn the most relevant current affairs.</h3>
              <div className="flex flex-row items-center gap-2 mt-4" id="in_join_btn_lower">
                <span className="lower-country-code">+91</span>
                <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)}placeholder="Enter phone number..." />
                <button className="flex flex-row justify-between" onClick={(e) => handleSubmit(e)}>Join Waitlist<Image src={send_btn} alt="send" style={{width: "24px"}}></Image></button>
              </div>
              <button className="ext_join_btn_lower" onClick={(e) => handleSubmit(e)}>
                Join Waitlist
                <Image src={ext_send_btn_lower} alt="Send"/>
              </button>
              <hr className="opacity-30"/>
            </div>
            <div className="footer_contacts">
              <div className="links">
                <h6>LINKS</h6>
                <Link href="">Features</Link>
                <Link href="">Benefits</Link>
                <Link href="">Privacy Policy</Link>
                <Link href="">Contact</Link>
              </div>
              <div className="connect">
                <h6>CONNECT</h6>
                <Link href="" className="flex flex-row gap-3">Instagram <span><Image src={go_btn} alt="go" style={{width: "14px"}}></Image></span></Link>
                <Link href="" className="flex flex-row gap-3">Twitter <span><Image src={go_btn} alt="go" style={{width: "14px"}}></Image></span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="cprt flex flex-row justify-between">
        <h6 id="cprt_date">&copy; 2024 Vartha AI. All rights reserved</h6>
        <h6>Terms &amp; Conditions</h6>
      </div>
    </div>
    </div>
  );
}