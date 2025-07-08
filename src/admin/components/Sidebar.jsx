export const Sidebar = () => (
  <aside className="w-64 bg-[#fdf9f3] p-6 border-r border-gray-200 flex flex-col">
    <h2 className="font-bold mb-8 text-gray-800">Dashboard</h2>
    <nav className="space-y-5 flex-1">
      <div className="flex justify-between items-center text-gray-700 hover:text-red cursor-pointer">
        <span>Reservation</span>
        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">12</span>
      </div>
      <div className="text-blue-600 cursor-pointer hover:text-blue-700">
        + Ajouter un service
      </div>
      <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
        Liste de service
      </div>
      <div className="text-red-500 mt-12 hover:text-red-600 cursor-pointer">
        Deleted
      </div>
    </nav>
  </aside>
);