import * as React from "react";
import { convertSolar2Lunar, LunarDate } from "lunardate";
import "./scss/Calendar.css";
interface ICalendarState {
    dates : ICalendarDate[]
}
interface ICalendarDate {
    date : Date;
    lunar?: LunarDate
}
interface ICalendarProps {
    onDateChanged : (date : Date) => void;
    selectedDate : Date
}
export default class Calendar extends React.Component < ICalendarProps,
ICalendarState > {
    constructor(props : ICalendarProps) {
        super(props);
        this.state = {
            dates: this.getDates(new Date())
        }
    }
    public getMonday(d : Date) {
        const date = new Date(d);
        if (d.getDay() === 1) {
            return d;
        }
        // d = new Date(d.getFullYear(), d.getMonth(), 1); const day = d.getDay(); const
        // diff = d.getDate() - day + (day === 0     ? -6     : 0); // adjust when day
        // is sunday return new Date(d.setDate(diff));

        const day = date.getDay() || 7;
        if (day !== 1) {
            date.setHours(-24 * (day - 1));
        }
        return date;

    }

    public getDates(date : Date) : ICalendarDate[] {
        console.log("============================================");
        console.log("input", date.toISOString(), date.toLocaleDateString())
        const list : ICalendarDate[] = [];
        const firstDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
        let currentDate = this.getMonday(firstDate);
        console.log("Monday ", currentDate.toLocaleDateString())
        const month = date.getMonth() + 1;
        console.log("moth", month, Math.floor(month / 12), month % 12)
        const firstDateNextMonth = new Date(firstDate.getFullYear() + Math.floor(month / 12), month % 12, 1);
        console.log("next month", firstDateNextMonth.toISOString(), firstDateNextMonth.toLocaleDateString());
        console.log("current", currentDate.toISOString(), currentDate.toLocaleDateString());
        while (currentDate < firstDateNextMonth) {

            list.push({date: new Date(currentDate)})
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }

        return list; // .slice(0, list.length - 1);
    }
    public onDateSelected(date : Date) {
        if (date.getMonth() !== this.props.selectedDate.getMonth()) {
            return;
        }
        this
            .props
            .onDateChanged(date);
    }
    public componentWillReceiveProps(props : ICalendarProps) {
        const dates = this.getDates(props.selectedDate);
        this.setState({dates});
    }
    public renderDate(date : Date) {
        const lunar = convertSolar2Lunar(date.getDate(), date.getMonth() + 1, date.getFullYear(), 7);
        const className = date.getDay() === 0
            ? "__red"
            : "";
        const extraClass = lunar.day === 1 || lunar.day === 15
            ? " calendar-table--cell--lunar__red"
            : "";
        const lunarText = lunar.day === 1
            ? `${lunar.day}/${lunar.month}`
            : lunar
                .day
                .toString()
        return (
            <span>
                <span
                    className={"calendar-table--cell--solar calendar-table--cell--solar" + className}>{date.getDate()}</span>
                <span
                    className={"calendar-table--cell--lunar calendar-table--cell--lunar" + className + extraClass}>{lunarText}</span>
            </span>
        )
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
                <div
                    className="calendar-table--cell calendar-table--cell__dark calendar-table--cell__red">CN</div>
                {this
                    .state
                    .dates
                    .map((x) => <div
                        onClick={this
                        .onDateSelected
                        .bind(this, x.date)}
                        className={"calendar-table--cell" + (this.props.selectedDate.getDate() === x.date.getDate()
                        ? " calendar-table--cell__selected"
                        : "") + (x.date.getDay() === 0
                        ? " calendar-table--cell__red"
                        : "") + (x.date.getMonth() !== this.props.selectedDate.getMonth()
                        ? " calendar-table--cell__out-of-range"
                        : "")}
                        key={x
                        .date
                        .getTime()}>
                        {this.renderDate(x.date)}
                    </div>)}
            </div>
        )
    }
}