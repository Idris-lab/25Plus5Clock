import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faMinus, faPlus, faPowerOff} from "@fortawesome/free-solid-svg-icons";


function BreakLengthSetter(props) {

    return (
        <div className="left-column">
            <h2 id="break-label">Break Length</h2>
            <button id="break-decrement" onClick={props.handleBreakDecrement} disabled={props.disable}>
                <FontAwesomeIcon icon={faMinus} size="2x" />
            </button>
            <span id="break-length">{props.breakLength}</span>
            <button id="break-increment" type="button" onClick={props.handleBreakIncrement} disabled={props.disable}>
                <FontAwesomeIcon icon={faPlus} size="2x" />

            </button>
        </div>
    );

}
function SessionLengthSetter(props) {

    return (
        <div className="right-column">
            <h2 id="session-label">Session Length</h2>
            <button id="session-decrement" onClick={props.handleSessionDecrement} disabled={props.disable}>
                <FontAwesomeIcon icon={faMinus} size="2x" />
            </button>
            <span id="session-length">{props.sessionLength}</span>
            <button id="session-increment" onClick={props.handleSessionIncrement} disabled={props.disable}>
                <FontAwesomeIcon icon={faPlus} size="2x"  />
            </button>
        </div>
    );
}

function Timer(props) {
    return (
        <section className="session-counter-container">
            <h2 id="timer-label">{props.timerLabel}</h2>
            <span id="time-left" style={+props.hour < 1 ? { color: "#cc0000" } : { color: "#ffffff" }}>{`${props.hour}:${props.second}`}</span>
            <section className="control-button-container">
                <button id="start_stop" onClick={props.timerFlag ? props.handlePlay : props.handleStop}>
                    <FontAwesomeIcon icon={faPlay} size="2x"/>
                </button>
                <button id="pause" onClick={props.handlePause}>
                    <FontAwesomeIcon icon={faPause} size="2x"/>
                </button>
                <button id="reset" onClick={props.handleReset}>
                    <FontAwesomeIcon icon={faPowerOff} size="2x"/>
                </button>
            </section>

        </section>
    )
}

function Footer() {
    return (
        <footer>
            <p>Developed by Idris Adeniyi</p>
        </footer>
    )

}


class Pomodoro extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            breakLength: 5,
            sessionLength: 25,
            hour: hours[25],
            second: seconds[0],
            timerLabel: "Session",
            timerFlag: true,
            disable: false,
        }

        this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
        this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
        this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
        this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.audioRef = React.createRef();
        this.handleReset = this.handleReset.bind(this);


    }

    handleSessionIncrement() {
        if (this.state.sessionLength === 60) return false;

        this.setState(prevState => ({
            sessionLength: prevState.sessionLength + 1,
        }));

        if (this.state.timerLabel === "Session") {
            this.setState(prevState => ({
                hour: prevState.hour = hours[prevState.sessionLength],
                second: seconds[0],
            }))
        }

    }

    handleSessionDecrement() {
        if (this.state.sessionLength === 1) return false;

        this.setState(prevState => ({
            sessionLength: prevState.sessionLength - 1,
        }));

        if (this.state.timerLabel === "Session") {
            this.setState(prevState => ({
                hour: prevState.hour = hours[prevState.sessionLength],
                second: seconds[0],
            }))
        }

    }

    handleBreakIncrement() {
        if (this.state.sessionLength === 60) return false;

        this.setState(prevState => ({
            breakLength: prevState.breakLength + 1,
        }));

        if (this.state.timerLabel === "Break") {
            this.setState(prevState => ({
                hour: prevState.hour = hours[prevState.sessionLength],
                second: seconds[0],
            }));
        }

    }

    handleBreakDecrement() {
        if (this.state.breakLength === 1) return false;

        this.setState(prevState => ({
            breakLength: prevState.breakLength - 1,
        }))

        if (this.state.timerLabel === "Break") {
            this.setState(prevState => ({
                hour: prevState.hour = prevState.breakLength,
                second: seconds[0],
            }));
        }
    }

    handlePlay() {
        let hourCopy = Number(this.state.hour);
        let secondCopy = (+this.state.second === 0) ? 60 : +this.state.second;


        this.setState(prevState => ({
            disable: prevState.disable = true,
            timerFlag: prevState.timerFlag = false,
        }))

        // check if an interval has already been set up
        if (!timerId) {
            timerId = setInterval(() => {

                if ((this.state.timerLabel === "Session") && (hourCopy === 0) && (secondCopy === 0)) {

                    this.audioRef.current.play();

                    this.setState(prevState => ({
                        timerLabel: prevState.timerLabel = "Break",
                        hour: prevState.hour = hourCopy = hours[prevState.breakLength],
                        second: seconds[0],
                    }))


                } else if ((this.state.timerLabel === "Break") && (hourCopy === 0) && (secondCopy === 0)) {

                    this.audioRef.current.play();

                    this.setState(prevState => ({
                        timerLabel: prevState.timerLabel = "Session",
                        hour: prevState.hour = hourCopy = hours[prevState.sessionLength],
                        second: seconds[0],
                    }))


                } else {

                    if (flag === false) {
                        hourCopy--;
                        secondCopy = 59;

                    } else {
                        if (secondCopy === 60) hourCopy--;

                        secondCopy--;
                    }
                    flag = (secondCopy === 0) ? false : true;

                    this.setState(prevState => ({
                        hour: prevState.hour = hours[hourCopy],
                        second: prevState.second = seconds[secondCopy],
                    }))

                }
            }, 1000);
        }


    }

    handleStop() {
        stopTimer();
        this.setState(prevState => ({
            timerFlag: prevState.timerFlag = true,
            disable: prevState.disable = false,
        }))


    }

    handlePause() {
        stopTimer();

        this.setState(prevState => ({
            timerFlag: prevState.timerFlag = true,
            disable: prevState.disable = false,
        }))
    }

    handleReset() {
        stopTimer();

        this.setState(prevState => ({
            timerFlag: prevState.timerFlag = true,
            disable: prevState.disable = false,
            breakLength: 5,
            sessionLength: 25,
            hour: hours[25],
            second: seconds[0],
            timerLabel: "Session",

        }))

        this.audioRef.current.pause();
        
    }
    render() {

        return (
            <main>
                <h1>25 <FontAwesomeIcon icon={faPlus} /> 5 Clock</h1>
                <section className="session-break-container">
                    <BreakLengthSetter
                        breakLength={this.state.breakLength}
                        handleBreakIncrement={this.handleBreakIncrement}
                        handleBreakDecrement={this.handleBreakDecrement}
                        disable={this.state.disable}
                    />

                    <SessionLengthSetter
                        sessionLength={this.state.sessionLength}
                        handleSessionIncrement={this.handleSessionIncrement}
                        handleSessionDecrement={this.handleSessionDecrement}
                        disable={this.state.disable}
                    />
                </section>
                <Timer
                    hour={this.state.hour}
                    second={this.state.second}
                    timerLabel={this.state.timerLabel}
                    handlePlay={this.handlePlay}
                    handleStop={this.handleStop}
                    handlePause={this.handlePause}
                    timerFlag={this.state.timerFlag}
                    handleReset={this.handleReset}
                />
                <audio src="https://assets.mixkit.co/sfx/download/mixkit-alarm-clock-beep-988.wav"
                    id="beep"
                    ref={this.audioRef}
                >
                </audio>
                <Footer />
            </main>
        )
    }

}

const seconds = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
    "13", "14", "15", "16", "17", "18", "19", "20", "21", "22",
    "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33",
    "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
];

const hours = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33",
    "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
];

let timerId;
let flag = true;

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
}



export default Pomodoro;


