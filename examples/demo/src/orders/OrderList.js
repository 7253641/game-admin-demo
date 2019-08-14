import React, { Fragment } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    EditButton,
    Filter,
    List,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    Responsive,
    SearchInput,
    TextField,
    TextInput,
    downloadCSV,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import lodashGet from 'lodash/get';
import { unparse as convertToCSV } from 'papaparse/papaparse.min';
import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import MobileGrid from './MobileGrid';
import ProxyInput from './ProxyInput';
import PayInput from './PayInput';
import GameInput from './GameInput';
// import orders from '.';

const filterStyles = {
    status: { width: 150 },
};

const exporter = orders => {
    const data = orders.map(order => ({
        ...order,
    }));
    const csv = convertToCSV({
        data: data,
        fields: [
            'date',
            'customer_id',
            'chain_id',
            'proxy',
            'pay_channel',
            'amount',
            'game_name',
            'reference',
        ], // order fields in the export
    });
    return downloadCSV(csv, 'orders');
};

const OrderFilter = withStyles(filterStyles)(({ classes, ...props }) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <ReferenceInput source="customer_id" reference="customers">
            <AutocompleteInput
                optionText={choice =>
                    `${choice.first_name} ${choice.last_name}`
                }
            />
        </ReferenceInput>
        <DateInput source="date_gte" />
        <DateInput source="date_lte" />
        <TextInput source="amount_gte" />
        <TextInput source="amount_lte" />

        <ProxyInput />
        <PayInput />
        <GameInput />
    </Filter>
));

const datagridStyles = {
    total: { fontWeight: 'bold' },
};

class TabbedDatagrid extends React.Component {
    tabs = [
        { id: 'delivered', name: '最新订单' },
        // { id: 'ordered', name: '支付宝单' },
        // { id: 'cancelled', name: '易宝支付订单' },
    ];

    state = { ordered: [], delivered: [], cancelled: [] };

    static getDerivedStateFromProps(props, state) {
        if (props.ids !== state[props.filterValues.status]) {
            return { ...state, [props.filterValues.status]: props.ids };
        }
        return null;
    }

    handleChange = (event, value) => {
        const { filterValues, setFilters } = this.props;
        setFilters({ ...filterValues, status: value });
    };

    render() {
        const { classes, filterValues, ...props } = this.props;
        return (
            <Fragment>
                <Tabs
                    fullWidth
                    centered
                    value={filterValues.status}
                    indicatorColor="primary"
                    onChange={this.handleChange}
                    exporter={false}
                >
                    {this.tabs.map(choice => (
                        <Tab
                            key={choice.id}
                            label={choice.name}
                            value={choice.id}
                        />
                    ))}
                </Tabs>
                <Divider />
                <Responsive
                    medium={
                        <div>
                            {filterValues.status === 'delivered' && (
                                <Datagrid {...props} ids={this.state.delivered}>
                                    <DateField source="date" showTime />
                                    <CustomerReferenceField />
                                    <TextField source="proxy" />
                                    <TextField source="pay_channel" />
                                    <NumberField
                                        source="amount"
                                        options={{
                                            style: 'currency',
                                            currency: 'CNY',
                                        }}
                                        className={classes.currency}
                                    />
                                    <TextField source="game_name" />
                                    <TextField source="reference" />
                                    <TextField source="sum" />
                                    {/* <TextField source="status" />
                                    <NbItemsField /> */}

                                    {/* <EditButton /> */}
                                </Datagrid>
                            )}
                        </div>
                    }
                />
            </Fragment>
        );
    }
}

const StyledTabbedDatagrid = withStyles(datagridStyles)(TabbedDatagrid);

const OrderList = ({ classes, ...props }) => (
    <List
        {...props}
        filterDefaultValues={{ status: 'delivered' }}
        sort={{ field: 'date', order: 'DESC' }}
        perPage={25}
        exporter={exporter}
        bulkActionButtons={false}
        filters={<OrderFilter />}
    >
        <StyledTabbedDatagrid />
    </List>
);

export default OrderList;
