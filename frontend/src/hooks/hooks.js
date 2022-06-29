import { useState, useMemo, useEffect } from 'react';

export const Intersection = (targetRef, options) => {
	const [isVisible, setIsVisible] = useState(false);

	const callback = entries => {
		const [entry] = entries;
		setIsVisible(entry.isIntersecting);
	}

	const option = useMemo(() => {
		return options;
	},[options]);

	 useEffect(() => {
		const observer = new IntersectionObserver(callback,option);

		targetRef ? observer.observe(targetRef.current) : console.log("");
		return () => {
			if(targetRef) observer.unobserve(targetRef.current);
		}
	},[targetRef]);

	return isVisible;
}