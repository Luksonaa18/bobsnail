import Image from "next/image";
import logo from "@/public/eccom/Logo.svg";
import slender from "@/public/eccom/slenred.png";

const Footer = () => {
  return (
    <footer className="bg-[#C8D400] rounded-t-[50px] w-full p-8 md:p-10 flex flex-col items-center">
      {/* Logo Section */}
      <div className="mb-10 flex flex-col items-center">
        <Image src={logo} alt="logo" width={150} height={150} className="mb-4" />
        <Image src={slender} alt="slender man" width={120} height={220} />
      </div>

      {/* Links Section */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl gap-16 text-center md:text-left">
        {/* Products & Social */}
        <div className="flex flex-col md:flex-row gap-16">
          {/* Products */}
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl text-gray-900">Products</h2>
            <ul className="flex flex-col gap-2">
              {["Product 1", "Product 2", "Product 3"].map((product) => (
                <li
                  key={product}
                  className="font-medium text-lg cursor-pointer hover:text-[#a2c617] transition-colors"
                >
                  {product}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4 mt-8 md:mt-0">
            <h2 className="font-bold text-2xl text-gray-900">Social</h2>
            <ul className="flex flex-col gap-2">
              {["Facebook", "Twitter", "Instagram"].map((social) => (
                <li
                  key={social}
                  className="font-medium text-lg cursor-pointer hover:text-[#a2c617] transition-colors"
                >
                  {social}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Help Section */}
        <div className="flex flex-col gap-4 mt-8 md:mt-0">
          <h2 className="font-bold text-2xl text-gray-900">Need Help?</h2>
          <ul className="flex flex-col gap-2">
            {["FAQ", "Contact"].map((item) => (
              <li
                key={item}
                className="font-medium text-lg cursor-pointer hover:text-[#a2c617] transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="font-medium text-center text-gray-900 text-sm mt-12">
        © 2024 My Company. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
