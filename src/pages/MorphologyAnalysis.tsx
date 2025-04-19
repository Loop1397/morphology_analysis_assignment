import { useRef, useState } from "react";
import "./MorphologyAnalysis.css";
import "./TableRowsAnimation.css";
import TextareaAutosize from 'react-textarea-autosize';
import TableRows from "../components/TableRows";
import { CSSTransition } from 'react-transition-group';

import TinySegmenter from 'tiny-segmenter';
import SegmentedWords from "../components/SegmentedWords";

const segmenter = new TinySegmenter(); // インスタンス生成

function Index() {
    const [showTable, setShowTable] = useState(false);
    const [text, setText] = useState('');
    const [segmentedText, setSegmentedText] = useState<string[]>();

    const nodeRef = useRef(null);

    const [rows, setRows] = useState([
        {
            id: 1,
            word: "学生",
            features: "名詞,一般,*,*,*,*,学生,ガクセイ,ガクセイ",
            count: 1,
        },
        {
            id: 2,
            word: "私",
            features: "	名詞,代名詞,一般,*,*,*,私,ワタシ,ワタシ",
            count: 1,
        },
    ]);

    return (
        <div style={{ width: "800px", borderRadius: "8px", backgroundColor: "#3C424A", marginTop: "100px", padding: "20px 60px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <h1>形態素解析</h1>
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <TextareaAutosize
                        minRows={3}
                        placeholder="テキストを入力"
                        value={text}
                        onChange={(event) => {
                            setText(event.target.value);
                        }}
                        style={{ flexGrow: "1", marginTop: "20px", padding: "10px", backgroundColor: "#343A40", border: "none", borderBottom: "2px solid #2F3339", borderRadius: "4px", color: "#ffffff", resize: "none" }}
                    />
                    <button
                        onClick={() => {
                            if (text === '') {
                                alert('先にテキストを入力してください！');
                            }
                            else {
                                if (showTable) {
                                    setShowTable(false);
                                }
                                setTimeout(() => {
                                    setSegmentedText(segmenter.segment(text));
                                    setText('');
                                    setShowTable(true);
                                }, 300);
                            }
                        }}
                        style={{ marginTop: "20px", }}
                    >
                        解 析
                    </button>
                </div>

                <CSSTransition
                    in={showTable}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                    classNames="fade-slide"
                    nodeRef={nodeRef}
                >
                    <div
                        ref={nodeRef}
                        style={{ width: "100%", overflow: "hidden" }}
                    >
                        <div style={{ width: "100%", height: "2px", backgroundColor: "#343840", marginTop: "20px", }}></div>
                        <SegmentedWords separate={segmentedText!} />
                        <TableRows rows={rows} />
                    </div>
                </CSSTransition>
            </div>
        </div >
    );
}

export default Index;
