import * as React from 'react';
import { Link } from 'react-router-dom';

import { StyledBreadCrumbs, RightArrow } from './styledComponents';

interface Props {
	sections: [{ content: string; to?: string }];
}

export default function BreadCrumb(props: Props) {
	// Create array of sections for sementic-ui Breadcrumb component
	const sections = props.sections.map((section: any, i: number) => {
		// Object of props for each <Breadcrumb.Section>
		return {
			key: section.content,
			content:
				section.content === 'Home' ? (
					<i className={`bx bx-home-alt`} />
				) : (
					section.content
				),
			to: section.to,
			// It is active if the last section
			active: props.sections.length - 1 === i
		};
	});

	return (
		<StyledBreadCrumbs>
			{sections.map((section: any, index: number) => {
				return (
					<div key={section.key}>
						{section.to ? (
							<Link to={section.to}>{section.content}</Link>
						) : (
							section.content
						)}
						{index !== sections.length - 1 && (
							<RightArrow> {' > '} </RightArrow>
						)}
					</div>
				);
			})}
		</StyledBreadCrumbs>
	);
}
