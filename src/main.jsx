import React from 'react'
import ReactDOM from 'react-dom/client'
import {ConfigProvider} from 'antd';
import App from './App.jsx'
import 'antd/dist/reset.css';
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider
            theme={
                {
                    "token": {
                        "colorPrimary": "#fabb18",
                        "colorInfo": "#fabb18",
                        "fontSize": 14,
                        "sizeStep": 4,
                        "marginXS": 8,
                        "marginXXS": 6,
                        "borderRadius": 12,
                        "wireframe": true,
                        "colorError": "#F5222D",
                        "colorWarning": "#FAAD14",
                        "colorTextBase": "#000",
                        "colorLink": "#fabb18",
                        "colorLinkHover": "#fff8e8",
                        "colorLinkActive": "#fabb18",
                        "colorTextSecondary": "#000",
                        "colorTextTertiary": "#000",
                        "colorTextQuaternary": "#000"

                    },"components": {
                        "Input": {
                            "colorBorder": "rgba(0, 0, 0, 0.33)",
                            "colorBgContainerDisabled": "rgb(255, 248, 232)",
                            "colorText": "rgb(0, 0, 0)"

                        },
                        "Button": {
                            "defaultColor": "rgb(255, 255, 255)",
                            "colorPrimary": "rgb(86, 79, 63)",
                            "defaultBorderColor": "rgba(0, 0, 0, 0.33)"
                        },
                        "Menu": {
                            "colorPrimary": "white",
                            "colorPrimaryBorder": "rgb(0, 0, 0)",
                            "controlItemBgActive": "rgb(0, 0, 0)"
                        },
                        "Form": {
                            "colorText": "rgb(0, 0, 0)"
                        }
                    }
                }}
        >
            <App/>
        </ConfigProvider>
    </React.StrictMode>,
)
