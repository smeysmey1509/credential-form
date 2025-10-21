import React, { useState } from "react";
import PrimaryButton from "../../Button/PrimaryButton/PrimaryButton";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Key Features");

  const tabs = ["Product Details", "Key Features", "Additional Features"];

  const getButtonClass = (label: string) => {
    const isActive = activeTab === label;
    return `
      relative overflow-hidden w-fit rounded text-[0.85rem] px-4 py-2 font-sans font-semibold 
      bg-[#F7F7FE] transition-colors duration-300 ease-in-out
      ${
        isActive
          ? "text-[#5F6AF7]"
          : "text-[#5F6AF7] hover:bg-[#5C67F7] hover:text-white cursor-pointer"
      }
      before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:h-[2px] 
      before:bg-[#5F6AF7] before:transition-all before:duration-300 before:ease-in-out
      before:-translate-x-1/2 ${isActive ? "before:w-full" : "before:w-0"}
    `;
  };

  const features = [
    {
      title: "Display",
      description:
        "Stunning 4K UHD resolution with touchscreen capability for immersive visuals and easy navigation.",
    },
    {
      title: "Processor",
      description:
        "High-performance Intel Core i7 processor for seamless multitasking and powerful computing.",
    },
    {
      title: "Memory",
      description:
        "16GB DDR4 RAM ensures smooth performance even with multiple applications running simultaneously.",
    },
    {
      title: "Storage",
      description:
        "Ample 1TB SSD storage for fast boot-up times, quick file access, and plenty of space for your files and applications.",
    },
    {
      title: "Graphics",
      description:
        "NVIDIA GeForce GTX 1650 Ti graphics card delivers smooth gaming performance and supports creative applications.",
    },
    {
      title: "Operating System",
      description:
        "Pre-installed with Windows 10 Home for a familiar and user-friendly computing experience.",
    },
  ];

  const additionalFeatures = [
    {
      title: "Connectivity",
      description:
        "Wi-Fi, Bluetooth, USB ports, HDMI output, and more for easy connectivity to peripherals and accessories.",
    },
    {
      title: "Design",
      description:
        "Sleek and stylish design with premium materials for durability and aesthetics.",
    },
    {
      title: "Battery Life",
      description: "Long-lasting battery to keep you productive on the go.",
    },
    {
      title: "Audio",
      description:
        "High-quality audio for immersive entertainment and clear communication.",
    },
    {
      title: "Security",
      description:
        "Built-in security features to protect your data and privacy.",
    },
    {
      title: "Warranty",
      description: "Backed by TechPro's warranty for peace of mind.",
    },
  ];

  return (
    <div className="w-full h-fit flex flex-wrap p-4">
      <div className="w-full flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={getButtonClass(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="w-full mt-6">
        {activeTab === "Product Details" && (
          <div className="w-full border border-gray-200 rounded-md overflow-hidden">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="w-[200px] px-4 py-3 text-sm font-semibold text-[#0A0A0A] bg-gray-50">
                    Brand
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">TechPro</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="w-1/5 px-4 py-3 text-sm font-semibold text-[#0A0A0A] bg-gray-50">
                    Model Name
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    X15 Elite - 2024 Edition
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="w-1/2 px-4 py-3 text-sm font-semibold text-[#0A0A0A] bg-gray-50">
                    Display
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    15.6” 4K UHD Touchscreen
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="w-1/2 px-4 py-3 text-sm font-semibold text-[#0A0A0A] bg-gray-50">
                    Processor
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Intel Core i7
                  </td>
                </tr>
                <tr>
                  <td className="w-1/2 px-4 py-3 text-sm font-semibold text-[#0A0A0A] bg-gray-50">
                    Operating System
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Windows 10 Home
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "Key Features" && (
          <ul className="list-none list-inside text-gray-600 text-sm">
            {features?.map((feature, item) => (
              <li key={item} className="mb-3 ">
                <span className="font-semibold text-[#212B37] font-sans text-[13px]">
                  {feature?.title}
                  {": "}
                </span>
                {feature?.description}
              </li>
            ))}
          </ul>
        )}
        {activeTab === "Additional Features" && (
          <ul className="list-none list-inside text-gray-600 text-sm">
            {additionalFeatures?.map((feature, item) => (
              <li key={item} className="mb-3 ">
                <span className="font-semibold text-[#212B37] font-sans text-[13px]">
                  {feature?.title}
                  {": "}
                </span>
                {feature?.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tabs;
