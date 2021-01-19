import React from "react"
import TabsControl from "./react_tab"

export class TabComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <TabsControl>
                    <div name="first">第一帧</div>
                    <div name="second">第二帧</div>
                    <div name="third">第三帧</div>
                    <div name="four">第四帧</div>
                </TabsControl>
            </div>
        )
    }
}

