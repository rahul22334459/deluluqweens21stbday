import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

const messages = [
  "Today’s not an ordinary day…",
  "It’s the day a delulu queen was born in 2004 👑",
  "Ready for a small surprise?"
];

const flavors = ['Chocolate', 'Pineapple', 'Red Velvet', 'Strawberry'];

export default function App() {
  const [step, setStep] = useState(0);
  const [showYesNo, setShowYesNo] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const [cakeFlavor, setCakeFlavor] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState('');
  const [showCakeQuestion, setShowCakeQuestion] = useState(false);
  const [popCount, setPopCount] = useState(0);
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [candles, setCandles] = useState(0);
  const [showKnife, setShowKnife] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);

  // const audio = useRef(new Audio('/music.mp3'));
  // <audio id="bday-audio" src="/music.mp3" />

  const cakeRef = useRef(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('knife', 'true');
  };

  const handleDrop = (e) => {
    const data = e.dataTransfer.getData('knife');
    if (data === 'true') {
      setCakeCut(true);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };


  const playMusic = () => {
    const audio = document.getElementById('bday-audio');
    audio.play();
    setMusicOn(true);
  };

  const decorate = () => {
    const temp = [];
    for (let i = 0; i < 21; i++) {
      temp.push({ id: i, popped: false, x: Math.random() * 80 + 10, y: Math.random() * 60 + 10 });
    }
    setBalloons(temp);
    setShowConfetti(true);
    setPopCount(0);
    setFloatingNumbers([]);

    alert("🎯 Pop the balloons to reveal a small surprise 🎯, ignore the balloon animation please 🥲");
  };

  // const popBalloon = (id) => {
  //   setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
  //   setFloatingNumbers(prev => [...prev, { id, number: popCount + 1, x: balloons.find(b => b.id === id).x, y: balloons.find(b => b.id === id).y }]);
  //   setPopCount(prev => prev + 1);
  // };

  const popBalloon = (id) => {
    const audio = new Audio('/pop.mp3');
    audio.play();

    setBalloons(prev =>
      prev.map(b => b.id === id ? { ...b, popped: true } : b)
    );

    const poppedBalloon = balloons.find(b => b.id === id);
    setFloatingNumbers(prev => [
      ...prev,
      {
        id,
        number: popCount + 1,
        x: poppedBalloon.x,
        y: poppedBalloon.y
      }
    ]);

    setPopCount(prev => prev + 1);
  };


  // useEffect(() => {
  //   if (lightsOn) {
  //     document.body.style.background = '#fffbe7';
  //     document.body.style.transition = 'background 1s ease-in-out';
  //   } else {
  //     document.body.style.background = '#1a1a1a';
  //   }
  // }, [lightsOn]);

  useEffect(() => {
    if (lightsOn) {
      document.body.style.background = '#fffbe7';
      document.body.style.color = '#333';
      document.body.style.transition = 'background 1s ease-in-out, color 1s ease-in-out';

      // Optional: Add a soft glow effect to simulate lights turning on
      document.body.style.boxShadow = 'inset 0 0 60px rgba(255, 245, 180, 0.5)';
    } else {
      document.body.style.background = '#1a1a1a';
      document.body.style.color = '#f0f0f0';
      document.body.style.transition = 'background 1s ease-in-out, color 1s ease-in-out';

      // Remove glow when lights are off
      document.body.style.boxShadow = 'none';
    }
  }, [lightsOn]);

  const resetAll = () => {
    setStep(0);
    setShowYesNo(false);
    setAccepted(false);
    setLightsOn(false);
    setMusicOn(false);
    setBalloons([]);
    setCakeFlavor(null);
    setShowConfetti(false);
    setMessage('');
    setShowCakeQuestion(false);
    setPopCount(0);
    setFloatingNumbers([]);
    setCandles(0);
    setShowKnife(false);
    setCakeCut(false);
    setMusicOn(false);
    const audio = document.getElementById('bday-audio');
    //audio.stop();

    if (audio.current) {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
  };

  return (
    <div className={`app ${lightsOn ? 'light-on' : 'dark-mode'}`}>
      {/* <audio id="bday-audio" src="/music.mp3" /> */}
      <audio id="bday-audio" src={`${process.env.PUBLIC_URL}/music.mp3`} />
      {showConfetti && <div className="confetti">🎊🎉✨🎈</div>}

      {step === 0 && (
        <div className="page">
          <h1>Hey Goldfish, guess what?</h1>
          <button onClick={() => setStep(1)}>→</button>
        </div>
      )}

      {step > 0 && step <= messages.length && !showYesNo && (
        <div className="page">
          <h2>{messages[step - 1]}</h2>
          <div>
            {step > 0 && <button onClick={() => setStep(step - 1)}>←</button>}
            <button onClick={() => {
              if (step < messages.length) {
                setStep(step + 1);
              } else {
                setShowYesNo(true);
              }
            }}>→</button>
          </div>
        </div>
      )}

      {showYesNo && !accepted && (
        <div className="page">
          <h2>Do you want to see a small thing I made?</h2>
          <button onClick={() => setAccepted(true)}>Yes</button>
          <button onClick={() => alert('Awww, come back later when you are free 😔')}>No</button>
        </div>
      )}

      {accepted && !cakeFlavor && (
        <div className="page">
          <h2>Let’s Celebrate! 🎉</h2>
          <h3>Here’s to a cutie patootie I know 🥳</h3>
          <button onClick={() => setLightsOn(true)}>💡 Lights On</button>
          <button onClick={playMusic}>🎵 Play Music</button>
          <button onClick={decorate}>🎈 Decorate</button>

          <div className="balloon-area">
            {balloons.map((b) => (
              <div
                key={b.id}
                className={`balloon ${b.popped ? 'popped' : ''}`}
                style={{ left: `${b.x}%`, top: `${b.y}%`, fontSize: '80px' }}
                onClick={() => !b.popped && popBalloon(b.id)}
              >

              </div>
            ))}

            {floatingNumbers.map(f => (
              <div key={f.id} className="floating-number" style={{ left: `${f.x}%`, top: `${f.y}%` }}>
                {f.number}
              </div>
            ))}
          </div>

          {popCount === 21 && !showCakeQuestion && (
            <div>
              <h3>कांई थै केक काटणो चावो हो?</h3>
              <button onClick={() => setShowCakeQuestion(true)}>Avunu</button>
              <button onClick={() => alert('Kyoon???')}>Kaadu</button>
            </div>
          )}
        </div>
      )}

      {showCakeQuestion && !cakeCut && (
        <div className="page">
          <h2>Which cake flavor do you want?</h2>
          {flavors.map(f => (
            <button key={f} onClick={() => setCakeFlavor(f)}>{f}</button>
          ))}
        </div>
      )}

      {/* {cakeFlavor && !cakeCut && (
        <div className="page">
          <h2>Here’s your {cakeFlavor} cake! 🎂</h2>
          <div className="cake-wrapper">
            <img src={`/${cakeFlavor.toLowerCase()}.jpg`} alt="Cake" className="cake-img" />
            {[...Array(candles)].map((_, i) => <div key={i} className="candle" style={{ left: `${40 + i * 10}%` }}>🕯️</div>)}
          </div>
          <div className="cake-controls">
            {candles < 3 && <button onClick={() => setCandles(c => c + 1)}>Add Candle</button>}
            {candles === 3 && !showKnife && <button onClick={() => setShowKnife(true)}>Bring the Knife</button>}
            {showKnife && <button onClick={() => setCakeCut(true)}>Cut the Cake 🎂🔪</button>}
          </div>
        </div>
      )} */}

      {/* {cakeFlavor && !cakeCut && (
  <div className="page">
    <h2>Here’s your {cakeFlavor} cake! 🎂</h2>
    <div
      className="cake-wrapper"
      onDrop={handleDrop}
      onDragOver={allowDrop}
      ref={cakeRef}
    >
      <img
        src={`/${cakeFlavor.toLowerCase()}.jpg`}
        alt="Cake"
        className="cake-img"
      />
      {[...Array(candles)].map((_, i) => (
        <div key={i} className="candle" style={{ left: `${40 + i * 10}%` }}>
          🕯️
        </div>
      ))}
    </div>

    {candles < 3 && (
      <button onClick={() => setCandles(c => c + 1)}>Add Candle</button>
    )}

    {candles === 3 && !showKnife && (
      <button onClick={() => setShowKnife(true)}>Click to get a Knife</button>
    )}

    {showKnife && (
      <img
        src="/knife.jpg"
        alt="Knife"
        className="knife-img"
        draggable="true"
        onDragStart={handleDragStart}
      />
    )}
  </div>
)} */}
      {cakeFlavor && !cakeCut && (
        <div className="page">
          <h2>Since we don't have the budget nor the facility to get an actual cake, Here’s your virtual {cakeFlavor} cake! 🎂</h2>

          {/* Cake and Candles Section */}
          <div
            className="cake-wrapper"
            onDrop={handleDrop}
            onDragOver={allowDrop}
            ref={cakeRef}
          >
            <img
              // src={`/${cakeFlavor.toLowerCase()}.jpg`}
              src={`${process.env.PUBLIC_URL}/${cakeFlavor.toLowerCase()}.jpg`}
              alt="Cake"
              className="cake-img"
            />
            {[...Array(candles)].map((_, i) => (
              <div key={i} className="candle" style={{ left: `${40 + i * 10}%` }}>
                🕯️
              </div>
            ))}
          </div>

          {/* Buttons below the cake */}
          <div className="mt-4 flex flex-col items-center gap-2">
            {candles < 3 && (
              <button
                onClick={() => setCandles(c => c + 1)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow"
              >
                Add Candle
              </button>
            )}

            {candles === 3 && !showKnife && (
              <button
                onClick={() => setShowKnife(true)}
                className="bg-red-400 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow"
              >
                Click to get a Knife
              </button>
            )}
          </div>

          {/* Knife appears separately */}
          {/* {showKnife && (
      <img
        src="/knife.jpg"
        alt="Knife"
        className="knife-img mt-4"
        draggable="true"
        onDragStart={handleDragStart}
      />
    )} */}
          {showKnife && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-lg font-medium text-gray-700">
                Now drag the knife to cut the cake and see some magic! 🎉
              </p>
              <img
                // src="/knife.jpg"
                src={`${process.env.PUBLIC_URL}/knife.jpg`}
                alt="Knife"
                className="knife-img"
                draggable="true"
                onDragStart={handleDragStart}
              />
            </div>
          )}

        </div>
      )}


      {cakeFlavor && cakeCut && (
        <div className="page">
          <h2>Same excuse as last slide and here's your virtual slice of {cakeFlavor} cake! 🍰</h2>
          <h2>Enjoy it virtually, wohooo</h2>
          {/* <img src={`/${cakeFlavor.toLowerCase()}-slice.jpg`} alt="Cake Slice" className="cake-img" /> */}
          <img
            src={`${process.env.PUBLIC_URL}/${cakeFlavor.toLowerCase()}-slice.jpg`}
            alt="Cake Slice"
            className="cake-img"
          />

          <h3>Happy Birthday, Gurlll 🎊🎈🎉</h3>
          <p>Wishing you a day filled with love, laughter, and lots of work, hehe!!!</p>
          <button onClick={resetAll} className="floating-reset-button">🌟 Wanna see it again? Click here!</button>
        </div>
      )}

      <style>{`
        .floating-reset-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 10px 20px;
          background-color: #ffb6c1;
          border: none;
          border-radius: 30px;
          font-size: 18px;
          cursor: pointer;
          animation: fadeInUp 1.5s ease-in-out;
        }

        .cake-controls {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .balloon-area {
          position: relative;
          width: 100%;
          height: 400px;
        }

        .balloon {
          position: absolute;
          cursor: pointer;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .balloon.popped {
          transform: scale(0);
          opacity: 0;
          pointer-events: none;
        }

        .floating-number {
          position: absolute;
          font-size: 24px;
          font-weight: bold;
          color: #ff69b4;
          animation: floatUp 1.5s ease forwards;
        }

        .cake-wrapper {
          position: relative;
          display: inline-block;
        }

        .cake-img {
          width: 300px;
          border-radius: 20px;
        }

        .candle {
          position: absolute;
          top: 20px;
          font-size: 24px;
        }

        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px);
          }
        }

        .dark-mode {
          color: white;
        }
      `}</style>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
