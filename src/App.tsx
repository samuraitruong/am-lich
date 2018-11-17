import * as React from "react";
import Calendar from "./Calendar";
import leftIcon from "./images/if_basics-05_296830.svg";
import rightIcon from "./images/if_basics-06_296832.svg";
import {
  CAN,
  CHI,
  MONTHS,
  SEASONS
} from "./Constants";
import { convertSolar2Lunar, sunLongitude } from "lunardate";
import "./scss/App.css";
interface IAppState {
  selectedDate: Date;
}
class App extends React.Component<{},
  IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedDate: new Date()
    }
    this.onDateChanged = this
      .onDateChanged
      .bind(this);
  }
  public onDateChanged(selectedDate: Date) {
    this.setState({ selectedDate: new Date(selectedDate) })
  }
  public changeMonth(increase: number) {
    const selectedDate = new Date(this.state.selectedDate.setMonth(this.state.selectedDate.getMonth() + increase));
    this.setState({
      selectedDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    });
  }
  public render() {
    const selectedDate = this.state.selectedDate;
    console.log("selected date", selectedDate);
    const ln = convertSolar2Lunar(selectedDate.getDate(), selectedDate.getMonth() + 1, selectedDate.getFullYear(), 7);
    const dayOfWeeks = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy"
    ]
    // const jd = ln.toJd; console.log(jd);
    const jd = this.jdFromDate(selectedDate.getDate(), selectedDate.getMonth() + 1, selectedDate.getFullYear());
    const thang = CAN[(ln.year * 12 + ln.month + 3) % 10] + " " + CHI[(ln.month + 1) % 12];
    const ngay = CAN[(jd + 9) % 10] + " " + CHI[(jd + 1) % 12];
    const tk = SEASONS[Math.floor(sunLongitude(jd - 0.5 - 7 / 24.0) as number / (Math.PI * 12))];
    const className = this
      .state
      .selectedDate
      .getDay() === 0
      ? "calendar__red"
      : ""
    const title = `Tháng ${selectedDate.getMonth() + 1} năm ${selectedDate.getFullYear()}`
    return (
      <div className="app">
        <div className={"calendar " + className}>
          <div className="calendar--header">
            <img
              className="calendar--header--icon"
              src={leftIcon}
              onClick={this
                .changeMonth
                .bind(this, -1)} />

            {title}
            <img
              src={rightIcon}
              className="calendar--header--icon"
              onClick={this
                .changeMonth
                .bind(this, 1)} />
          </div>
          <div className="calendar--day">
            {selectedDate.getDate()}
            <span className="calendar--day--weekday">{dayOfWeeks[selectedDate.getDay()]}</span>
          </div>
          <div className="calendar--lunar">
            <div className="row">
              < div className="calendar--lunar--date">
                <div>Tháng {MONTHS[ln.month - 1]}</div>
                <div className="font-medium">{ln.day}</div>
                <div>Năm {this.getYearCanChi(ln.year)}</div>
              </div >
              < div className="calendar--lunar--info">
                <div>Tháng {thang}</div>
                <div>Ngày {ngay}</div>

                <div>
                  Giờ {this.getCanHour0(jd) + " " + CHI[selectedDate.getHours() % 12]}
                </div>
                < div >
                  Tiết {tk}
                </div>
              </ div>
            </div>
            <div className="calendar--lunar--perfect-hours">
              Giờ hoàng đạo : {this.getGioHoangDao(jd)}
            </div>

            <Calendar onDateChanged={this.onDateChanged} selectedDate={selectedDate} />
          </div>
        </div>
      </div>
    );
  }
  private getGioHoangDao(jd: number) {
    const chiOfDay = (jd + 1) % 12;
    const GIO_HD = new Array("110100101100", "001101001011", "110011010010", "101100110100", "001011001101", "010010110011");
    const gioHD = GIO_HD[chiOfDay % 6]; // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.
    let ret = "";
    let count = 0;
    for (let i = 0; i < 12; i++) {
      if (gioHD.charAt(i) === '1') {
        ret += CHI[i];
        ret += ' (' + (i * 2 + 23) % 24 + '-' + (i * 2 + 1) % 24 + ')';
        if (count++ < 5) {
          ret += ', ';
        }
      }
    }
    return ret;
  }

  private jdFromDate(dd: number, mm: number, yy: number) {
    const INT = (n: number) => Math.floor(n);
    const a = INT((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    }
    return jd;
  }
  private getCanHour0(jdn: number) {
    return CAN[(jdn - 1) * 2 % 10];
  }
  private getYearCanChi(year: number) {
    return CAN[(year + 6) % 10] + " " + CHI[(year + 8) % 12];
  }
}

export default App;
