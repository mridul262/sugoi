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
const OrdersTable = (props: Props) => {
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
					<Table.HeaderCell>Id</Table.HeaderCell>
					<Table.Cell dataKey="id" />
				</Table.Column>

				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Currency</Table.HeaderCell>
					<Table.Cell dataKey="currency" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Merchant Address</Table.HeaderCell>
					<Table.Cell dataKey="">{(rowData: any) => rowData.merchant.email}</Table.Cell>
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Merchant Wallet Address</Table.HeaderCell>
					<Table.Cell dataKey="">{(rowData: any) => rowData.merchant.wallet_addr}</Table.Cell>
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Customer Id</Table.HeaderCell>
					<Table.Cell dataKey="">{(rowData: any) => rowData.customer.id}</Table.Cell>
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Customer Wallet Address</Table.HeaderCell>
					<Table.Cell dataKey="">{(rowData: any) => rowData.customer.wallet_addr}</Table.Cell>
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Product Id</Table.HeaderCell>
					<Table.Cell dataKey="product_id" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Amount</Table.HeaderCell>
					<Table.Cell dataKey="amount" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign="middle" align="left">
					<Table.HeaderCell>Expiry</Table.HeaderCell>
					<Table.Cell dataKey="expiry" />
				</Table.Column>
			</Table>
		</section>
	);
};

export default OrdersTable;
