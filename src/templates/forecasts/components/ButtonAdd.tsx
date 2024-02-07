import { PlusIcon } from 'lucide-react';
import React from 'react';

const ButtonAdd: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return (
    <button
      className="flex relative overflow-hidden flex-col gap-3 bg-gradient-to-r from-[#FF9926] to-[#FF2323] bg-left-bottom rounded rounded-[34.43px] text-2xl px-12 py-6 text-white items-center justify-center"
      {...props}
    >
      <div className="flex relative h-[58px] w-[58px] rounded rounded-full">
        <div className="z-20 bg-white opacity-20 h-[58px] w-[58px] rounded rounded-full border-2 border-white border-solid " />
        <div className="z-20 bg-white h-[46px] w-[46px] rounded rounded-full border-2 border-white border-solid absolute top-[6px] right-[6px]" />
        <PlusIcon
          width={44}
          height={44}
          colorInterpolation={50}
          color="#ea580c"
          strokeWidth={2.5}
          style={{ position: 'absolute', top: 7, right: 7, zIndex: 20 }}
        />
      </div>
      <div className="z-20 absolute bg-gradient-to-br from-[#fff] to-[transparent] rounded rounded-full opacity-20 w-[103px] h-[103px] top-[-20px] left-[12px]" />
      <div className="z-20 absolute bg-gradient-to-br from-[#fff] to-[transparent] rounded rounded-full opacity-20 w-[80px] h-[80px] top-[28px] left-[-25px]" />
      <div className="z-20 absolute bg-gradient-to-bl from-[#fff] to-[transparent] rounded rounded-full opacity-20 w-[162px] h-[162px] bottom-[-100px] left-[50px]" />
      <div className="z-20 absolute bg-gradient-to-br from-[#fff] to-[transparent] rounded rounded-full opacity-20 w-[138px] h-[138px] bottom-[-38px] right-[-25px]" />
      <h3 className="z-20">Add new location</h3>
      <div className="absolute w-full h-full bg-[url('/img/Grain-Texture.png')] bg-contain" />
    </button>
  );
};

export default ButtonAdd;
