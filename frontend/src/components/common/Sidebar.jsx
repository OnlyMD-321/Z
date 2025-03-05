import XSvg from "../svgs/X";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { MdChat } from "react-icons/md"; // Import the chat icon
import { useAuthStore } from "../../stores/useAuthStore";

const Sidebar = () => {
	const authUser = useAuthStore((state) => state.authUser);
	const logout = useAuthStore((state) => state.logout);

	return (
    <div className=" flex-1 md:w-72">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-full">
        <Link to="/" className="flex justify-center md:justify-start">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4 [&_li>span]:text-lg [&_li>span]:hidden [&_li>span]:md:block [&_li]:flex [&_li]:justify-center [&_li]:items-center [&_li]:md:justify-start [&_li]:w-full">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 w-full min-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-6 h-6" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className="flex items-center gap-3 hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 w-full min-w-fit cursor-pointer"
            >
              <IoNotifications className="w-6 h-6" />
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              className="flex items-center gap-3 hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 w-full min-w-fit cursor-pointer"
            >
              <MdChat className="w-6 h-6" />
              <span>Chat</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/profile/${authUser?.username}`}
              className="flex items-center gap-3 hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 w-full min-w-fit cursor-pointer"
            >
              <FaUser className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
        {authUser && (
          <Link
            to={`/profile/${authUser.username}`}
            className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <div className="flex justify-between flex-1">
              <div className="hidden md:block">
                <p className="text-white font-bold text-sm w-20 truncate">
                  {authUser?.fullName}
                </p>
                <p className="text-slate-500 text-sm">@{authUser?.username}</p>
              </div>
              <BiLogOut
                className="w-5 h-5 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
