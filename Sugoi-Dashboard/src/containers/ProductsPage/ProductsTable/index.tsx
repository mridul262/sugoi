import React from 'react';
import { Placeholder, Table } from 'rsuite';
import { SMALL_WIDTH } from '../../../consts/table';

/* Components */
import StatusCell from '../../../components/TableCells/StatusCell';
import history from '../../../utils/History';

/* Styles */
import styles from './index.module.scss';
import './tableReset.scss';
import 'rsuite/dist/styles/rsuite-default.css';

interface Props {
	campaigns: any[];
	loading?: boolean;
}
const ProductsTable = (props: Props) => {
	const { campaigns } = props;
	return (
		<section className={styles.campaignTableWrapper}>
			<Table
				height={400}
				id="campaignTable"
				data={campaigns}
				hover={false}
				onRowClick={(data: any) => {
					console.log(data);
				}}
				loading={props.loading}
			>
				<Table.Column
					width={SMALL_WIDTH}
					fixed
					verticalAlign="middle"
					align="center"
				>
					<Table.HeaderCell>Product Name</Table.HeaderCell>
					<Table.Cell dataKey="product_name" />
				</Table.Column>

				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="center">
					<Table.HeaderCell>Id</Table.HeaderCell>
					<Table.Cell dataKey="id" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="center">
					<Table.HeaderCell>Value</Table.HeaderCell>
					<Table.Cell dataKey="val" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="center">
					<Table.HeaderCell>Units</Table.HeaderCell>
					<Table.Cell dataKey="units" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left" flexGrow={1}>
					<Table.HeaderCell>Currency </Table.HeaderCell>
					<Table.Cell dataKey="currency" />
				</Table.Column>
			</Table>
		</section>
	);
};

export default ProductsTable;
