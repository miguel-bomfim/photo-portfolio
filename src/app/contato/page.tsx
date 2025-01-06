import { RiInstagramFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";

import React from "react";

export default function Contato() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4 mt-10">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-4">
          Entre em contato
        </h1>

        <p className="text-center mb-8 max-w-96">
          Eu adoraria ouvir de você! Sinta-se à vontade para entrar em contato
          através do do E-mail abaixo ou pelo Instagram.
        </p>

        <div className="flex flex-col items-center mb-8">
          <a
            href="mailto:sarahheloisa2010@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2  hover:text-gray-900 transition"
          >
            <IoMdMail size={24} />
            <span className="md:text-lg font-medium underline">
              sarahheloisa2010@gmail.com
            </span>
          </a>
          <a
            href="https://www.instagram.com/sarahheloisa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2  hover:text-gray-900 transition"
          >
            <RiInstagramFill size={24} />
            <span className="md:text-lg font-medium underline">
              @sarahheloisa
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
