import React, { Component } from 'react';
import Recorder from 'recorderjs';
//import snsNoiseFilter from '../other/snsNoiseFilter.js'
import axios from 'axios';

class MyRecorder extends Component {
  constructor(props){
    super(props)

    this.state = {
      status: 'recorded',
      text : '',
      url: 'ws://localhost:8080/client/ws/speech?content-type=audio/x-raw,+layout=(string)interleaved,+rate=(int)44100,+format=(string)S16LE,+channels=(int)1'
    }

    this.createWebSocket = this.createWebSocket.bind(this);
    this.socketSend = this.socketSend.bind(this);
    this.cancel = this.cancel.bind(this);
    this.startListening = this.startListening.bind(this);
    this.stopListening = this.stopListening.bind(this);
    this.startUserMedia = this.startUserMedia.bind(this);
    this.onClick = this.onClick.bind(this)
  }

  createWebSocket() {
    const { url } = this.state
    const __this = this;

    const ws = new WebSocket(url);

    ws.onmessage = function(e) {
      const data = e.data;
      if (data instanceof Object && ! (data instanceof Blob)) {
        console.log('WebSocket: onEvent: got Object that is not a Blob');
      } else if (data instanceof Blob) {
        console.log('WebSocket: got Blob');
      } else {
        const res = JSON.parse(data);
        if (res.status === 0) {
          if (res.result) {
            console.log(res.result);
            if (res.result.final) {
              __this.setState({
                text: res.result.hypotheses[0].transcript
              })
              __this.stopListening();
              __this.gotoApi(res.result.hypotheses[0].transcript)
            }
          }
        } else {
          console.log('Server error: ' + res.status);
        }
      }
    }

    // Start recording only if the socket becomes open
    ws.onopen = function(e) {
      const {recorder} = __this.state;
      console.log('ws is open')
      const intervalKey = setInterval(() => {
        recorder.exportWAV((blob) => {
          __this.socketSend(blob);
          recorder.clear();
        }, 'audio/x-raw');
      }, 250);
      // Start recording
      recorder.record();
      console.log('Start recording')

      __this.setState({
        status: 'recording',
        intervalKey
      });
    };

    ws.onclose = function(e) {
      console.log('ws is close')
    };

    ws.onerror = function(e) {
      const data = e.data;
      console.log(data);
    }

    return ws;
  }

  socketSend(item) {
    const { ws } = this.state;
    if (ws) {
      var state = ws.readyState;
      if (state === 1) {
        if (item instanceof Blob) {
          if (item.size > 0) {
            ws.send(item);
            console.log('Send: blob: ' + item.type + ', ' + item.size);
          } else {
            console.log('Send: blob: ' + item.type + ', EMPTY');
          }
        } else {
          ws.send(item);
          console.log('Send tag: ' + item);
        }
      } else {
        console.log('WebSocket: readyState!=1: ' + state + ": failed to send: " + item);
      }
    } else {
      console.log('No web socket connection: failed to send: ' + item);
    }
  }

  cancel() {
    const { intervalKey, recorder, ws} = this.state;

    // Stop the regular sending of audio (if present)
    clearInterval(intervalKey);
    if (recorder) {
      recorder.stop();
      recorder.clear();
      console.log('Stopped recording');
    }
    if (ws) {
      ws.close();
    }
  }

  startListening() {
    const {ws} = this.state;

    if (ws) {
      this.cancel();
    }

    try {
      this.setState({
        ws: this.createWebSocket()
      })
    } catch (e) {
      console.log("No web socket support in this browser!");
    }
  }

  stopListening() {
    const { intervalKey, recorder} = this.state;
    const __this = this;
    
    // Stop the regular sending of audio
    clearInterval(intervalKey);
    
    // Stop recording
    if (recorder) {
      recorder.stop();
      console.log('Stopped recording');
      this.setState({
        status: 'recorded'
      })

      // Push the remaining audio to the server
      recorder.exportWAV(function(blob) {
        __this.socketSend(blob);
        __this.socketSend("EOF");
        recorder.clear();
      }, 'audio/x-raw');
    }
  }

  onClick() {
    const {status} = this.state;
    console.log(status)
    if(status === 'recorded') {
      this.startListening();
    }
    else if(status === 'recording') this.stopListening();
  }

  startUserMedia(stream) {
    const { audioContext } = this.state;
    var input = audioContext.createMediaStreamSource(stream);

    console.log('Media stream created.');
    
    this.setState({
      recorder: new Recorder(input)
    }); 
    console.log('Recorder initialised.');
  }
  
  componentWillMount() {
    const __this = this
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      this.setState({
        audioContext: new AudioContext()
      });
      console.log('Audio context set up.');
      console.log('navigator.getUserMedia ' + (navigator.mediaDevices.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }

    navigator.mediaDevices.getUserMedia({audio: true})
      .then((stream) => {
        /* use the stream */
        __this.startUserMedia(stream)
      })
      .catch((err) => {
        /* handle the error */
        console.log('No live audio input: ' + err);
      });
  }

  gotoApi(result) {
    console.log(`http://192.168.43.44:5000/asr?x=${result}`)
    axios.get(encodeURI(`http://192.168.43.44:5000/asr?x=${result}`))
      .then(function (response) {
        //console.log(response);
        return response.data
      })
      .then(function(json) {
        console.log(json)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <button onClick={this.startListening}> RECORD </button>
        <p> { text } </p>
      </div>
    );
  }
}

export default MyRecorder;
