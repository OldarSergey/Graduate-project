import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import { Link } from "react-router-dom";
const SidebarContext = createContext()

export default function Sidebar({ menuItems }) {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-blue-50 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-250"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, activeItem, setActiveItem }}>
          <ul className="flex-1 px-3 pl-0">
            {menuItems.map((item, index) => (
              <SidebarItem
                key={index}
                text={item.text}
                path={item.path}
                icon={item.icon} // Передаем иконку в SidebarItem
              />
            ))}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Oldar</h4>
              <span className="text-xs text-gray-600">cergo.luK@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, path }) {
  const { expanded, activeItem, setActiveItem } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      <a
        href={path}
        onClick={() => setActiveItem(path)}
        style={{ display: 'flex', alignItems: 'center', width: '100%' }} // Добавляем стили для отображения ссылки как flex-контейнера
      >
        {icon}
        <span
          className={`overflow-hidden flex-grow transition-all ${
            expanded ? "ml-3" : "ml-0"
          }`}
          style={{ maxWidth: expanded ? '100%' : 0 }} // Динамически изменяем максимальную ширину текста
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`} 
          />
        )}

        {!expanded && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-indigo-100 text-indigo-800 text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
          >
            {text}
          </div>
        )}
      </a>
    </li>
  );
}

