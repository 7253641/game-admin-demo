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
import orders from './data_2019';
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

const OldOrders = ({ value, translate, classes }) => {
    return (
        <div>
            <Card className={classes.card}>
                {/* <Typography variant="headline" component="h2"> */}
                <Typography className={classes.title} color="textSecondary">
                    {translate('pos.dashboard.old_orders_2019')}
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
                            {/* <TableCell>月份</TableCell>
                            <TableCell>金额</TableCell>
                            <TableCell>月份</TableCell>
                            <TableCell>金额</TableCell> */}
                            {/* {translate(order.name)} */}
                            {/* <TableCell /> */}
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
                    {/* <TableRow>
                        <TableCell align="right" variant="footer">
                            合计：
                        </TableCell>
                        <TableCell align="right" variant="footer">
                            ￥
                        </TableCell>
                    </TableRow> */}
                </Table>
            </Card>
        </div>
    );
};
const enhance = compose(
    withStyles(styles),
    translate
);
export default enhance(OldOrders);
