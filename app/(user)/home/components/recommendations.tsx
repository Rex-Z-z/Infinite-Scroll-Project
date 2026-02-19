"use client";

import React from "react";
import { fetchRecommendedReads } from "@/services/home/comic.service";
import ComicSection from "./comic-section";

const fetcher = () => fetchRecommendedReads();

const Recommendations = () => {
	return (
		<ComicSection
			title="Recommendation"
			fetcher={fetcher}
			swrKey={["recommended-reads"]}
			showAddCard={false}
			autoplay={true}
			loop={true}
			filterSection="recommendations"
		/>
	);
};

export default Recommendations;
