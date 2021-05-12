export const stagger = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.5,
            delayChildren: 0.3
		}
	}
};

export const fadeInSide = {
	hidden: {
		opacity: 0,
		x: '-50%'
	},
	show: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.1
		}
	}
};
