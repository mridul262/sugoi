import React, { ReactNode } from 'react';
import { Tabs, TabList, Tab } from 'react-tabs';

/* Styles */
import { ActiveCampaignTabCss, TabListCss } from './styledComponents';

interface Props {
	children: ReactNode;
	tabsDisplayList: string[];
	handleTabChange: (index: number) => void;
	selectedTab: number;
}

const TabsWrapper = (props: Props) => {
	const { handleTabChange, selectedTab, children, tabsDisplayList } = props;
	return (
		<Tabs
			selectedTabClassName={ActiveCampaignTabCss()}
			onSelect={handleTabChange}
			selectedIndex={selectedTab}
		>
			<TabList>
				<div className={TabListCss()}>
					{tabsDisplayList.map((tab, index) => (
						<Tab key={index}>{tab}</Tab>
					))}
				</div>
			</TabList>

			{children}
		</Tabs>
	);
};

export default TabsWrapper;
