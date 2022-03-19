import React from 'react';
import { Table } from 'rsuite';

import StatusLabel from '../../StatusLabel';

interface Props {
	rowData?: any;
	dataKey: string;
}

const StatusCell = (props: Props) => {
	const { rowData, dataKey } = props;

	return (
		<Table.Cell {...props}>
			{/* <div> */}
			<StatusLabel status={rowData[dataKey]} />
			{/* </div> */}
		</Table.Cell>
	);
};

export default StatusCell;
