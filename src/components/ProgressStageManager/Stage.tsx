import { Check, LucideIcon } from "lucide-react";
import React from "react";

// type TProgressStage = {

// }

export type TProgressStage = {
  children: React.ReactNode;
  icon: LucideIcon;
  position: "start" | "end" | "middle";
  state: "done" | "active" | "disabled";
  stagesLength: number;
  primaryColorClass?: string;
};

const Stage = ({
  children,
  position,
  state,
  icon,
  stagesLength,
  primaryColorClass = "bg-primary",
}: TProgressStage) => {
  const getIconPosition = () => {
    switch (position) {
      case "end":
        return "end-0";
      case "start":
        return "start-0";
      case "middle":
        return "left-1/2 transform -translate-x-1/2";
    }
  };
  const getIconPositionY = () => {
    switch (position) {
      case "end":
        return "bottom-0";
      case "start":
        return "top-0";
      case "middle":
        return "top-1/2 transform -translate-y-1/2";
    }
  };

  const bgColor = state !== "disabled" ? primaryColorClass : "bg-secondary";

  const secondHalfColor =
    position === "end" && state === "active"
      ? bgColor
      : state !== "active"
      ? bgColor
      : "bg-secondary";

  const iconSize = state !== "done" ? 40 : 20;
  const Icon = state === "done" ? Check : icon;

  const alignChildren =
    position === "middle"
      ? "md:justify-center"
      : position === "end"
      ? "md:justify-end"
      : "md:justify-start";

  const alignChildrenY =
    position === "middle"
      ? "items-center"
      : position === "end"
      ? "items-end"
      : "items-start";

  return (
    <>
      <div
        className={`hidden h-full flex-col ${alignChildren} md:flex`}
        style={{
          width: `calc(100%/${stagesLength})`,
        }}
      >
        <div className="flex flex-wrap w-full relative">
          <span className={`${bgColor} h-2 w-1/2`} />
          <Icon
            className={`absolute ${
              iconSize === 40 ? "-top-[18px]" : "-top-2"
            } basis-0 ${getIconPosition()} ${
              iconSize === 20 ? "p-1" : "p-2"
            } rounded-full ${bgColor}`}
            size={iconSize}
            color={bgColor === "bg-secondary" ? "grey" : "white"}
            strokeWidth={4}
          />
          <span className={`${secondHalfColor} h-2 w-1/2`} />
        </div>
        <span className="mt-4">{children}</span>
      </div>
      <div className={`flex w-full min-h-14 md:hidden`}>
        <div className="flex flex-col flex-wrap w-2 relative">
          <span className={`${bgColor} h-1/2`} />
          <Icon
            className={`absolute ${
              ""
              // iconSize === 40 ? "-end-[18px]" : "-end-2"
            } basis-0 left-1/2 transform -translate-x-1/2 ${getIconPositionY()} ${
              iconSize === 20 ? "p-1" : "p-2"
            } rounded-full ${bgColor}`}
            size={iconSize}
            color={bgColor === "bg-secondary" ? "grey" : "white"}
            strokeWidth={4}
          />
          <span className={`${secondHalfColor} h-1/2`} />
        </div>
        <span className={`flex ${alignChildrenY} ms-8`}>{children}</span>
      </div>
    </>
  );
};

export default Stage;
