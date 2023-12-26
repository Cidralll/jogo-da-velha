// icon:arrow-right-square | Lucide https://lucide.dev/ | Lucide
import * as React from "react";

function IconArrowRightSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M5 3 H19 A2 2 0 0 1 21 5 V19 A2 2 0 0 1 19 21 H5 A2 2 0 0 1 3 19 V5 A2 2 0 0 1 5 3 z" />
      <path d="M8 12h8M12 16l4-4-4-4" />
    </svg>
  );
}

export default IconArrowRightSquare;
