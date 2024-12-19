"use client";
import { useState } from "react";
import { useEffect, useRef } from "react";

export default function Home() {

  const start = () => {}
  const canvasRef = useRef();
  const rectsCount = 20;
  const [state, setState] = useState([3, 872, 513, 156, 952, 903, 474, 982, 329, 471, 
    709, 315, 660, 141, 926, 602, 898, 472, 59, 735, 
    333, 946, 682, 311, 257, 863, 977, 996, 434, 119, 
    107, 89, 505, 777, 101, 577, 825, 446, 950, 187, 
    438, 92, 734, 444, 888, 968, 601, 275, 594, 465]);   
  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    values.forEach((el,i) => {
      const width = canvas.width /(2 * rectsCount);
      const left = canvas.width * i /rectsCount +  canvas.width /(4 * rectsCount);
      const height = canvas.height * 0.9 * el /1000;
      const top = canvas.height - height;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(left, top, width , height )
    })     

  },[])
  return (
    <canvas ref={canvasRef}></canvas>
    <button onClick={start()}></button>
  );
}
