import './App.css';
import data from './data.js';
import { useState } from 'react';
import Yoyil from './yoyil.js';


function App() {
  let [datas, setDatas] = useState(data);
  let [write, setWrite] = useState(false);
  let [routined, setRoutined] = useState(true);
  let [contents1, setContents1] = useState('');
  let [contents2, setContents2] = useState('');
  let [contents3, setContents3] = useState('');
  let [yoyils, setYoils] = useState(Yoyil);
  let [click, setClick] = useState([0, 0, 0])
  let [yoil, setYoil] = useState([1, 0, 0, 0, 0, 0, 0, 0])
  let [newyoil, setNewyoil] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]])
  let [click2, setClick2] = useState(0)


  function func1(n) {
    let copy = [...click];
    copy[n] = copy[n] + 1;
    setClick(copy)
  }

  function func2(n) {
    let copy = [...yoil];
    copy = [0, 0, 0, 0, 0, 0, 0, 0];
    copy[n] = copy[n] + 1;
    setYoil(copy);
  }


  return (
    <div>
      <div className='realback'>
        <div></div>
        <div className='back'>
          <div className='banner'>오늘의 루틴</div>
          <div className='title'>&nbsp;&nbsp;&nbsp;&nbsp;2023년 6월📅</div>
          <div className='yoyil'>
            {yoyils.map(function (row, i) {
              return (
                <div><button className={yoil[i] % 2 == 1 ? 'yoyilbutton2' : 'yoyilbutton'} onClick={() => {
                  func2(i);
                  setClick(newyoil[i]);
                }
                }>{row.title}</button></div>)
            })}
            <button className={click2 == 0 ? 'yoyilbutton' : 'yoyilbutton2'} onClick={() => {
              {
                newyoil.splice(yoil.indexOf(1), 1, click)
                setClick2(1)
                setTimeout(function () { setClick2(0) }, 130);
              }
            }}>저장</button>
          </div>
          <div className='l-title'>
            <div onClick={() => setRoutined(true)} className={routined ? 'routine' : 'nroutine'}>루틴</div>
            <div onClick={() => setRoutined(false)} className={routined ? 'nroutine' : 'routine'}>회고</div></div>

          <div className='down'>{routined ?
            datas.map(function (row, i) {
              return (
                <div>
                  <div className='textalign'>&nbsp;&nbsp;{i + 1}</div>
                  <div className='list'><div>{row.date}</div> <div className={click[i] % 2 == 1 ? 'line' : ''}>{row.title}</div>

                    <button className='rowbutton' onClick={() =>
                      func1(i)

                    }>{click[i] % 2 == 1 ? '✓' : ''}</button>
                    <div onClick={() => {
                      let copy = [...datas];
                      copy.splice(i, 1);
                      click.splice(i, 1);
                      setDatas(copy);
                    }} className='trash'>🗑</div>
                  </div>


                </div>
              )
            }) : <div><div className='diaryname'>루틴 회고</div>
              <textarea className='diary' placeholder='&nbsp;&nbsp;이번 주 루틴 어땠어요?' onChange={(e) => {
                setContents1(e.target.value)
              }}
                value={contents1}></textarea>
              <div className='diaryname'>이번 주 가장 좋았던 일</div>
              <textarea className='diary' placeholder='&nbsp;&nbsp;한 주동안 뭐가 가장 좋았나요?' onChange={(e) => {
                setContents2(e.target.value)
              }} value={contents2}></textarea>
              <div className='diaryname'>나에게 한마디</div>
              <textarea className='diary' placeholder='&nbsp;&nbsp;나에게 하고 싶은 말을 적어봐요:)' onChange={(e) => {
                setContents3(e.target.value)
              }} value={contents3}></textarea>

            </div>
          }</div>
          {routined ?
            <div>
            <button className='button' onClick={() => {
              setWrite(true)
              click.push(0)
              newyoil[0].push(0)
              newyoil[1].push(0)
              newyoil[2].push(0)
              newyoil[3].push(0)
              newyoil[4].push(0)
              newyoil[5].push(0)
              newyoil[6].push(0)

            }}>+</button>
              </div>: ''}


          {write ?
            <Write
              setWrite={setWrite}
              Write={Write}
              datas={datas}
              setDatas={setDatas}>글쓰기</Write> : ''}
        </div><div></div></div>
    </div >);
}

function Write(props) {
  let [title, setTitle] = useState('');
  let [contents, setContents] = useState('');
  return (
    <div className='modal'>
      <div className='modal-body'>
        <div className='modal-title'> 루틴 추가하기 </div><br></br>
        <span>언제 하실건가요?</span><br></br>
        <input type='text' placeholder='&nbsp;&nbsp;&nbsp;ex) 8p.m, 자기 직전에'
          onChange={(e) => {
            setContents(e.target.value);
          }}></input><br></br>
        <br></br>

        <span>루틴 이름</span><br></br>
        <input type='text' placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;루틴 이름'
          onChange={(e) => {
            setTitle(e.target.value);
          }}></input><br></br><br></br>

        <button className='modal-button'
          onClick={() => {
            if (title == '') {
              alert("루틴 이름 설정을 안하셨어요!");
              return;
            }
            else if (contents == '') {
              alert("언제 하실건지 작성해주세요!");
              return;
            }
            else {
              let copy = [...props.datas]
              let data = {
                title: title,
                date: contents,
                content: '',
                like: 0
              }
              copy.push(data);
              props.setDatas(copy);
              props.setWrite(false);
            }
          }
          }>확인</button>
      </div>
    </div>
  )
}


export default App;