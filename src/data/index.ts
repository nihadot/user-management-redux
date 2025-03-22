import { agents, blog, city, developers, projects } from "../assets/images/webp";
import { CategoryItem, DashboardItem, DeveloperItem, StatusItem } from "../pages/types";

export const dashboardItems: DashboardItem[] = [
    {
        id: 1,
        link: '/',
        name: 'Leads',
        icons: projects,
        count:10,
    },
    {
        id: 2,
        link: '/',
        name: 'Projects',
        icons: projects,
        count:100,

    },
    {
        id: 3,
        link: '/',
        name: 'Developers',
        icons: developers,
        count:20,

    },
    {
        id: 4,
        link: '/',
        name: 'Agents',
        icons: agents,
        count:40,

    },
    {
        id: 5,
        link: '/',
        name: 'Cities',
        icons: city,
        count:30,

    },
    {
        id: 6,
        link: '/',
        name: 'Blogs',
        icons: blog,
        count:5,

    },
]


export const categoryItem:CategoryItem[] = [
    {
        id:1,
        name: 'Frontend',
    },
    {
        id:2,
        name: 'Backend',
    },
    {
        id:3,
        name: 'Full Stack',
    },
    {
        id:4,
        name: 'Mobile',
    }
]


export const statusItem:StatusItem[] = [
    {
        id:1,
        name: 'Active',
    },
    {
        id:2,
        name: 'Inactive',
    },
    {
        id:3,
        name: 'Pending',
    },
    {
        id:4,
        name: 'Archived',
    },
    {
        id:5,
        name: 'Closed',
    },
    {
        id:6,
        name: 'Canceled',
    },
]


export const agentItem:StatusItem[] = [
    {
        id:1,
        name: 'Agent 1',
    },
    {
        id:2,
        name: 'Agent 2',
    },
    {
        id:3,
        name: 'gent 3',
    },
    {
        id:4,
        name: 'Agent 4',
    },
    {
        id:5,
        name: 'Agent 5',
    },
    {
        id:6,
        name: 'Agent 6',
    },
]


export const developerItem:DeveloperItem[] = [
    {
        id:1,
        name: 'Developer 1',
    },
    {
        id:2,
        name: 'Developer 2',
    },
    {
        id:3,
        name: 'Developer 3',
    },
    {
        id:4,
        name: 'Developer 4',
    },
    {
        id:5,
        name: 'Developer 5',
    },
    {
        id:6,
        name: 'Developer 6',
    },
]