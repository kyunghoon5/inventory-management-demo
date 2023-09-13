import { Link } from 'react-router-dom';

const LoginBar = () => {
  return (
    <div className="flex items-center  ">
      <div className="flex space-x-1 ">
        {/* <input
          type="text"
          className=" w-full px-5 py-1 text-black bg-white border rounded-full focus:border-black focus:ring-white focus:outline-none focus:ring focus:ring-opacity-40 hidden md:block"
          placeholder="Search..."
        /> */}

        <button className="px-3 text-black bg-white rounded-full hidden md:block ">
          <div className="text-2xl cursor-pointer font-[Poppins] font-bold text-gray-800">
            <Link to={'/login'}>
             Sign-In
            </Link>
          </div>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-3 w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg> */}
        </button>
      </div>
    </div>
  );
};

export default LoginBar;
