import React, { useEffect } from "react";
import { getImageUrl } from "@/utils/url";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface GalleryImage {
	id: number;
	url: string;
	alternativeText?: string;
	width: number;
	height: number;
}

interface GalleryProps {
	images: GalleryImage[];
	isFullWidth?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ images, isFullWidth = false }) => {
	useEffect(() => {
		Fancybox.bind("[data-fancybox='gallery']", {
			// Custom options for Fancybox
		});

		return () => {
			Fancybox.destroy();
		};
	}, []);

	if (!images || images.length === 0) return null;

	return (
		<div className={isFullWidth ? "gallery-full" : "container"}>
			<style>{`
        .car-gallery {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: auto;
            grid-template-areas:
                "one two three three"
                "four four three three"
                "four four five six";
        }
        .car-gallery > div:first-child { grid-area: one; }
        .car-gallery > div:nth-child(2) { grid-area: two; }
        .car-gallery > div:nth-child(3) { grid-area: three; }
        .car-gallery > div:nth-child(4) { grid-area: four; }
        .car-gallery > div:nth-child(5) { grid-area: five; }
        .car-gallery > div:nth-child(6) { grid-area: six; }

        .gallery-item {
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: all 0.5s;
            aspect-ratio: 16/9;
        }
        .gallery-item:hover img {
            transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
            .car-gallery {
                grid-template-columns: repeat(2, 1fr);
                grid-template-areas: none;
            }
            .gallery-item {
                grid-area: auto !important;
            }
            .gallery-item img {
                aspect-ratio: 1/1 !important;
            }
        }
      `}</style>
			<div className="car-gallery">
				{images.map((image) => (
					<div
						key={image.id}
						className="gallery-item"
						data-fancybox="gallery"
						data-src={getImageUrl(image.url)}
						data-caption={image.alternativeText || ""}>
						<img
							src={getImageUrl(image.url)}
							alt={image.alternativeText || "Gallery Image"}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Gallery;
