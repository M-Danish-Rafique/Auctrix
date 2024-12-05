import React from 'react';
import { 
  Home, 
  User, 
  Settings, 
  BarChart2, 
  MessageCircle, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ selectedItem }) => {
  const menuItems = [
    { icon: Home, name: 'Dashboard', key: 'dashboard' },
    { icon: User, name: 'Profile', key: 'profile' },
    { icon: BarChart2, name: 'Analytics', key: 'analytics' },
    { icon: MessageCircle, name: 'Messages', key: 'messages' },
    { icon: Settings, name: 'Settings', key: 'settings' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-100 transition-all duration-300 ease-in-out">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-10">
          App Name
        </h1>
        
        <nav>
          {menuItems.map((item) => (
            <div 
              key={item.key}
              className={`
                flex 
                items-center 
                px-4 
                py-3 
                rounded-lg 
                mb-2 
                cursor-pointer 
                transition-all 
                duration-200 
                ease-in-out
                ${selectedItem === item.key 
                  ? 'bg-blue-50 text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}
              `}
            >
              <item.icon 
                className={`
                  mr-3 
                  ${selectedItem === item.key 
                    ? 'text-blue-600' 
                    : 'text-gray-400'}
                `} 
                size={20} 
              />
              {item.name}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div 
            className="
              flex 
              items-center 
              px-4 
              py-3 
              rounded-lg 
              text-gray-600 
              hover:bg-gray-100 
              hover:text-gray-800 
              cursor-pointer 
              transition-all 
              duration-200 
              ease-in-out
            "
          >
            <LogOut className="mr-3 text-gray-400" size={20} />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;