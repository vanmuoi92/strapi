import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getImageUrl } from "@/utils/url";

interface OptionItem {
	id: number;
	title: string;
	description: any;
	icon: {
		url: string;
		alternativeText?: string;
	};
}

interface OptionsListProps {
	title?: string;
	description?: string;
	items: OptionItem[];
}

const OptionsList: React.FC<OptionsListProps> = ({
	title,
	description,
	items,
}) => {
	return (
		<div className="uk-section-default fs-section uk-section">
			<style>{`
        .options-list-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            margin-top: 40px;
        }
        .option-card {
            display: flex;
            flex-direction: column;
        }
        .option-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }
        .option-icon {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .option-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .option-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0;
            text-transform: uppercase;
        }
        .option-content {
            padding-left: 0;
        }
        .option-content ul {
            list-style: disc;
            padding-left: 20px;
            margin: 0;
        }
        .option-content li {
            margin-bottom: 8px;
            font-size: 1rem;
            color: #333;
        }
        
        @media (max-width: 768px) {
            .options-list-grid {
                grid-template-columns: 1fr;
                gap: 30px;
            }
        }
      `}</style>
			<div className="container">
				<div className="section-header">
					{title && (
						<h2 className="uk-h3 uk-margin-remove-bottom">
							{title}
						</h2>
					)}
					{description && (
						<p className="uk-text-lead uk-margin">{description}</p>
					)}
				</div>

				<div className="options-list-grid">
					{items?.map((item) => (
						<div key={item.id} className="option-card">
							<div className="option-header">
								{item.icon && (
									<div className="option-icon">
										<img
											src={getImageUrl(item.icon.url)}
											alt={
												item.icon.alternativeText ||
												item.title
											}
										/>
									</div>
								)}
								<h3 className="option-title">{item.title}</h3>
							</div>
							<div className="option-content">
								<BlocksRenderer content={item.description} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default OptionsList;
