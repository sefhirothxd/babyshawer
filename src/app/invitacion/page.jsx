import React from "react";
import Image from "next/image";

const Invitacion = () => {
  return (
    <div className="flex justify-center items-center min-h-svh w-full">
      <div className="relative w-[400px]">
        <Image
          src="/invitacion.webp"
          alt="Invitacion"
          width={500}
          height={500}
        />
        <div className="absolute bottom-[65px] left-[70px] flex  items-center w-full">
          <a
            className=" w-[40px] h-[40px]"
            href="https://waze.com/ul/h6mc5mhjx9"
            target="_blank"
          ></a>
          <a
            className=" w-[100px] h-[40px] ml-6"
            href="https://babyshawer.vercel.app/"
            target="_blank"
          ></a>
          <a
            className=" w-[120px] h-[30px] ml-5 mt-1"
            href="https://wa.link/kfuc5i"
            target="_blank"
          ></a>
        </div>
      </div>
    </div>
  );
};

export default Invitacion;
