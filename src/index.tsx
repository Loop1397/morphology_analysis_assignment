import { useState } from "react";
import "./App.css";

function Index() {
    //  const [count, setCount] = useState(0);

    return (
        <div style={{ width: "600px", height: "100%" }}>
            <h1>課題1 形態素解析</h1>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "300px" }}>
                <p>テキストを入力</p>
                <textarea style={{ flexGrow: "1" }}></textarea>
                <button style={{ marginTop: "20px", backgroundColor: "#20C997", color: "white" }}>解 析</button>
            </div>
            <table style={{ width: "100%", marginTop: "40px" }}>
                <tr>
                    <td scope="col">順番</td>
                    <td scope="col">形態素</td>
                    <td scope="col">素性情報</td>
                    <td scope="col">数</td>
                </tr>
            </table>
        </div>
    );
}

export default Index;
