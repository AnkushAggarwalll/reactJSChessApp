import { samePosition } from "../constants";
import { Helper } from "./rule.helpers";

export default class Rules {

    isEnPassanrMove(initialPosition, desiredPosition, type, team, piecesState) {
        const pawnDirection = team === "HOME" ? 1 : -1;
        if (type === "PAWN") {
            if ((desiredPosition.x - initialPosition.x === - 1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
                const piece = piecesState.find(piece => samePosition(piece.position, { x: desiredPosition.x, y: desiredPosition.y - pawnDirection }) && piece.enPassant);
                if (piece)
                    return true;
            }
        }
        return false;
    }

    isValidMove(initialPosition, desiredPosition, type, team, piecesState) {
        let helpers = new Helper()
        let validMove =false;
        switch(type){
            case 'PAWN':
                validMove = helpers.pawnMove(initialPosition,desiredPosition,team,piecesState);
                break;
            case "KNIGHT":
                validMove = helpers.kinghtMove(initialPosition,desiredPosition,team,piecesState);
                break;
            case "BISHOP":
                validMove = helpers.bishopMove(initialPosition,desiredPosition,team,piecesState);
                break;
            case "CASTLE":
                validMove = helpers.rookMove(initialPosition,desiredPosition,team,piecesState);
                break;
            case "QUEEN":
                validMove = helpers.queenMove(initialPosition,desiredPosition,team,piecesState);
                break;
            case "KING":
                validMove = helpers.kingMove(initialPosition,desiredPosition,team,piecesState);
                break;
        }
        return validMove;
    }
}