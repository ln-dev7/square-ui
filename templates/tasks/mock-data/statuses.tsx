import React from "react";
import {
  IconEdit,
  IconCircleDot,
  IconProgress,
  IconMessageDots,
  IconCircleCheck,
} from "@tabler/icons-react";

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface Status {
  id: string;
  name: string;
  color: string;
  icon: React.FC<IconProps>;
}

const DraftIcon: React.FC<IconProps> = ({ className, style }) => (
  <IconEdit className={className} style={style} size={16} />
);

const TodoIcon: React.FC<IconProps> = ({ className, style }) => (
  <IconCircleDot className={className} style={style} size={16} />
);

const InProgressIcon: React.FC<IconProps> = ({ className, style }) => (
  <IconProgress className={className} style={style} size={16} />
);

const ReviewIcon: React.FC<IconProps> = ({ className, style }) => (
  <IconMessageDots className={className} style={style} size={16} />
);

const CompletedIcon: React.FC<IconProps> = ({ className, style }) => (
  <IconCircleCheck className={className} style={style} size={16} />
);

export const statuses: Status[] = [
  {
    id: "draft",
    name: "Draft",
    color: "#f97316",
    icon: DraftIcon,
  },
  {
    id: "todo",
    name: "Todo",
    color: "#3b82f6",
    icon: TodoIcon,
  },
  {
    id: "in-progress",
    name: "Inprogress",
    color: "#eab308",
    icon: InProgressIcon,
  },
  {
    id: "review",
    name: "Review",
    color: "#a855f7",
    icon: ReviewIcon,
  },
  {
    id: "completed",
    name: "Completed",
    color: "#22c55e",
    icon: CompletedIcon,
  },
];

export const StatusIcon: React.FC<{
  statusId: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ statusId, className, style }) => {
  const currentStatus = statuses.find((s) => s.id === statusId);
  if (!currentStatus) return null;

  const IconComponent = currentStatus.icon;
  return <IconComponent className={className} style={style} />;
};
