type LogoProps = {
  size?: number;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

const Logo: React.FC<LogoProps> = ({ size = 20, className, ...restProps }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      className="fill-current text-[#0089ff]"
      {...restProps}
    >
      <path d="M0 321.829l468.114 474.551-224.49 227.621h-105.794c-76.127 0-137.83-62.581-137.83-139.732v-562.439zM796.409 555.886l227.591 224.49v105.794c0 76.127-62.552 137.83-139.732 137.83h-562.439l474.58-468.114zM886.199 0c76.098 0 137.801 62.552 137.801 139.732v562.439l-468.114-474.551 224.49-227.621zM702.171 0l-474.551 468.114-227.621-224.461v-105.852c0-76.098 62.552-137.801 139.732-137.801h562.439z" />
    </svg>
  );
};

export default Logo;
