import Container from "@/app/_components/container";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  if (!preview) {
    return null;
  }

  return (
    <div className="border-b border-orange-100 bg-orange-50 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
      <Container>
        <div className="py-2 text-center text-sm">
          预览模式营业中。{" "}
          <a
            href="/api/exit-preview"
            className="underline transition-colors duration-200 hover:text-orange-700 dark:hover:text-orange-200"
          >
            退出预览
          </a>
          。
        </div>
      </Container>
    </div>
  );
};

export default Alert;
