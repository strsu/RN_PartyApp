import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Text,
    Modal,
}
from 'react-native';

const Toast = {
    info: (options) => {
        DeviceEventEmitter.emit("SHOW TOAST", {...options, type: 'info'});
    },
    success: () => {
        DeviceEventEmitter.emit("SHOW TOAST", {...options, type: 'success'});
    },
    danger: () => {
        DeviceEventEmitter.emit("SHOW TOAST", {...options, type: 'danger'});
    },
}

export default Toast;