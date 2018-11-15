import * as React from "react";
import { LunarDate } from 'lunardate';
import "./scss/Calendar.css";
interface ICalendarState {
    dates: ICalendarDate[]
}
interface ICalendarDate {
    date: Date;
    lunar?: LunarDate
}
interface ICalendarProps {
    onDateChanged: (date: Date) => void;
    selectedDate: Date
}
export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    constructor(props: ICalendarProps) {
        super(props);
        this.state = {
            dates: this.getDates(new Date())
        }
    }
    public getMonday(d: Date) {
        d = new Date(d.getFullYear(), d.getMonth(), 1);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 0); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    public getDates(date: Date): ICalendarDate[] {
        const list: ICalendarDate[] = [];
        let currentDate = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 1));

        while (currentDate.getMonth() <= date.getMonth()) {
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
            list.push({
                date: new Date(currentDate),
            })
            console.log(currentDate);
        }
        return list;// .slice(0, list.length - 1);
    }
    public onDateSelected(date: Date) {
        this.props.onDateChanged(date);
    }

    public render() {
        return (
            <div className="calendar-table">
                <div className="calendar-table--cell calendar-table--cell__dark">T2</div>
                <div className="calendar-table--cell calendar-table--cell__dark">T3</div>
                <div className="calendar-table--cell calendar-table--cell__dark">T4</div>
                <div className="calendar-table--cell calendar-table--cell__dark">T5</div>
                <div className="calendar-table--cell calendar-table--cell__dark">T6</div>
                <div className="calendar-table--cell calendar-table--cell__dark">T7</div>
                <div className="calendar-table--cell calendar-table--cell__dark calendar-table--cell__red">CN</div>
                {this.state.dates.map((x) =>
                    <div onClick={this.onDateSelected.bind(this, x.date)}
                        className={"calendar-table--cell" + (this.props.selectedDate.getDate() === x.date.getDate() ? " calendar-table--cell__selected" : "") +
                            (x.date.getDay() === 0 ? " calendar-table--cell__red" : "")
                        } key={x.date.getTime()}> {x.date.getDate()}</div>)}
            </div>
        )
    }
}