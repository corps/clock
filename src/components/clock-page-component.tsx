import * as React from "react";
import * as n from "netsuke";
import {ClockComponent} from "./clock-component";
import {request} from "screenfull";

var initialState = {
  time: null as Date
};

export class ClockPageComponent extends React.Component<{}, typeof initialState> {
  state = {time: new Date()};
  timer = null as any;

  render() {
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][this.state.time.getDay() % 7]

    var todaySchedule = schedule[this.state.time.getDay() % 7];
    var nowTime = this.state.time.getHours() * 60 + this.state.time.getMinutes();

    var scheduleIdx = n.bisect<{time:number}>({time: nowTime},
      todaySchedule,
      (a:{time:number}, b:{time:number}) => a.time - b.time);

    var scheduleDisplay = todaySchedule.slice(scheduleIdx, scheduleIdx + 4);

    return <div onClick={() => { request(document.getElementsByName("DIV")[0]) }} style={{ textAlign: "center" }}>
      <ClockComponent style={clockStyle} time={this.state.time}/>
      <div style={dayStyle}>
        { day }, {this.state.time.getMonth()}/{ this.state.time.getDate() }
      </div>
      <div>
        <div style={tableColumnStyle}>
          <h1 style={tableHeaderStyle}>
            Trash <br/>Tomorrow?
          </h1>
          { day === "Sun" || day === "Wed" ? "Burnables" : null }
          { day === "Mon" ? "Plastic Recycles, Cans, Bins" : null }
          { day === "Thu" ? "Non Burnables, Papers, Dangerous" : null }
        </div>
        <div style={tableColumnStyle}>
          <h1 style={tableHeaderStyle}>
            Next <br/>Trains?
          </h1>
          { scheduleDisplay.map((schedule:Schedule) =>
          <div style={scheduleRowStyle}> {this.formatScheduleText(schedule)}</div>) }
        </div>
      </div>
    </div>
  }

  formatScheduleText(s:Schedule) {
    var hours = Math.floor(s.time / 60);
    var minutes = s.time % 60;
    return <div>
      {hours}:{minutes < 10 ? "0" + minutes : minutes} {s.description} {s.isRapid ? "Rapid" : ""}
    </div>;
  }

  componentDidMount() {
    this.timer = setInterval(() => this.updateTime(), 1000) as any;
  }

  componentWillUnmount() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private updateTime() {
    var nextState = n.shallowCopy(this.state);
    nextState.time = new Date();
    this.setState(nextState);
  }
}

var clockStyle = {
  fontSize: "19vw",
};

var dayStyle = {
  fontSize: "3vw",
};

var tableHeaderStyle = {
  fontSize: "5vw",
  height: "11vw",
};

var tableColumnStyle = {
  verticalAlign: "top",
  width: "45%",
  display: "inline-block",
  fontSize: "3vw",
};

var scheduleRowStyle = {
  textAlign: "left"
};

var ike = "To Oomiya";
var juku = "To Oomiya";
var kiba = "To Oomiya";
var taka = "(L) To Takasaki";
var mae = "(L) To Maebashi";
var kago = "(L) To Kagohara";
var shinmae = "(L) To Shinmaebashi";
var fuka = "(L) To Fukaya";

interface Schedule {
  time:number, description:string, isRapid?:boolean
}

function parseData(v:string):Schedule[] {
  var result = [] as Schedule[];
  var data = v.trim().split(/\s+/g);

  while (data.length > 0) {
    var hour = parseInt(data.shift(), 10);
    while (data.length > 0 && isNaN(parseInt(data[0], 10))) {
      var type = data.shift();
      var minute = parseInt(data.shift(), 10);

      var time = hour * 60 + minute;
      if (type === "池") {
        result.push({time: time, description: ike});
        continue;
      }
      if (type === "宿") {
        result.push({time: time, description: juku});
        continue;
      }
      if (type === "木") {
        result.push({time: time, description: kiba});
        continue;
      }
      if (type === "[通快]宿") {
        result.push({time: time, description: juku, isRapid: true});
        continue;
      }
      if (type === "[通快]木") {
        result.push({time: time, description: juku, isRapid: true});
        continue;
      }
      if (type === "[快]木") {
        result.push({time: time, description: juku, isRapid: true});
        continue;
      }
      if (type === "[快]宿") {
        result.push({time: time, description: juku, isRapid: true});
        continue;
      }

      if (type === "高") {
        result.push({time: time, description: taka});
        continue;
      }

      if (type === "快高") {
        result.push({time: time, description: taka, isRapid: true});
        continue;
      }

      if (type === "前") {
        result.push({time: time, description: mae});
        continue;
      }

      if (type === "快前") {
        result.push({time: time, description: mae, isRapid: true});
        continue;
      }

      if (type === "橋") {
        result.push({time: time, description: shinmae});
        continue;
      }

      if (type === "深") {
        result.push({time: time, description: fuka});
        continue;
      }

      if (type === "快") {
        result.push({time: time, description: kago, isRapid: true});
        continue;
      }

      if (type === "籠原") {
        result.push({time: time, description: kago });
        continue;
      }

      throw new Error("Unexpected type: " + type);
    }
  }

  return result;
}

var schedule = {} as {[k:number]:Schedule[]};

schedule[1] = schedule[2] = schedule[3] = schedule[4] = schedule[5] = [];
schedule[0] = [];
schedule[6] = [];

Array.prototype.push.apply(schedule[1], parseData(`
7	　高
12 籠原　
26 快高
35 籠原　
43 　高
57
8	　前
04 快
16 　高
22 籠原　
35 快高
44 籠原　
49
9	快
07 　前
17 快高
22 籠原　
33 籠原　
47
`));

Array.prototype.push.apply(schedule[1], parseData(`
9	
[通快]木
11		[通快]宿
29		[通快]木
49	
10	
[快]木
09		[快]木
28		[快]木
48	
11	
[快]木
08		[快]木
28		[快]木
48	
12	
[快]木
08		[快]木
28		[快]木
48	
13	
[快]木
09		[快]木
28		[快]木
48	
14	
[快]木
08		[快]木
28		[快]木
48	
15	
[快]木
08		[快]木
28		[快]木
48	
16	
[快]宿
08		木
19		[快]木
28		[快]木
46		木
56	
17	
[通快]宿
07		木
15		[通快]宿
27		[通快]宿
45		木
55	
18	
[通快]宿
04		[通快]宿
25		[通快]宿
45	
19	
[通快]宿
05		[通快]木
24		[通快]木
44		[通快]宿
59	
20	
[通快]木
23		木
39	
21	
[通快]木
03		木
13		宿
24		[通快]宿
44		木
53	
22	
木
20		[通快]木
41	
23	
宿
02		池
19		池
41	
`));

Array.prototype.push.apply(schedule[0], parseData(`
8	
[快]木
07		[快]木
27		[快]木
48	
9	
[快]木
09		[快]宿
28		[快]木
48	
10	
[快]木
08		[快]木
29		[快]木
48	
11	
[快]木
08		[快]木
28		[快]木
48	
12	
[快]木
08		[快]木
28		[快]木
48	
13	
[快]木
09		[快]木
28		[快]木
48	
14	
[快]木
08		[快]木
28		[快]木
48	
15	
[快]木
08		[快]木
28		[快]木
48	
16	
[快]木
08		[快]木
28		宿
35		[快]木
48	
17	
[快]木
08		宿
20		[快]宿
28		[快]木
48	
18	
[快]木
08		[快]宿
28		宿
35		[快]木
48	
19	
[快]木
08		[快]宿
27		[快]宿
47	
20	
[快]宿
06		木
24		[快]宿
39	
21	
木
04		[快]宿
14		[快]宿
38	
22	
[快]宿
00		[快]宿
35		宿
54	
23	
池
18		池
41	
`));

Array.prototype.push.apply(schedule[6], parseData(`
4	
池
54	
5	
池
05		池
21		宿
39		宿
52	
6	
宿
04		[快]宿
10		木
28		[快]宿
35		宿
41		宿
53	
7	
宿
00		[快]木
08		宿
17		[快]木
28		宿
39		[快]宿
47	
8	
[快]木
07		[快]木
27		[快]木
48	
9	
[快]木
09		[快]宿
28		[快]木
48	
10	
[快]木
08		[快]木
29		[快]木
48	
11	
[快]木
08		[快]木
28		[快]木
48	
12	
[快]木
08		[快]木
28		[快]木
48	
13	
[快]木
09		[快]木
28		[快]木
48	
14	
[快]木
08		[快]木
28		[快]木
48	
15	
[快]木
08		[快]木
28		[快]木
48	
16	
[快]木
08		[快]木
28		宿
35		[快]木
48	
17	
[快]木
08		宿
20		[快]宿
28		[快]木
48	
18	
[快]木
08		[快]宿
28		宿
35		[快]木
48	
19	
[快]木
08		[快]宿
27		[快]宿
47	
20	
[快]宿
06		木
24		[快]宿
39	
21	
木
04		[快]宿
14		[快]宿
38	
22	
[快]宿
00		[快]宿
35		宿
54	
23	
池
18		池
41	
`));

var weekendAgeo = parseData(`
5	　高
44
6	　高
15 　高
31 　高
47 　高
58
7	　高
12 　高
26 快高
35 　高
57
8	　
04 快
14 　高
28 　高
50
9	快
04 　前
16 快高
31 　橋
38 　橋
54
10	　前
15 快
22 　高
46 高
11	　
02 　高
16 快
25 　快
37 　快
47
12	　高
02 　高
16 快
25 　快
36 　快
47
13	　高
02 　高
`);

Array.prototype.push.apply(schedule[6], weekendAgeo);
Array.prototype.push.apply(schedule[0], weekendAgeo);

for (var i = 0; i < 7; ++i) {
  schedule[i].sort((a, b) => a.time - b.time);
}
