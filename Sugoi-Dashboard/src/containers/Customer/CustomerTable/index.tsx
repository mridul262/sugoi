import React from 'react';
import { Button, Table } from 'rsuite';
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
const CustomerTable = (props: Props) => {
	const { campaigns } = props;
	return (
		<section className={styles.campaignTableWrapper}>
			<Table height={400} id='campaignTable' data={campaigns} hover={false}>
				<Table.Column width={SMALL_WIDTH} fixed verticalAlign='middle' align='left'>
					<Table.HeaderCell>Order ID</Table.HeaderCell>
					<Table.Cell dataKey='id' />
				</Table.Column>

				<Table.Column width={SMALL_WIDTH} verticalAlign='middle' align='left'>
					<Table.HeaderCell>Product Name</Table.HeaderCell>
					<Table.Cell dataKey=''>{(rowData: any) => rowData.product.product_name}</Table.Cell>
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign='middle' align='left'>
					<Table.HeaderCell>Merchant Name</Table.HeaderCell>
					<Table.Cell dataKey=''>{(rowData: any) => rowData.merchant.name}</Table.Cell>
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign='middle' align='left'>
					<Table.HeaderCell>Status</Table.HeaderCell>
					<Table.Cell dataKey='status' />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign='middle' align='left'>
					<Table.HeaderCell>Price</Table.HeaderCell>
					<Table.Cell dataKey=''>
						{(rowData: any) => `${rowData.product.val} ${rowData.currency}`}
					</Table.Cell>
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} verticalAlign='middle' align='left'>
					<Table.HeaderCell>Action</Table.HeaderCell>
					<Table.Cell dataKey=''>
						{
							<Button appearance='primary' style={{ width: 50, height: 30 }}>
								Sign
							</Button>
						}
					</Table.Cell>
				</Table.Column>
			</Table>
		</section>
	);
};

export default CustomerTable;
