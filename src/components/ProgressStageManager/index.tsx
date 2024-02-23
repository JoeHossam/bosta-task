import { LucideIcon } from "lucide-react";
import Stage from "./Stage";

interface Props {
  stages: { children: React.ReactNode; icon: LucideIcon }[];
  activeIdx: number;
  color?: string;
}
const ProgressStageManager = ({ stages, activeIdx, color }: Props) => {
  return (
    <div className="flex flex-col md:flex-row">
      {stages.map((stage, idx) => (
        <Stage
          key={idx}
          position={
            idx === 0 ? "start" : idx === stages.length - 1 ? "end" : "middle"
          }
          icon={stage.icon}
          state={
            activeIdx === idx ? "active" : idx < activeIdx ? "done" : "disabled"
          }
          primaryColorClass={color}
          stagesLength={stages.length}
        >
          {stage.children}
        </Stage>
      ))}
    </div>
  );
};

export default ProgressStageManager;
