'use client';

import {signIn} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import {useEffect} from "react";

export default function HeroForm({user}) {
  const router = useRouter();
  useEffect(() => {
    if (
      'localStorage' in window
      && window.localStorage.getItem('desiredUsername')
    ) {
      const username = window.localStorage.getItem('desiredUsername');
      window.localStorage.removeItem('desiredUsername');
      redirect('/account?desiredUsername=' + username);
    }
  }, []);
  async function handleSubmit(ev) {
    ev.preventDefault();
    const form = ev.target;
    const input = form.querySelector('input');
    const username = input.value;
    if (username.length > 0) {
      if (user) {
        router.push('/account?desiredUsername='+username);
      } else {
        window.localStorage.setItem('desiredUsername', username);
        await signIn('google');
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg bg-white shadow-gray-500/20 rounded-full">
          <span className="bg-white py-4 pl-4 rounded-l-full">
            linktri.vercel.app/
          </span>
      <input
        type="text"
        className=""
        style={{backgroundColor:'white',marginBottom:0,paddingLeft:0}} 
        placeholder="username"/>
        
      <button
        type="submit"
        className="rounded-full bg-lime-300 hover:bg-lime-100 text-black py-4 px-6 whitespace-nowrap font-bold">
          
        Join for Free
      </button>
    </form>
  );
}


