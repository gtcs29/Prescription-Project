import React from 'react';
import { Toast} from "native-base";

export function ErrorToast (text = 'Error', buttonText = 'Okay') {
  Toast.show({
    text: text,
    buttonText: buttonText,
    buttonTextStyle: {color: "#008000"},
    buttonStyle: {backgroundColor: "#5cb85c"},
    duration: 5000
  });
}


