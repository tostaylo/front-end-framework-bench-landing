export interface TimingResult {
	timing_framework: string;
	timing_type: string;
	total_dur: number;
	click_dur: number;
	render_during_click: number;
	render_after_click: number;
}

export interface Definition {
	display_name: string;
	definition: string;
	url?: string;
}
