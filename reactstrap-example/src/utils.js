import BlockUi from 'react-block-ui';
import { Loader, Types } from 'react-loaders'; 
import React from 'react';

import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';

export const RXBlockStatus = {
    HIDE: 0,
    LOAD: 1,
    SUCCESS: 2,
    ERROR: 3
};


export const RXBlockColor = {
    PRIMARY: '#20a8d8',
    SECONDARY: '#c8ced3',
    SUCCESS: '#4dbd74',
    INFO: '#63c2de',
    WARNING: '#ffc107',
    DANGER: '#f86c6b',
    LIGHT: '#f0f3f5',
    DARK: '#2f353a'
}

export const RXBlockUi = (props) => {

    return (
        <div>
            {props.children}
        </div>
    )
}