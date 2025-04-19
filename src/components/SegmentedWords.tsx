function SegmentedWords({ separate }: { separate: string[] }) {
    return (
        <div>
            <p style={{ width: "100%", fontSize: "18px" }}>分かち書き</p>
            <div style={{ width: "100%", backgroundColor: "#343A40", paddingLeft: "15px", paddingTop: "4px", borderBottom: "2px solid #2F3339", borderRadius: "4px", }}>
                <p>{separate.join(' | ')}</p>
            </div>
        </div>
    );
}

export default SegmentedWords;