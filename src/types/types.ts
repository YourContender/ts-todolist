export interface Task {
	id: number;
	title: string;
	description: string;
	category: string;
	time: Date;
	complete: boolean;
}