import logo from "@/public/eccom/Logo.svg";
import Image from "next/image";
import slender from "@/public/eccom/slenred.png";

const Footer = () => {
  return (
    <div className="flex items-center p-4">
      <footer className="bg-[#C8D400] rounded-4xl w-full p-8 flex flex-col items-center">
        <div className="mb-8">
          <Image src={logo} alt="logo" width={150} height={150} />
        </div>
        <div>
          <Image src={slender} alt="slender man" width={100} height={200} />
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl mb-8 gap-10 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Products</h2>
            <ul className="flex flex-col gap-2">
              <li className="font-semibold text-lg cursor-pointer hover:text-[#a2c617] transition-colors">
                Product 1
              </li>
              <li className="font-semibold text-lg cursor-pointer hover:text-[#a2c617] transition-colors">
                Product 2
              </li>
              <li className="font-semibold text-lg cursor-pointer hover:text-[#a2c617] transition-colors">
                Product 3
              </li>
            </ul>

            <h2 className="font-bold text-2xl mt-4">Social</h2>
            <ul className="flex flex-col gap-2">
              <li className="font-semibold text-lg cursor-pointer hover:text-[#a2c617] transition-colors">
                Facebook
              </li>
              <li className="font-semibold text-lg cursor-pointer hover:text-[#a2c617] transition-colors">
                Twitter
              </li>
              <li className="font-semibold text-lg cursor-pointer hover:text-[#a2c617] transition-colors">
                Instagram
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl mb-2">Need Help?</h2>
            <ul className="flex flex-col gap-2">
              <li className="font-semibold cursor-pointer text-lg hover:text-[#a2c617] transition-colors">
                FAQ
              </li>
              <li className="font-semibold cursor-pointer text-lg hover:text-[#a2c617] transition-colors">
                Contact
              </li>
            </ul>
          </div>
        </div>
        <p className="font-bold text-center text-sm mt-6">
          © 2024 My Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
