import React from "react";

type InfosProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

const Infos: React.FC<InfosProps> = ({ subtitle, title }) => {
  return (
    <div className="flex flex-col w-full bg-[#292248] text-white items-center justify-center rounded rounded-lg py-2 border-t-4 border-[#B2A8EE] min-h-[90px]">
      <h1 className="text-md font-bold">{title}</h1>
      {subtitle && <span data-testid="subtitle-info" className="text-2xl">{subtitle}</span>}
    </div>
  );
};

export default Infos;
