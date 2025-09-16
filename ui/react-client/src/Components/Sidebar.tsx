import React, { ComponentType, lazy, Suspense } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/Inbox';
// import MailIcon from '@mui/icons-material/Mail';
// import * as Icon from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onItemClick: (item: string, path: string) => void;
}

const getIconComponent = (iconName:string) => {
  return lazy(() =>
    import("@mui/icons-material").then((module)=>{
      const IconComponent = module[iconName as keyof typeof module] as ComponentType<any> | undefined;

      if (!IconComponent) {
        throw new Error(`Icon ${IconComponent} not found`);
      }

      return {default: IconComponent};
    }));
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onItemClick }) => {
  const menuItems = [
    {
      label: 'School',
      icon: 'School',
      path: '/school'
    },
    {
      label:'Student',
      icon: 'Person',
      path: 'student'
    }
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {menuItems.map((item, index) =>  {
          const IconComponent = getIconComponent(item.icon);
          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => onItemClick(item.label,item.path)}>
                <ListItemIcon>
                  <Suspense fallback={<CircularProgress size={20} />}>
                    <IconComponent />
                  </Suspense>
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          )}
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;