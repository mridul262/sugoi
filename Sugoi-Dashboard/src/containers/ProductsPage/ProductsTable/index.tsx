import React from 'react';
import { Table } from 'rsuite';
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
			>
				<Table.Column
					width={SMALL_WIDTH}
					fixed
					verticalAlign="middle"
					align="left"
				>
					<Table.HeaderCell>Product Name</Table.HeaderCell>
					<Table.Cell dataKey="product_name" />
				</Table.Column>

				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Id</Table.HeaderCell>
					<Table.Cell dataKey="id" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Value</Table.HeaderCell>
					<Table.Cell dataKey="val" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Units</Table.HeaderCell>
					<Table.Cell dataKey="units" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Currency Id</Table.HeaderCell>
					<Table.Cell dataKey="currency_id" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Merchant Id</Table.HeaderCell>
					<Table.Cell dataKey="merchant_id" />
				</Table.Column>
			</Table>
		</section>
	);
};

export default ProductsTable;
