import * as React from "react";
import { convertSolar2Lunar } from "lunardate";
import "./scss/App.css";
interface IAppState {
  selectedDate : Date;
}
class App extends React.Component < {},
IAppState > {
  constructor(props : any) {
    super(props);
    this.state = {
      selectedDate: new Date()
    }
  }
  public render() {
    console.log(convertSolar2Lunar(1, 1, 2018, 0));
    const selectedDate = this.state.selectedDate;
    const dayOfWeeks = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy"
    ]
    return (
      <div className="app">
        <div className="calendar">
          <div className="calendar--header">
            Tháng {selectedDate.getMonth() + 1}
            năm {selectedDate.getFullYear()}
          </div>
          <div className="calendar--day">
            {selectedDate.getDate()}
            <span className="calendar--day--weekday">{dayOfWeeks[selectedDate.getDay()]}</span>
          </div>
        </div>
        <header className="app-header">
          <span/>
        </header>
      </div>
    );
  }
}

export default App;
