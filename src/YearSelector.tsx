import * as React from "react";
import "./scss/year-select.css";

interface IMonthSelectorState {
    years : number[]
}
interface IMonthSelectorProps {
    onYearChanged : (month : number) => void;
}
export default class YearSelector extends React.Component < IMonthSelectorProps,
IMonthSelectorState > {
    constructor(props : IMonthSelectorProps) {
        super(props);
        this.state = {
            years: this.getList(2018)
        }
    }
    public getList(end : number) {
        const list = [];
        for (let i = 0; i < 52; i++) {
            list.push(end - i);
        }
        return list;
    }
    public render() {
        return (
            <div className="year-selector">
                <span className="arrow"/> {this
                    .state
                    .years
                    .map((x) => <button
                        className="year-selector--year"
                        key={x}
                        onClick={this
                        .props
                        .onYearChanged
                        .bind(this, x)}>{x}</button>)}
            </div>
        )
    }
}