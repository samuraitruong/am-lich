import * as React from "react";
import "./scss/month-select.css";

interface IMonthSelectorState {
    months : number[]
}
interface IMonthSelectorProps {
    onMonthChanged : (month : number) => void;
}
export default class MonthSelector extends React.Component < IMonthSelectorProps,
IMonthSelectorState > {
    constructor(props : IMonthSelectorProps) {
        super(props);
        this.state = {
            months: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    }
    public selectMonth(month : number) {
        console.log("select month", month);
        this
            .props
            .onMonthChanged(month - 1);
    }
    public render() {
        return (
            <div className="month-selector">
                <span className="arrow"/> {this
                    .state
                    .months
                    .map((x) => <div
                        key={x}
                        onClick={this
                        .selectMonth
                        .bind(this, x)}>T - {x}</div>)
}
            </div>
        )
    }
}