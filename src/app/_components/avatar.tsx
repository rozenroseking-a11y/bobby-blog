type Props = {
  name: string;
};

const Avatar = ({ name }: Props) => {
  const [icon, ...labelParts] = name.split(" ");
  const label = labelParts.join(" ") || name;
  const hasIcon = labelParts.length > 0;

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-2xl shadow-sm ring-1 ring-orange-100 dark:bg-orange-300/10 dark:ring-orange-300/20"
        aria-hidden="true"
      >
        {hasIcon ? icon : "🐾"}
      </div>
      <div>
        <div className="text-xs font-medium text-orange-700 dark:text-orange-200">
          波比事务所内部栏目
        </div>
        <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {hasIcon ? label : name}
        </div>
      </div>
    </div>
  );
};

export default Avatar;
