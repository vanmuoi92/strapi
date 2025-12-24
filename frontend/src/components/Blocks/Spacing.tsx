import React from "react";

interface SpacingProps {
	spacingPC?: string;
	spacingTablet?: string;
	spacingMobile?: string;
	backgroundColor?: string;
}

const Spacing: React.FC<SpacingProps> = ({
	spacingPC = "120px",
	spacingTablet = "100px",
	spacingMobile = "80px",
	backgroundColor = "#fff",
}) => {
	return (
		<div
			className="spacing-block"
			style={{
				backgroundColor: backgroundColor,
			}}>
			<style
				dangerouslySetInnerHTML={{
					__html: `
					.spacing-block { height: ${spacingPC}; }
					@media (max-width: 1024px) {
						.spacing-block { height: ${spacingTablet}; }
					}
					@media (max-width: 768px) {
						.spacing-block { height: ${spacingMobile}; }
					}
				`,
				}}
			/>
		</div>
	);
};

export default Spacing;
