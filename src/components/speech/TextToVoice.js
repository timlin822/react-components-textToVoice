import {useState,useEffect} from 'react';

import Error from 'components/error/Error';

import './TextToVoice.css';

const TextToVoice=()=>{
    const [error,setError]=useState("");
    const [playing,setPlaying]=useState(false);
    const [text,setText]=useState("");

    const speech=new SpeechSynthesisUtterance();
    speech.volume=1;
    speech.rate=1.5;
    speech.pitch=1;
    const voices=window.speechSynthesis.getVoices();
    for(let index=0;index<voices.length;index++){
        if(voices[index].name==="Microsoft HsiaoChen Online (Natural) - Chinese (Taiwan)"){
            speech.voice=voices[index];
            break;
        }
        else if(voices[index].name==="Google 國語（臺灣）"){
            speech.voice=voices[index];
            break;
        }

        if(index+1===voices.length){
            speech.lang="zh-TW";
        }
    }
    speech.onend=()=>{
        setPlaying(false);
    };

    useEffect(()=>{
        setError("");
    },[]);

    const changeHandler=(e)=>{
        setError("");

        setText(e.target.value);
    };

    const startHandler=()=>{
        if(!text){
            return setError("請輸入文字內容");
        }

        setPlaying(true);
        speech.text=text;
        window.speechSynthesis.speak(speech);
    };

    const pauseHandler=()=>{
        setPlaying(true);
        window.speechSynthesis.pause();
    };
    const resumeHandler=()=>{
        setPlaying(true);
        window.speechSynthesis.resume();
    };
    const cancelHandler=()=>{
        setPlaying(false);
        window.speechSynthesis.cancel();
    };

    return (
        <div className="text-to-voice">
            <div className="input-group">
                <label htmlFor="speech">文字區塊:</label>
                <textarea className="textarea-input" id="speech" rows="10" value={text} onChange={changeHandler}></textarea>
            </div>
            {error && <Error error={error} setError={setError} />}
            {playing?<><button className="btn" onClick={pauseHandler}>暫停</button><button className="btn" onClick={resumeHandler}>繼續</button><button className="btn" onClick={cancelHandler}>結束</button></>:<button className="btn" onClick={startHandler}>開始</button>}
        </div>
    );
}

export default TextToVoice;