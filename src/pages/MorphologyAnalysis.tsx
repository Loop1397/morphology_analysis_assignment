import { useRef, useState } from "react";
import "./MorphologyAnalysis.css";
import "./TableRowsAnimation.css";
import TextareaAutosize from 'react-textarea-autosize';
import TableRows from "../components/TableRows";
import { CSSTransition } from 'react-transition-group';

import TinySegmenter from 'tiny-segmenter';
import SeparateWords from "../components/SeparateWords";

function Index() {
    const [showTable, setShowTable] = useState(false);

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

    const addRow = () => {
        const newRow = {
            id: rows.length + 1,
            word: "私",
            features: "名詞,代名詞,一般,*,*,*,私,ワタシ,ワタシ",
            count: 1,
        };
        setRows([...rows, newRow]);
        const segs = segmenter.segment("私の名前は中野です");
        console.log(segs);
    }

    const nodeRef = useRef(null);

    const segmenter = new TinySegmenter(); // インスタンス生成
    const result = segmenter.segment("私の名前は中野です。");

    return (
        <div style={{ width: "800px", borderRadius: "8px", backgroundColor: "#3C424A", marginTop: "100px", padding: "20px 60px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <h1>形態素解析</h1>
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <TextareaAutosize
                        minRows={3}
                        placeholder="テキストを入力"
                        style={{ flexGrow: "1", marginTop: "20px", padding: "10px", backgroundColor: "#343A40", border: "none", borderBottom: "2px solid #2F3339", borderRadius: "4px", color: "#ffffff", resize: "none" }}
                    />
                    <button
                        onClick={() => {
                            if (!showTable) {
                                setShowTable(!showTable);
                            }
                            else {
                                addRow();
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
                        <SeparateWords separate={result} />
                        <div style={{ marginTop: "30px" }}>
                            <TableRows rows={rows} />
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </div >
    );
}

export default Index;
