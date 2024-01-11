import { ReactNode } from 'react';

interface IBasicLayoutProps {
  children: ReactNode;
}

const BasicLayout: React.FC<IBasicLayoutProps> = ({ children }) => {
  return (
    <>
      <header className="h-20 bg-primary flex items-center p-4">
        <h1 className="text-3xl text-black">Title</h1>
      </header>
      <main className="flex flex-col p-4 h-full">{children}</main>
    </>
  );
};

export default BasicLayout;
