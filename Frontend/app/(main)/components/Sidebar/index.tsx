'use client'

import * as React from 'react'
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	Menu,
	PieChart,
	Settings2,
	SquareTerminal,
	SquarePen
} from 'lucide-react'

import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
// import { NavUser } from '@/components/nav-user'
import { Sidebar as SidebarPrimitive, SidebarTrigger, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/ui/primitives'

// This is sample data.
const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg'
	},
	navMain: [
		{
			title: 'Recent Chats',
			url: '#',
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'History',
					url: '#'
				},
				{
					title: 'Starred',
					url: '#'
				},
				{
					title: 'Settings',
					url: '#'
				}
			]
		},
		{
			title: 'Open Orders',
			url: '#',
			icon: Bot,
			items: [
				{
					title: 'Genesis',
					url: '#'
				},
				{
					title: 'Explorer',
					url: '#'
				},
				{
					title: 'Quantum',
					url: '#'
				}
			]
		},
		{
			title: 'Completed Orders',
			url: '#',
			icon: BookOpen,
			items: [
				{
					title: 'Introduction',
					url: '#'
				},
				{
					title: 'Get Started',
					url: '#'
				},
				{
					title: 'Tutorials',
					url: '#'
				},
				{
					title: 'Changelog',
					url: '#'
				}
			]
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings2,
			items: [
				{
					title: 'General',
					url: '#'
				},
				{
					title: 'Team',
					url: '#'
				},
				{
					title: 'Billing',
					url: '#'
				},
				{
					title: 'Limits',
					url: '#'
				}
			]
		}
	],
	projects: [
		{
			name: 'Design Engineering',
			url: '#',
			icon: Frame
		},
		{
			name: 'Sales & Marketing',
			url: '#',
			icon: PieChart
		},
		{
			name: 'Travel',
			url: '#',
			icon: Map
		}
	]
}

export default function Sidebar({ ...props }: React.ComponentProps<typeof SidebarPrimitive>) {
	return (
		<SidebarPrimitive collapsible="icon" className="bg-ppGray500 text-ppGray100 gap-0" {...props}>
			<SidebarHeader>
				<SidebarTrigger>
					<Menu color="white" size={24} />
				</SidebarTrigger>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				{/* <NavUser user={data.user} /> */}
			</SidebarFooter>
			<SidebarRail />
		</SidebarPrimitive>
	)
}
