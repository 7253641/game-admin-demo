import React from 'react';
import { translate, SelectInput } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

import proxys from './ProxyData';

const styles = {
    input: { width: 150 },
};

const ProxyInput = ({ classes, translate, ...rest }) => (
    <SelectInput
        {...rest}
        choices={proxys.map(proxy => ({
            id: proxy.id,
            name: translate(proxy.name),
        }))}
        className={classes.input}
    />
);

const TranslatedProxyInput = compose(
    translate,
    withStyles(styles)
)(ProxyInput);

TranslatedProxyInput.defaultProps = {
    source: 'proxy',
};

export default TranslatedProxyInput;
