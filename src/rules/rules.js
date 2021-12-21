import { samePosition } from "../constants";

export default class Rules {

    isTileEmptyOrEnemy(position, pieces, team) {
        return !this.isTileOccupied(position, pieces) || this.isTileOccupiedByOpponent(position, pieces, team);
    }

    isTileOccupied(position, pieces) {
        let piece = pieces.find((pi) => samePosition(pi.position, { x: position.x, y: position.y }));
        if (piece)
            return true;
        else
            return null;
    }

    isTileOccupiedByOpponent(position, pieces, team) {
        let piece = pieces.find((pi) => samePosition(pi.position, { x: position.x, y: position.y }) && pi.team != team);
        if (piece)
            return true;
        else
            return null;
    }

    isEnPassanrMove(initialPosition, desiredPosition, type, team, piecesState) {
        const pawnDirection = team === "HOME" ? 1 : -1;
        if (type == "PAWN") {
            if ((desiredPosition.x - initialPosition.x == - 1 || desiredPosition.x - initialPosition.x == 1) && desiredPosition.y - initialPosition.y == pawnDirection) {
                const piece = piecesState.find(piece => samePosition(piece.position, { x: desiredPosition.x, y: desiredPosition.y - pawnDirection }) && piece.enPassant);
                if (piece)
                    return true;
            }
        }
        return false;
    }

    isValidMove(initialPosition, desiredPosition, type, team, piecesState) {
        const specialRow = team === "HOME" ? 1 : 6;
        const pawnDirection = team === "HOME" ? 1 : -1;
        if (type == "PAWN") {
            if (initialPosition.x == desiredPosition.x && initialPosition.y == specialRow && desiredPosition.y - initialPosition.y == 2 * pawnDirection) {
                if (!this.isTileOccupied(desiredPosition, piecesState) && !this.isTileOccupied({ x: desiredPosition.x, y: desiredPosition.y - pawnDirection }, piecesState))
                    return true;
            }
            else if (initialPosition.x == desiredPosition.x && desiredPosition.y - initialPosition.y == pawnDirection) {
                if (!this.isTileOccupied(desiredPosition, piecesState))
                    return true;
            }
            else if (desiredPosition.x - initialPosition.x == -1 && desiredPosition.y - initialPosition.y == pawnDirection) {

                if (this.isTileOccupiedByOpponent(desiredPosition, piecesState, team))
                    return true;
            }
            else if (desiredPosition.x - initialPosition.x == 1 && desiredPosition.y - initialPosition.y == pawnDirection) {

                if (this.isTileOccupiedByOpponent(desiredPosition, piecesState, team))
                    return true;
            }
        } else if (type == "KNIGHT") {
            if ((desiredPosition.x - initialPosition.x == -1 || desiredPosition.x - initialPosition.x == 1) && (desiredPosition.y - initialPosition.y == 2 || desiredPosition.y - initialPosition.y == -2)) {
                if (this.isTileEmptyOrEnemy(desiredPosition, piecesState, team))
                    return true;
            }
            else if ((desiredPosition.x - initialPosition.x == 2 || desiredPosition.x - initialPosition.x == -2) && (desiredPosition.y - initialPosition.y == 1 || desiredPosition.y - initialPosition.y == -1)) {
                if (this.isTileEmptyOrEnemy(desiredPosition, piecesState, team))
                    return true;
            }
        } else if (type == "BISHOP") {
            for (let i = 1; i < 8; i++) {
                if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
                    let passedPosition = { x: initialPosition.x + i, y: initialPosition.y + i };
                    if (this.isTileOccupied(passedPosition, piecesState)) {
                        console.log("illlegal move");
                        break;
                    }
                } else if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
                    let passedPosition = { x: initialPosition.x - i, y: initialPosition.y + i };
                    if (this.isTileOccupied(passedPosition, piecesState)) {
                        console.log("illlegal move");
                        break;
                    }
                }else if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
                    let passedPosition = { x: initialPosition.x - i, y: initialPosition.y - i };
                    if (this.isTileOccupied(passedPosition, piecesState)) {
                        console.log("illlegal move");
                        break;
                    }
                }else if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
                    let passedPosition = { x: initialPosition.x + i, y: initialPosition.y - i };
                    if (this.isTileOccupied(passedPosition, piecesState)) {
                        console.log("illlegal move");
                        break;
                    }
                }
                if ((desiredPosition.x - initialPosition.x == i || desiredPosition.x - initialPosition.x == -i) && (desiredPosition.y - initialPosition.y == i || desiredPosition.y - initialPosition.y == -i)) {
                    if (this.isTileEmptyOrEnemy(desiredPosition, piecesState, team))
                        return true;
                }
            }
        }
        return false;
    }
}