export interface CreatorFeedback {
	title: string;
	desc: string;
	status: 'CREATED' | 'ANSWERED' | 'RESOLVED';
	startTime?: string;
	endTime?: string;
}
