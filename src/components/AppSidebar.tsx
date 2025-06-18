
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Home, BarChart3, Search, FileText, ChevronLeft, HelpCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    title: 'Home',
    url: '/home',
    icon: Home,
  },
  {
    title: 'Aspen Studies',
    url: '/cohort',
    icon: BarChart3,
  },
  {
    title: 'Cohort Explorer',
    url: '/explorer',
    icon: Search,
  },
];

const reportsItems = [
  {
    title: 'Insight Reports',
    url: '/reports',
    icon: FileText,
  },
  {
    title: 'Documentation',
    url: '/documentation',
    icon: BookOpen,
  },
];

const helpItems = [
  {
    title: 'FAQ',
    url: '/faq',
    icon: HelpCircle,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <img 
            src="/om1-logo.png" 
            alt="OM1 Logo" 
            className="h-10 w-auto group-data-[collapsible=icon]:hidden"
          />
          <span className="pt-2 text-xl font-bold text-[#003f7f] group-data-[collapsible=icon]:hidden">Aspen</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Reports</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupLabel>Help</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {helpItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === item.url}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
      <SidebarRail className="after:hidden">
        <Button
          variant="outline"
          size="icon"
          className="mt-4 h-6 w-24 bg-background border-border hover:bg-accent hover:text-accent-foreground"
          onClick={toggleSidebar}
        >
          <ChevronLeft className={`h-4 w-4 transition-transform duration-200 ${state === 'collapsed' ? 'rotate-180' : ''}`} />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarRail>
    </Sidebar>
  );
}
