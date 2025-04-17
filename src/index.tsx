import { useState } from "react";
import "./index.css";
import TextareaAutosize from 'react-textarea-autosize';

function Index() {
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
    }

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
                        onClick={addRow}
                        style={{ marginTop: "20px", }}
                    >
                        解 析
                    </button>
                </div>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#343840", marginTop: "20px", }}></div>
                <p style={{ width: "100%", fontSize: "18px" }}>分かち書き</p>
                <div style={{ width: "100%", backgroundColor: "#343A40", paddingLeft: "10px", borderBottom: "2px solid #2F3339", borderRadius: "4px", }}>
                    <p>私 | は | 学生 | です | 。 |</p>
                </div>
                <table style={{ width: "100%", marginTop: "30px" }}>
                    <thead>
                        <tr>
                            <td style={{ borderBottom: "solid 2px #20C997" }}>順番</td>
                            <td style={{ borderBottom: "solid 2px #20C997" }}>形態素</td>
                            <td style={{ borderBottom: "solid 2px #20C997" }}>素性情報</td>
                            <td style={{ borderBottom: "solid 2px #20C997" }}>数</td>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr
                                key={row.id}
                                style={{ backgroundColor: row.id % 2 === 1 ? "#343A40" : "none" }}
                            >
                                <td>{row.id}</td>
                                <td>{row.word}</td>
                                <td>{row.features}</td>
                                <td>{row.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Index;
