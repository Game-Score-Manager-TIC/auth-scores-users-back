import React from "react";

const IconClose = ({ className }: { className: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" className={className} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5681 7.83181C16.7439 8.00755 16.7439 8.29247 16.5681 8.46821L8.46815 16.5682C8.29241 16.7439 8.00749 16.7439 7.83175 16.5682C7.65602 16.3925 7.65602 16.1076 7.83175 15.9318L15.9318 7.83181C16.1075 7.65608 16.3924 7.65608 16.5681 7.83181Z"
        fill="#272727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.83175 7.83181C8.00749 7.65608 8.29241 7.65608 8.46815 7.83181L16.5681 15.9318C16.7439 16.1076 16.7439 16.3925 16.5681 16.5682C16.3924 16.7439 16.1075 16.7439 15.9318 16.5682L7.83175 8.46821C7.65602 8.29247 7.65602 8.00755 7.83175 7.83181Z"
        fill="#272727"
      />
    </svg>
  );
};

export default IconClose;
