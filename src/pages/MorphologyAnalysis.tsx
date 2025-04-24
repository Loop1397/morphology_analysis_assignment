import { useRef, useState } from "react";
import "./MorphologyAnalysis.css";
import "./TableRowsAnimation.css";
import TextareaAutosize from 'react-textarea-autosize';
import TableRows from "../components/TableRows";
import { CSSTransition } from 'react-transition-group';

import TinySegmenter from 'tiny-segmenter';
import SegmentedWords from "../components/SegmentedWords";
import * as kuromoji from '@patdx/kuromoji';

const segmenter = new TinySegmenter(); // インスタンス生成

const myLoader: kuromoji.LoaderConfig = {
    async loadArrayBuffer(url: string): Promise<ArrayBufferLike> {
        // .gz 확장자를 제거합니다.
        url = url.replace('.gz', '');
        const res = await fetch(
            'https://cdn.jsdelivr.net/npm/@aiktb/kuromoji@1.0.2/dict/' + url,
        );
        if (!res.ok) {
            throw new Error(`Failed to fetch ${url}, status: ${res.status}`);
        }
        return res.arrayBuffer();
    },
};

export const tokenizerPromise = new kuromoji.TokenizerBuilder({
    loader: myLoader,
}).build();

type Row = {
    id: number;
    word: string;
    features: string;
    count: number;
};

type Token = {
    basic_form: string,
    conjugated_form: string,
    conjugated_type: string,
    count: number,
    pos: string,
    pos_detail_1: string,
    pos_detail_2: string,
    pos_detail_3: string,
    surface_form: string,
    pronunciation?: string,
    reading?: string,
    word_id?: number,
    word_position?: number,
    word_type?: string,
};

function Index() {
    const [showTable, setShowTable] = useState(false);
    const [text, setText] = useState('');
    const [segmentedText, setSegmentedText] = useState<string[]>();

    const nodeRef = useRef(null);

    const [rows, setRows] = useState<Row[]>();

    const tokenizeAndCountNouns = async (): Promise<Array<any> | null> => {
        try {
            const tokenizer = await tokenizerPromise;

            // 形態素解析
            const tokens = tokenizer.tokenize(text);

            // 名詞以外は削除する
            // const filteredTokens = tokens.filter(token => token.pos === '名詞');

            // 同じトークンを削除し、カウントする
            const countedTokens: Record<string, Token> = {};

            tokens.forEach(token => {
                const key = token.surface_form;
                if (countedTokens[key]) {
                    countedTokens[key].count += 1;
                }
                else {
                    countedTokens[key] = { ...token, 'count': 1 };
                }
            })
            console.log(countedTokens);

            const targetObject = Object.values(countedTokens)
                .sort((a, b): number => b.count - a.count)
                .map(token => {
                    // いらない要素を削除
                    delete token.word_id;
                    delete token.word_position;
                    delete token.word_type;

                    return token;
                });

            const result = Object.values(targetObject);

            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const formatTokensForRows = (tokens: Array<any>): Row[] => {
        console.log(tokens);
        const result: Row[] = [];

        tokens.forEach((token, index) => {
            const features = [
                token.pos,
                token.pos_detail_1,
                token.pos_detail_2,
                token.pos_detail_3,
                token.conjugated_form,
                token.conjugated_type,
                token.basic_form,
            ];

            // 下の２つはないかもしれないので条件をつける
            if (token.pronunciation) features.push(token.pronunciation);
            if (token.reading) features.push(token.reading);

            const targetObject = {
                id: index + 1,
                word: token.surface_form,
                features: features.join(','),
                count: token.count,
            };

            result.push(targetObject);
        });

        return result;
    }

    return (
        <div style={{ width: "800px", borderRadius: "8px", backgroundColor: "#3C424A", marginTop: "100px", padding: "20px 60px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <h1>形態素解析</h1>
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <TextareaAutosize
                        minRows={3}
                        placeholder="テキストを入力してください"
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
                                setTimeout(async () => {
                                    setSegmentedText(segmenter.segment(text));
                                    const tokens = await tokenizeAndCountNouns();
                                    if (!tokens) {
                                        setText('');
                                        alert('ERROR!');
                                        return;
                                    }
                                    setRows(formatTokensForRows(tokens));
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
                        <TableRows rows={rows!} />
                    </div>
                </CSSTransition>
            </div>
        </div >
    );
}

export default Index;
