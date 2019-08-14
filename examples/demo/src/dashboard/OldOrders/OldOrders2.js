import React from 'react';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { translate, Title } from 'react-admin';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CardIcon from '../CardIcon';
import orders from './data_2018';
const styles = {
    main: {
        flex: '1',
        marginLeft: '1em',
        marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};

const OldOrders2 = ({ value, translate, classes }) => {
    return (
        <div>
            <Card className={classes.card}>
                <Typography className={classes.title} color="textSecondary">
                    {translate('pos.dashboard.old_orders_2018')}
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>月份</TableCell>
                            <TableCell>金额</TableCell>
                            <TableCell>月份</TableCell>
                            <TableCell>金额</TableCell>
                            {/* <TableCell>月份</TableCell>
                            <TableCell>金额</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{translate(order.id)}</TableCell>
                                {order.ammount !== '' ? (
                                    <TableCell>￥{order.ammount}</TableCell>
                                ) : (
                                    <TableCell />
                                )}
                                <TableCell>{translate(order.id2)}</TableCell>
                                {order.ammount2 !== '' ? (
                                    <TableCell>￥{order.ammount2}</TableCell>
                                ) : (
                                    <TableCell />
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};
const enhance = compose(
    withStyles(styles),
    translate
);
export default enhance(OldOrders2);
