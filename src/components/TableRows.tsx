
type Row = {
    id: number;
    word: string;
    features: string;
    count: number;
};

type TableRowsProps = {
    rows: Row[];
}

function TableRows({ rows }: TableRowsProps) {
    return (
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
    )
}

export default TableRows;