import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-primaryBg group">
      <div className="max-w-container mx-auto border-t-[1px] py-10">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2022 | Ecommerce | All Rights Reserved |
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;