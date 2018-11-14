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
export default class Calendar extends React.Component<{}, ICalendarState> {
    constructor(props: any) {
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
            list.push({
                date: currentDate,
            })
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
            console.log(currentDate);

        }
        return list;
    }
    public render() {
        return (
            <div className="calendar-table">
                <div>T2</div>
                <div>T3</div>
                <div>T4</div>
                <div>T5</div>
                <div>T6</div>
                <div>T7</div>
                <div>CN</div>
                {this.state.dates.map((x) => <div key={x.date.getTime()}> {x.date.getDate()}</div>)}
            </div>
        )
    }
}