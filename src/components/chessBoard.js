import { useRef, useState } from 'react';
import './chessboard.css';
import Tile from "./tile/Tile";
import Rules from '../rules/rules'
import { VERTICAL_AXIS, HORIZONTAL_AXIS, GRID_SIZE, initialstate, samePosition } from '../constants'

function Chessboard(props) {
    var board = [];
    const [pieces, setPieces] = useState(initialstate);
    const [grabPosition, setGrabPosition] = useState(null);
    const chessboardRef = useRef(null);
    const [active, setActive] = useState(null);
    const rules = new Rules();

    const grabPiece = (e) => {
        let element = e.target;
        let chessboard = chessboardRef.current;
        if (e.target.className.includes('chess-piece')) {
            setGrabPosition({ x: Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE), y: Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)) });
            let x = e.clientX - GRID_SIZE / 2;
            let y = e.clientY - GRID_SIZE / 2;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setActive(element);
        }
    }

    const movePiece = (e) => {
        let element = e.target;
        const chessboard = chessboardRef.current;
        if (active && active.className.includes('chess-piece')) {
            let minX = chessboard.offsetLeft;
            let minY = chessboard.offsetTop;
            let maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
            let maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
            let x = e.pageX - 50;
            let y = e.pageY - 50;
            active.style.position = "absolute";
            if (x < minX) {
                active.style.left = `${minX}px`;
            }
            else if (x > maxX) {
                active.style.left = `${maxX}px`;
            }
            else {
                active.style.left = `${x}px`;
            }
            if (y < minY) {
                active.style.top = `${minY}px`;
            }
            else if (y > maxY) {
                active.style.top = `${maxY}px`;
            }
            else {
                active.style.top = `${y}px`;
            }
        }
    }

    const dropPiece = (e) => {
        const chessboard = chessboardRef.current;
        if (active && chessboard) {
            let x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            let y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));
            const currentPiece = pieces.find((piece) => samePosition(piece.position, grabPosition));
            const pawnDirection = currentPiece.team === "HOME" ? 1 : -1;

            if (currentPiece) {
                const validMove = rules.isValidMove(grabPosition, {x,y}, currentPiece.type, currentPiece.team, pieces);
                const isEnPassantMove = rules.isEnPassanrMove(grabPosition, {x, y}, currentPiece.type, currentPiece.team, pieces);
                if (isEnPassantMove) {
                    let updatedPieces = pieces.reduce((results, piece) => {
                        if (samePosition(piece.position, grabPosition)) {
                            piece.enPassant = false;
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece);
                        } else if (!(samePosition(piece.position, { x, y: y - pawnDirection }))) {
                            if (piece.type == "PAWN")
                                piece.enPassant = false
                            results.push(piece);
                        }
                        return results;
                    }, []);

                    setPieces(updatedPieces);
                }
                else if (validMove) {
                    let updatedPieces = pieces.reduce((results, piece) => {
                        if (samePosition(piece.position, grabPosition)) {
                            piece.enPassant =Math.abs(grabPosition.y - y) == 2 && piece.type == "PAWN"
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece);
                        } else if (!(samePosition(piece.position, { x, y }))) {
                            if (piece.type == "PAWN")
                                piece.enPassant = false
                            results.push(piece);
                        }
                        return results;
                    }, []);
                    setPieces(updatedPieces);
                }
                else {
                    active.style.position = "relative";
                    active.style.removeProperty('left');
                    active.style.removeProperty('top');
                }

            }
            setActive(null)
        }
    }

    for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
            let piece = pieces.find((piece) =>  samePosition(piece.position,{x:i,y:j}))
            let image = piece ? piece.image : undefined;
            board.push(<Tile key={`${VERTICAL_AXIS[j]}${HORIZONTAL_AXIS[i]}`} number={i + j} image={image} />)
        }
    }
    return (
        <div className="chessboard" onMouseDown={e => grabPiece(e)} ref={chessboardRef} onMouseMove={e => movePiece(e)} onMouseUp={e => { dropPiece(e) }}>{board}</div>
    )
}

export default Chessboard;