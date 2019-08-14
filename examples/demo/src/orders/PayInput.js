import React from 'react';
import { translate, SelectInput } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

import pays from './PayData';

const styles = {
    input: { width: 150 },
};

const PayInput = ({ classes, translate, ...rest }) => (
    <SelectInput
        {...rest}
        choices={pays.map(pay => ({
            id: pay.id,
            name: translate(pay.name),
        }))}
        className={classes.input}
    />
);

const TranslatedPayInput = compose(
    translate,
    withStyles(styles)
)(PayInput);

TranslatedPayInput.defaultProps = {
    source: 'pay_channel',
};

export default TranslatedPayInput;
