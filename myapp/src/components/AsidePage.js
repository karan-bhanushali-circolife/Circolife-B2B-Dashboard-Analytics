import React from "react";
import { Link, useLocation } from "react-router-dom";
export default function AsidePage() {
  const userrole = localStorage.getItem("userrole");
  const username = localStorage.getItem("username");
  const location = useLocation();
  const isAssignRole = location.pathname.startsWith("/Userpage");
  const isControl = location.pathname === "/Controls";
  const isService = location.pathname === "/Service";
  const isHomepage = location.pathname === "/Homepage";
  const isLogout = location.pathname === "/";
  const handleLogout = () => {
    // Clear all data from localStorage
    localStorage.clear();
  };
  return (
    <aside className="fixed top-0 left-0 w-64 bg-background hover:boxShadow-lg-md flex flex-col min-h-screen overflow-hidden border-r-2 border-l-black">
      <div className="p-8 flex-1">
        <div className="flex items-center mb-6">
          <div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3"
            >
              <rect
                x="0.5"
                y="0.5"
                width="39"
                height="39"
                rx="19.5"
                stroke="#A14996"
              />
              <path
                d="M20 10C21.3261 10 22.5979 10.5268 23.5355 11.4645C24.4732 12.4021 25 13.6739 25 15C25 16.3261 24.4732 17.5979 23.5355 18.5355C22.5979 19.4732 21.3261 20 20 20C18.6739 20 17.4021 19.4732 16.4645 18.5355C15.5268 17.5979 15 16.3261 15 15C15 13.6739 15.5268 12.4021 16.4645 11.4645C17.4021 10.5268 18.6739 10 20 10ZM20 30C20 30 30 30 30 27.5C30 24.5 25.125 21.25 20 21.25C14.875 21.25 10 24.5 10 27.5C10 30 20 30 20 30Z"
                fill="#A14996"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-md">{username}</p>
            <p className="text-sm text-gray-600">{userrole}</p>
          </div>
        </div>
        <nav className="mt-10">
          <ul>
            <Link to="/Homepage" className="group">
              <li
                className={`flex items-center px-4 py-2 hover:rounded-lg hover:cursor-pointer ${
                  isHomepage
                    ? "bg-primary text-white rounded-lg px-4 py-2 group-hover:bg-primary-light group-hover:text-primary-dark"
                    : "group-hover:text-primary"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className={` mr-3 ${
                    isHomepage
                      ? "group-hover:text-primary-dark"
                      : "group-hover:text-primary"
                  }`}
                >
                  <g clipPath="url(#clip0_811_980)">
                    <path
                      d="M10 0.66671L10.4333 0.160044C10.3126 0.0567576 10.1589 0 10 0C9.8411 0 9.68742 0.0567576 9.56667 0.160044L10 0.66671ZM0.666667 8.66671L0.233333 8.16004L0 8.36004V8.66671H0.666667ZM7.33333 19.3334V20C7.51014 20 7.67971 19.9298 7.80474 19.8048C7.92976 19.6798 8 19.5102 8 19.3334H7.33333ZM12.6667 19.3334H12C12 19.5102 12.0702 19.6798 12.1953 19.8048C12.3203 19.9298 12.4899 20 12.6667 20V19.3334ZM19.3333 8.66671H20V8.36004L19.7667 8.16004L19.3333 8.66671ZM2 20H7.33333V18.6667H2V20ZM19.7667 8.16004L10.4333 0.160044L9.56667 1.17338L18.9 9.17338L19.7667 8.16004ZM9.56667 0.160044L0.233333 8.16004L1.1 9.17338L10.4333 1.17338L9.56667 0.160044ZM8 19.3334V15.3334H6.66667V19.3334H8ZM12 15.3334V19.3334H13.3333V15.3334H12ZM12.6667 20H18V18.6667H12.6667V20ZM20 18V8.66671H18.6667V18H20ZM0 8.66671V18H1.33333V8.66671H0ZM10 13.3334C10.5304 13.3334 11.0391 13.5441 11.4142 13.9192C11.7893 14.2942 12 14.8029 12 15.3334H13.3333C13.3333 14.4493 12.9821 13.6015 12.357 12.9764C11.7319 12.3512 10.8841 12 10 12V13.3334ZM10 12C9.11594 12 8.2681 12.3512 7.64298 12.9764C7.01786 13.6015 6.66667 14.4493 6.66667 15.3334H8C8 14.8029 8.21071 14.2942 8.58579 13.9192C8.96086 13.5441 9.46957 13.3334 10 13.3334V12ZM18 20C18.5304 20 19.0391 19.7893 19.4142 19.4143C19.7893 19.0392 20 18.5305 20 18H18.6667C18.6667 18.1769 18.5964 18.3464 18.4714 18.4714C18.3464 18.5965 18.1768 18.6667 18 18.6667V20ZM2 18.6667C1.82319 18.6667 1.65362 18.5965 1.5286 18.4714C1.40357 18.3464 1.33333 18.1769 1.33333 18H0C0 18.5305 0.210714 19.0392 0.585786 19.4143C0.960859 19.7893 1.46957 20 2 20V18.6667Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_811_980">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span
                  className={`${
                    isHomepage
                      ? "group-hover:text-primary-dark"
                      : "group-hover:text-primary"
                  }`}
                >
                  Home
                </span>
              </li>
            </Link>
            <Link to="/Controls" className="group">
              <li
                className={`flex items-center px-4 py-2 hover:rounded-lg hover:cursor-pointer ${
                  isControl
                    ? "bg-primary text-white rounded-lg px-4 py-2 group-hover:bg-primary-light group-hover:text-primary-dark"
                    : "group-hover:text-primary"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`stroke-current mr-3 ${
                    isControl
                      ? "group-hover:text-primary-dark"
                      : "group-hover:text-primary"
                  }`}
                >
                  <g clipPath="url(#clip0_811_998)">
                    <path
                      d="M9.67136 0.708496L9.67136 12.7296M9.67136 16.9727V18.7085M9.67136 16.9727C9.07921 16.9727 8.51131 16.7492 8.09259 16.3515C7.67388 15.9537 7.43865 15.4142 7.43865 14.8516C7.43865 14.2891 7.67388 13.7496 8.09259 13.3518C8.51131 12.954 9.07921 12.7305 9.67136 12.7305C10.2635 12.7305 10.8314 12.954 11.2501 13.3518C11.6688 13.7496 11.9041 14.2891 11.9041 14.8516C11.9041 15.4142 11.6688 15.9537 11.2501 16.3515C10.8314 16.7492 10.2635 16.9727 9.67136 16.9727ZM16.4381 0.708496V6.30114M16.4381 6.30114C17.0304 6.30114 17.599 6.52515 18.0178 6.92302C18.4366 7.32089 18.6719 7.86052 18.6719 8.4232C18.6719 8.98574 18.4356 9.52525 18.0169 9.92303C17.5982 10.3208 17.0303 10.5443 16.4381 10.5443M16.4381 6.30114C15.8458 6.30114 15.2783 6.52515 14.8595 6.92302C14.4407 7.32089 14.2054 7.86052 14.2054 8.4232C14.2054 8.98574 14.4406 9.52525 14.8594 9.92303C15.2781 10.3208 15.846 10.5443 16.4381 10.5443M16.4381 10.5443V18.7085M2.90459 0.708496V3.72958M2.90459 7.97271L2.90459 18.7085M2.90459 7.97271C2.31244 7.97271 1.74454 7.74924 1.32582 7.35146C0.907107 6.95368 0.671875 6.41418 0.671875 5.85163C0.671875 5.57309 0.729626 5.29727 0.841831 5.03993C0.954035 4.78259 1.1185 4.54876 1.32582 4.3518C1.53315 4.15484 1.77928 3.9986 2.05017 3.89201C2.32105 3.78541 2.61139 3.73055 2.90459 3.73055C3.1978 3.73055 3.48813 3.78541 3.75902 3.89201C4.0299 3.9986 4.27603 4.15484 4.48336 4.3518C4.69069 4.54876 4.85515 4.78259 4.96735 5.03993C5.07956 5.29727 5.13731 5.57309 5.13731 5.85163C5.13731 6.41418 4.90208 6.95368 4.48336 7.35146C4.06465 7.74924 3.49675 7.97271 2.90459 7.97271Z"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_811_998">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="matrix(0 -1 1 0 0 20)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span
                  className={`${
                    isControl
                      ? "group-hover:text-primary-dark"
                      : "group-hover:text-primary"
                  }`}
                >
                  Controls
                </span>
              </li>
            </Link>
            <Link to="/Userpage" className="group">
              <li
                className={`flex items-center px-4 py-2 hover:rounded-lg hover:cursor-pointer ${
                  isAssignRole
                    ? "bg-primary text-white rounded-lg px-4 py-2 group-hover:bg-primary-light group-hover:text-primary-dark"
                    : "group-hover:text-primary"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`stroke-current mr-3 ${
                    isAssignRole
                      ? "group-hover:stroke-primary-dark"
                      : "group-hover:stroke-primary"
                  }`}
                >
                  <path
                    d="M11 10C13.7614 10 16 7.98528 16 5.5C16 3.01472 13.7614 1 11 1C8.23858 1 6 3.01472 6 5.5C6 7.98528 8.23858 10 11 10Z"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M17 12.1777C16.1654 11.2827 15.1058 10.6816 13.9971 10.3438C8.73174 8.75119 3.33139 12.8709 3 19H10.1227"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.0738 11.7384C19.653 11.8124 20.0696 12.3402 19.9934 12.9124C19.9731 13.1443 19.8613 13.3613 19.7089 13.5142L18.1948 14.5452L17.0312 12.9272L18.4285 11.8765C18.6165 11.7729 18.8451 11.7187 19.0738 11.7384Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.925 12.9917L11.3207 16.9085C11.2852 16.9331 11.2649 16.9726 11.2445 17.012L10.4265 18.5067C10.3808 18.6005 10.3909 18.704 10.457 18.7879C10.4925 18.852 10.5586 18.8915 10.6348 18.9014C10.6653 18.9063 10.6958 18.8964 10.7263 18.9014L12.4487 18.6153C12.4944 18.6054 12.5402 18.6005 12.5757 18.5758L18.1089 14.5998L16.925 12.9917Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6953 17.4014C11.7868 17.4507 11.9595 17.5642 12.051 17.6875C12.1628 17.8355 12.1983 17.9933 12.2085 18.0969L11.3803 18.2252C11.3244 18.235 11.2787 18.1758 11.3041 18.1216L11.6953 17.4014Z"
                    fill="currentColor"
                  />
                </svg>
                <span
                  className={`${
                    isAssignRole
                      ? "group-hover:text-primary-dark"
                      : "group-hover:text-primary"
                  } transition-colors`}
                >
                  Assign Roles
                </span>
              </li>
            </Link>
            <Link to="/Service" className="group">
              <li
                className={`flex items-center px-4 py-2 hover:rounded-lg hover:cursor-pointer ${
                  isService
                    ? "bg-primary text-white rounded-lg px-4 py-2 group-hover:bg-primary-light group-hover:text-primary-dark"
                    : "group-hover:text-primary"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`stroke-current mr-3 ${
                    isService
                      ? "group-hover:text-primary-dark"
                      : "group-hover:text-primary"
                  }`}
                >
                  <path
                    d="M7.49998 10.3C7.29999 9.90001 7.19998 9.4 7.19998 8.9C7.19998 6.8 8.89997 5.10001 11 5.10001C13.1 5.10001 14.8 6.8 14.8 8.9C14.8 11 13.1 12.7 11 12.7C10.4 12.7 9.89997 12.6 9.39998 12.3M6.99999 14.8C7.09998 15.3 7.09998 15.7 6.89999 16.2C7.49998 16.5 8.09998 16.8 8.79998 17C9.19997 16.2 10.1 15.6 11 15.6C12 15.6 12.8 16.2 13.2 17C13.9 16.8 14.5 16.6 15.1 16.2C14.8 15.3 15 14.3 15.7 13.7C16.3999 13 17.3999 12.8 18.1999 13.1C18.4999 12.5 18.7999 11.9 19 11.2C18.1999 10.8 17.5999 9.90001 17.5999 9.00001C17.5999 8 18.1999 7.20001 19 6.8C18.7999 6.1 18.5999 5.5 18.1999 4.9C17.2999 5.2 16.3 5 15.7 4.3C15 3.60001 14.8 2.60001 15.1 1.80001C14.5 1.50001 13.9 1.20001 13.2 1C12.8 1.80001 11.9 2.40001 11 2.40001C9.99998 2.40001 9.19997 1.80001 8.79998 1C8.09998 1.10001 7.49998 1.3 6.89999 1.6C7.19998 2.5 6.99999 3.50001 6.29999 4.10001C5.59998 4.9 4.6 5.10001 3.79999 4.80001C3.4 5.40001 3.19999 6.00001 3 6.7C3.79999 7.1 4.39999 8 4.39999 8.9C4.39999 9.90001 3.79999 10.7 3 11.1C3.19999 11.8 3.4 12.4 3.79999 13C4.2 12.9 4.6 12.8 4.9 12.9"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeMiterlimit="22.9256"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9785 8.78545C12.0644 9.50588 11.8927 10.2263 11.4635 10.7409C10.9485 11.3584 10.2618 11.5642 9.57511 11.2555C9.48927 11.2555 9.40343 11.2555 9.40343 11.3584C8.54507 12.3875 6.48499 14.8576 5.62661 15.8867C5.54077 15.9897 5.54077 15.9897 5.54077 16.0926C5.71245 16.813 5.62661 17.7392 5.11159 18.3568C4.68241 18.8713 4.08155 19.0771 3.48068 18.9743C3.39486 18.9743 3.39486 18.8713 3.30901 18.8713C3.08073 18.9743 3.30901 18.6656 3.39486 18.6656L4.51073 17.2247C4.59657 17.1217 4.59657 17.0188 4.51073 16.9159L3.73819 15.9897C3.65237 15.8867 3.56653 15.8867 3.48068 15.9897L2.92275 16.6586L2.36481 17.3276C2.1073 17.6307 2.19313 17.4305 2.1073 17.3276C2.02146 17.3276 2.02146 17.2247 2.02146 17.1217C1.93562 16.4013 2.1073 15.6809 2.53648 15.1663C3.0515 14.5488 3.73819 14.343 4.4249 14.6517C4.51073 14.6517 4.59657 14.6517 4.59657 14.5488C5.45494 13.5196 7.51503 11.0496 8.37339 10.0205C8.45923 9.91755 8.45923 9.91755 8.45923 9.81463C8.28756 9.0942 8.37339 8.16795 8.88841 7.55044C9.3176 7.03587 9.91845 6.93294 10.5193 7.03587C10.6052 7.03587 10.691 7.03587 10.691 7.13879C10.691 7.24169 10.691 7.34462 10.6052 7.34462L9.48927 8.68255C9.40343 8.78545 9.40343 8.88837 9.48927 8.9913L10.2618 9.91755C10.3476 10.0205 10.4335 10.0205 10.5193 9.91755L11.6352 8.57962C11.721 8.4767 11.721 8.4767 11.8069 8.4767C11.9785 8.30254 11.8927 8.68255 11.9785 8.78545Z"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeMiterlimit="10"
                  />
                </svg>
                <span
                  className={`${
                    isService
                      ? "group-hover:text-primary-dark"
                      : "group-hover:text-primary"
                  }`}
                >
                  Service Request
                </span>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <Link to="/" className="group" onClick={handleLogout}>
          <li
            className={`flex items-center px-4 py-2 hover:rounded-lg hover:cursor-pointer ${
              isLogout
                ? "bg-primary text-white rounded-lg px-4 py-2 group-hover:bg-primary-light group-hover:text-primary-dark"
                : "group-hover:text-primary"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`stroke-current mr-3 ${
                isService
                  ? "group-hover:text-primary-dark"
                  : "group-hover:text-primary"
              }`}
            >
              <path
                d="M14.1641 5.83333L12.9891 7.00833L15.1391 9.16667H6.66406V10.8333H15.1391L12.9891 12.9833L14.1641 14.1667L18.3307 10L14.1641 5.83333ZM3.33073 4.16667H9.9974V2.5H3.33073C2.41406 2.5 1.66406 3.25 1.66406 4.16667V15.8333C1.66406 16.75 2.41406 17.5 3.33073 17.5H9.9974V15.8333H3.33073V4.16667Z"
                fill="black"
                className="group-hover:fill-white"
              />
            </svg>
            <span
              className={`${
                isLogout
                  ? "group-hover:text-primary-dark"
                  : "group-hover:text-primary"
              }`}
            >
              Logout
            </span>
          </li>
        </Link>
      </div>
    </aside>
  );
}
