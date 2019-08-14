import React from 'react';
import { translate, SelectInput } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

import games from './GameData';

const styles = {
    input: { width: 150 },
};

const GameInput = ({ classes, translate, ...rest }) => (
    <SelectInput
        {...rest}
        choices={games.map(game => ({
            id: game.id,
            name: translate(game.name),
        }))}
        className={classes.input}
    />
);

const TranslatedGameInput = compose(
    translate,
    withStyles(styles)
)(GameInput);

TranslatedGameInput.defaultProps = {
    source: 'game_name',
};

export default TranslatedGameInput;
