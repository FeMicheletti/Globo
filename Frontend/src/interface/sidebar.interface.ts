export interface SideBarProps { 
	closeSideBar: () => void;
	userStatusUpdate: () => void;
	userStatus: number;
	openProfile: () => void;
}