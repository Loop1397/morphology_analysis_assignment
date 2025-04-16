// import { useState } from "react";
import "./index.css";
import TextareaAutosize from 'react-textarea-autosize';

function Index() {
    //  const [count, setCount] = useState(0);

    return (
        <div style={{ width: "800px", borderRadius: "8px", backgroundColor: "#3C424A", padding: "20px 60px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <h1>形態素解析</h1>
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <TextareaAutosize
                        minRows={3}
                        placeholder="テキストを入力"
                        style={{ flexGrow: "1", marginTop: "20px", padding: "10px", backgroundColor: "#343A40", border: "none", borderBottom: "2px solid #2F3339", borderRadius: "4px", color: "#ffffff", resize: "none" }}
                    />
                    {/* <textarea ></textarea> */}
                    <button style={{ marginTop: "20px", }}>解 析</button>
                </div>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#343840", marginTop: "20px", }}></div>
                <p style={{ width: "100%", fontSize: "18px" }}>分かち書き</p>
                <div style={{ width: "100%", backgroundColor: "#343A40", paddingLeft: "10px", borderBottom: "2px solid #2F3339", borderRadius: "4px", }}>
                    <p>私 | は | 学生 | です | 。 |</p>
                </div>
                <table style={{ width: "100%", marginTop: "30px" }}>
                    <tr>
                        <td scope="col" style={{ borderBottom: "solid 2px #20C997" }}>順番</td>
                        <td scope="col" style={{ borderBottom: "solid 2px #20C997" }}>形態素</td>
                        <td scope="col" style={{ borderBottom: "solid 2px #20C997" }}>素性情報</td>
                        <td scope="col" style={{ borderBottom: "solid 2px #20C997" }}>数</td>
                    </tr>
                    <tr style={{ backgroundColor: "#343A40" }}>
                        <td>1</td>
                        <td>学生</td>
                        <td>名詞,一般,*,*,*,*,学生,ガクセイ,ガクセイ</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>私</td>
                        <td>名詞,代名詞,一般,*,*,*,私,ワタシ,ワタシ</td>
                        <td>1</td>
                    </tr>
                    <tr style={{ backgroundColor: "#343A40" }}>
                        <td>1</td>
                        <td>学生</td>
                        <td>名詞,一般,*,*,*,*,学生,ガクセイ,ガクセイ</td>
                        <td>1</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Index;
