import { Avatar } from "flowbite-react";

export function Avat() {
  return (
    <div className=" flex items-center gap-4 ml-0.5">
      <img className="ml-w-10 h-10 rounded-full" src="https://skopjeforum.com/wp-content/uploads/2022/11/Albin-Kurti.jpg" alt="" />
      <div className="font-medium dark:text-white">
        <div>Albin Kurti</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Joined in April 2024</div>
      </div>
    </div>
  );
}
