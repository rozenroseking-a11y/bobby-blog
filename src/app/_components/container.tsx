type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="mx-auto w-full max-w-[1180px] px-4 md:px-6">{children}</div>;
};

export default Container;
