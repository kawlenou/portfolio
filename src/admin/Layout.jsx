export const Layout = ({ sidebar, header, children }) => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {sidebar}
      <main className="flex-1 flex flex-col overflow-hidden">
        {header}
        <div className="flex-1 overflow-auto p-6 pt-2">
          {children}
        </div>
      </main>
    </div>
  );
};