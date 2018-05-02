import React, { Component } from "react";
import Recorder from "recorderjs";
import styled from "styled-components";
import axios from "axios";

import recorderLogo from "../img/recorder.png";
import recorderLogoActive from "../img/recorder-active.png";

const RecButton = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
`;

class MyRecorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "inactive",
      transcript: "",
      result: {},
      url:
        "ws://localhost:8080/client/ws/speech?content-type=audio/x-raw,+layout=(string)interleaved,+rate=(int)44100,+format=(string)S16LE,+channels=(int)1"
    };

    this.createWebSocket = this.createWebSocket.bind(this);
    this.socketSend = this.socketSend.bind(this);
    this.cancel = this.cancel.bind(this);
    this.startListening = this.startListening.bind(this);
    this.stopListening = this.stopListening.bind(this);
    this.startUserMedia = this.startUserMedia.bind(this);
    this.recorderIamge = this.recorderIamge.bind(this);
  }

  createWebSocket() {
    const { url } = this.state;
    const __this = this;

    const ws = new WebSocket(url);

    ws.onmessage = function(e) {
      const data = e.data;
      const res = JSON.parse(data);
      if (res.status === 0) {
        if (res.result) {
          console.log("receive result: " + res.result);
          if (res.result.final) {
            __this.stopListening();
            console.log(res.result.hypotheses[0].transcript);
            __this.props.onTranscript(res.result.hypotheses[0].transcript);
            __this.setState({
              transcript: res.result.hypotheses[0].transcript
            });
            __this.callApi(res.result.hypotheses[0].transcript);
          }
        }
      } else {
        console.log("Server error: status =" + res.status);
      }
    };

    // Start recording only if the socket becomes open
    ws.onopen = function(e) {
      const { recorder } = __this.state;
      console.log("ws is open");

      const intervalKey = setInterval(() => {
        recorder.exportWAV(blob => {
          __this.socketSend(blob);
          recorder.clear();
        }, "audio/x-raw");
      }, 250);

      recorder.record();
      console.log("Start recording");

      __this.setState({
        status: "active",
        intervalKey
      });
    };

    ws.onclose = function(e) {
      console.log("ws is close");
    };

    return ws;
  }

  socketSend(item) {
    const { ws } = this.state;
    const state = ws.readyState;
    if (state === 1) {
      if (item instanceof Blob) {
        if (item.size > 0) {
          ws.send(item);
          console.log("Send: blob: " + item.type + ", " + item.size);
        } else {
          console.log("Send: blob: " + item.type + ", EMPTY");
        }
      } else {
        ws.send(item);
        console.log("Send tag: " + item);
      }
    } else {
      console.log(
        "WebSocket: readyState!=1: " + state + ": failed to send: " + item
      );
    }
  }

  cancel() {
    const { intervalKey, recorder, ws } = this.state;

    // Stop the regular sending of audio (if present)
    clearInterval(intervalKey);

    if (recorder) {
      recorder.stop();
      recorder.clear();
    }

    if (ws) {
      ws.close();
    }
  }

  startListening() {
    const { ws } = this.state;

    if (ws) {
      this.cancel();
    }

    this.setState({
      ws: this.createWebSocket()
    });
  }

  stopListening() {
    const { intervalKey, recorder } = this.state;
    const __this = this;

    clearInterval(intervalKey);

    recorder.stop();
    console.log("Stop Recording");
    this.setState({
      status: "inactive"
    });

    // Push the remaining audio to the server
    recorder.exportWAV(function(blob) {
      __this.socketSend(blob);
      __this.socketSend("EOF");
      recorder.clear();
    }, "audio/x-raw");
  }

  startUserMedia(stream) {
    const { audioContext } = this.state;
    var input = audioContext.createMediaStreamSource(stream);

    console.log("Media stream created.");

    this.setState({
      recorder: new Recorder(input)
    });
    console.log("Recorder initialised.");
  }

  callApi(result) {
    axios
      .get(encodeURI(`http://192.168.43.44:5000/asr?x=${result}`))
      .then(function(response) {
        return response.data;
      })
      .then(function(data) {
        console.log(data);
        this.props.onResult(data);
        this.setState({
          result: data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  recorderIamge() {
    const { status } = this.state;
    if (status === "inactive") return recorderLogo;
    else if (status === "active") return recorderLogoActive;
  }

  componentWillMount() {
    const __this = this;
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia =
        navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      this.setState({
        audioContext: new AudioContext()
      });
      console.log("Audio context set up.");
      console.log(
        "navigator.getUserMedia " +
          (navigator.mediaDevices.getUserMedia ? "available." : "not present!")
      );
    } catch (e) {
      alert("No web audio support in this browser!");
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        /* use the stream */
        __this.startUserMedia(stream);
      })
      .catch(err => {
        /* handle the error */
        console.log("No live audio input: " + err);
      });
  }

  render() {
    return (
      <RecButton src={this.recorderIamge()} onClick={this.startListening} />
    );
  }
}

export default MyRecorder;
