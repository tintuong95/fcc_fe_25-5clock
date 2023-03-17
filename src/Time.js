import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
let timeInterval;

const Time = forwardRef((props, ref) => {
  const [newTime, setNewTime] = useState(props.time);
  const [status, setStatus] = useState(false);
  const [key,setKey]=useState(Math.random())

  useImperativeHandle(ref, () => ({
    onStarted() {
      onStarted();
    },
    onStopped() {
      onStopped();
    },
    onReset() {
      onReset();
    },
    status,
  }));
  const onStarted = () => {
    setStatus(true);

    timeInterval = setInterval(() => {
      if (newTime >= 1000) {
        setNewTime((newTime) => newTime - 1000);
      }
    }, 1000);
  };

  const onStopped = () => {
    setStatus(false);
    clearInterval(timeInterval);
  };

  const onReset = () => {
    setKey(Math.random())
    setStatus(false);
    setNewTime(props.time);
    props.setCompleted(props.completed);
    clearInterval(timeInterval);
  };

  useEffect(() => {
    setNewTime(props.time);
  }, [props.time]);

  useEffect(() => {
    if (newTime == 0) {
         props.setLabel("Break");
      if (props.completed) {
          clearInterval(timeInterval);
      } else {
     
       setTimeout(()=>{
         props.setCompleted(!props.completed);
       },1000)
      }
    }
  }, [newTime]);

  const zeroPad = (number) => {
    if (number == 0) {
      return "00";
    } else if (number > 0 && number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  };
  return (
    <>
      <div id="time-left" className="time" key={key}>
        {zeroPad(new Date(newTime).getMinutes()) +
          ":" +
          zeroPad(new Date(newTime).getSeconds())}
      </div>
    </>
  );
});

export default Time;
