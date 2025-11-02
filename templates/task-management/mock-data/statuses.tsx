import React from "react";

export interface Status {
  id: string;
  name: string;
  color: string;
  icon: React.FC;
}

export const BacklogIcon: React.FC = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="#53565A"
        strokeWidth="2"
        strokeDasharray="1.4 1.74"
        strokeDashoffset="0.65"
      ></circle>
      <circle
        className="progress"
        cx="7"
        cy="7"
        r="2"
        fill="none"
        stroke="#53565A"
        strokeWidth="4"
        strokeDasharray="0 100"
        strokeDashoffset="0"
        transform="rotate(-90 7 7)"
      ></circle>
    </svg>
  );
};

export const PausedIcon: React.FC = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="2"
        strokeDasharray="3.14 0"
        strokeDashoffset="-0.7"
      ></circle>
      <circle
        className="progress"
        cx="7"
        cy="7"
        r="2"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="4"
        strokeDasharray="6.2517693806436885 100"
        strokeDashoffset="0"
        transform="rotate(-90 7 7)"
      ></circle>
    </svg>
  );
};

export const ToDoIcon: React.FC = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="#53565A"
        strokeWidth="2"
        strokeDasharray="3.14 0"
        strokeDashoffset="-0.7"
      ></circle>
      <circle
        className="progress"
        cx="7"
        cy="7"
        r="2"
        fill="none"
        stroke="#53565A"
        strokeWidth="4"
        strokeDasharray="0 100"
        strokeDashoffset="0"
        transform="rotate(-90 7 7)"
      ></circle>
    </svg>
  );
};

export const InProgressIcon: React.FC = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="#facc15"
        strokeWidth="2"
        strokeDasharray="3.14 0"
        strokeDashoffset="-0.7"
      ></circle>
      <circle
        className="progress"
        cx="7"
        cy="7"
        r="2"
        fill="none"
        stroke="#facc15"
        strokeWidth="4"
        strokeDasharray="2.0839231268812295 100"
        strokeDashoffset="0"
        transform="rotate(-90 7 7)"
      ></circle>
    </svg>
  );
};

export const TechnicalReviewIcon: React.FC = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
        strokeDasharray="3.14 0"
        strokeDashoffset="-0.7"
      ></circle>
      <circle
        className="progress"
        cx="7"
        cy="7"
        r="2"
        fill="none"
        stroke="#22c55e"
        strokeWidth="4"
        strokeDasharray="4.167846253762459 100"
        strokeDashoffset="0"
        transform="rotate(-90 7 7)"
      ></circle>
    </svg>
  );
};

export const CompletedIcon: React.FC = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2"
        strokeDasharray="3.14 0"
        strokeDashoffset="-0.7"
      ></circle>
      <path
        d="M4.5 7L6.5 9L9.5 5"
        stroke="#8b5cf6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const statuses: Status[] = [
  { id: "backlog", name: "Backlog", color: "#53565A", icon: BacklogIcon },
  { id: "to-do", name: "Todo", color: "#53565A", icon: ToDoIcon },
  {
    id: "in-progress",
    name: "In Progress",
    color: "#facc15",
    icon: InProgressIcon,
  },
  {
    id: "technical-review",
    name: "Technical Review",
    color: "#22c55e",
    icon: TechnicalReviewIcon,
  },
  { id: "paused", name: "Paused", color: "#0ea5e9", icon: PausedIcon },
  { id: "completed", name: "Completed", color: "#8b5cf6", icon: CompletedIcon },
];

export const StatusIcon: React.FC<{ statusId: string }> = ({ statusId }) => {
  const currentStatus = statuses.find((s) => s.id === statusId);
  if (!currentStatus) return null;

  const IconComponent = currentStatus.icon;
  return <IconComponent />;
};
