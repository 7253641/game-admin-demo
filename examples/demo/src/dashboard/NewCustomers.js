import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';
const styles = {
    main: {
        flex: '1',
        marginRight: '1em',
        marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};
const NewCustomers = ({ visitors = [], value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={CustomerIcon} bgColor="#31708f" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('pos.dashboard.new_customers')}
            </Typography>
            <Typography variant="headline" component="h2">
                {value}
            </Typography>
        </Card>
    </div>
    // <div className={classes.main}>
    //     <CardIcon Icon={CustomerIcon} bgColor="#4caf50" />
    //     <Card className={classes.card}>
    //         <Typography className={classes.title} color="textSecondary">
    //             {translate('pos.dashboard.new_customers')}
    //         </Typography>
    //         <Typography
    //             variant="headline"
    //             component="h2"
    //             // className={classes.value}
    //         >
    //             {totalUser}
    //         </Typography>
    //         {/* <Divider />
    //         <List>
    //             {visitors.map(record => (
    //                 <ListItem
    //                     button
    //                     to={`/customers/${record.id}`}
    //                     component={Link}
    //                     key={record.id}
    //                 >
    //                     <Avatar
    //                         src={`${record.avatar}?size=32x32`}
    //                         className={classes.avatar}
    //                     />
    //                     <ListItemText
    //                         // primary={`${record.chain_id}`}
    //                         primary={translate('pos.dashboard.id', {
    //                             customer_id: `${record.chain_id}`,
    //                         })}
    //                         className={classes.listItemText}
    //                     />
    //                 </ListItem>
    //             ))}
    //         </List> */}
    //     </Card>
    // </div>
);
const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(NewCustomers);
