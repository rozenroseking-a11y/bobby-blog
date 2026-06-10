import cn from "classnames";

type Props = {
  avatarUrl?: string | null;
  nickname?: string | null;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-9 w-9 text-base",
  md: "h-12 w-12 text-xl",
  lg: "h-20 w-20 text-3xl",
};

function getAvatarLabel(nickname?: string | null) {
  const trimmed = nickname?.trim();

  if (!trimmed) {
    return "🐾";
  }

  return trimmed[0]?.toUpperCase() ?? "🐾";
}

export function UserAvatar({ avatarUrl, nickname, size = "md" }: Props) {
  const label = getAvatarLabel(nickname);

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={nickname ? `${nickname} 的头像` : "用户头像"}
        className={cn(
          "shrink-0 rounded-full object-cover shadow-sm ring-2 ring-orange-100 dark:ring-orange-300/20",
          sizeClasses[size],
        )}
      />
    );
  }

  return (
    <div
      aria-label={nickname ? `${nickname} 的默认头像` : "默认猫爪头像"}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-50 font-bold text-orange-700 shadow-sm ring-2 ring-orange-100 dark:bg-orange-300/10 dark:text-orange-100 dark:ring-orange-300/20",
        sizeClasses[size],
      )}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        role="img"
      >
        <circle cx="50" cy="50" r="50" fill="currentColor" opacity="0.08" />
        <circle cx="28" cy="30" r="9" fill="currentColor" opacity="0.18" />
        <circle cx="50" cy="24" r="10" fill="currentColor" opacity="0.14" />
        <circle cx="72" cy="30" r="9" fill="currentColor" opacity="0.18" />
        <path
          d="M28 66c0-14 10-24 22-24s22 10 22 24c0 10-8 16-22 16s-22-6-22-16z"
          fill="currentColor"
          opacity="0.12"
        />
      </svg>
      <span className="relative">{label}</span>
    </div>
  );
}
