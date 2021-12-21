import { samePosition } from "../constants";

export class Helper {

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
        let piece = pieces.find((pi) => samePosition(pi.position, { x: position.x, y: position.y }) && pi.team !== team);
        if (piece)
            return true;
        else
            return null;
    }

    pawnMove(initialPosition, desiredPosition, team, piecesState) {
        const specialRow = team === "HOME" ? 1 : 6;
        const pawnDirection = team === "HOME" ? 1 : -1;
        if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2 * pawnDirection) {
            if (!this.isTileOccupied(desiredPosition, piecesState) && !this.isTileOccupied({ x: desiredPosition.x, y: desiredPosition.y - pawnDirection }, piecesState))
                return true;
        }
        else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
            if (!this.isTileOccupied(desiredPosition, piecesState))
                return true;
        }
        else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === pawnDirection) {

            if (this.isTileOccupiedByOpponent(desiredPosition, piecesState, team))
                return true;
        }
        else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection) {

            if (this.isTileOccupiedByOpponent(desiredPosition, piecesState, team))
                return true;
        }
        return false;
    }
    kinghtMove(initialPosition, desiredPosition, team, piecesState) {

        if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && (desiredPosition.y - initialPosition.y === 2 || desiredPosition.y - initialPosition.y === -2)) {
            if (this.isTileEmptyOrEnemy(desiredPosition, piecesState, team))
                return true;
        }
        else if ((desiredPosition.x - initialPosition.x === 2 || desiredPosition.x - initialPosition.x === -2) && (desiredPosition.y - initialPosition.y === 1 || desiredPosition.y - initialPosition.y === -1)) {
            if (this.isTileEmptyOrEnemy(desiredPosition, piecesState, team))
                return true;
        }

        return false;
    }
    bishopMove(initialPosition, desiredPosition, team, piecesState) {

        for (let i = 1; i < 8; i++) {
            if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
                let passedPosition = { x: initialPosition.x + i, y: initialPosition.y + i };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.isTileEmptyOrEnemy(passedPosition, piecesState, team)) {
                        return true;
                    }
                } else {
                    if (this.isTileOccupied(passedPosition, piecesState))
                        break;
                }
            } else if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
                let passedPosition = { x: initialPosition.x - i, y: initialPosition.y + i };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.isTileEmptyOrEnemy(passedPosition, piecesState, team)) {
                        return true;
                    }
                } else {
                    if (this.isTileOccupied(passedPosition, piecesState))
                        break;
                }
            } else if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
                let passedPosition = { x: initialPosition.x - i, y: initialPosition.y - i };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.isTileEmptyOrEnemy(passedPosition, piecesState, team)) {
                        return true;
                    }
                } else {
                    if (this.isTileOccupied(passedPosition, piecesState))
                        break;
                }
            } else if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
                let passedPosition = { x: initialPosition.x + i, y: initialPosition.y - i };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.isTileEmptyOrEnemy(passedPosition, piecesState, team)) {
                        return true;
                    }
                } else {
                    if (this.isTileOccupied(passedPosition, piecesState))
                        break;
                }
            }
        }

        return false;
    }
    kingMove(initialPosition, desiredPosition, team, piecesState) {
        let Xaxis = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
        let Yaxis = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;
            let passedPosition = { x: initialPosition.x + Xaxis, y: initialPosition.y + Yaxis};
                console.log(passedPosition);
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.isTileEmptyOrEnemy(desiredPosition, piecesState, team))
                        return true;
                } else {
                    if (this.isTileOccupied(passedPosition, piecesState))
                    return false
                }
        return false;
    }
    queenMove(initialPosition, desiredPosition, team, piecesState) {
        for (let i = 1; i < 8; i++) {
            let Xaxis = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
            let Yaxis = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;
                let passedPosition = { x: initialPosition.x + (i * Xaxis), y: initialPosition.y + (i * Yaxis) };
            console.log(passedPosition);
            if (samePosition(passedPosition, desiredPosition)) {
                if (this.isTileEmptyOrEnemy(desiredPosition, piecesState, team))
                    return true;
            } else {
                if (this.isTileOccupied(passedPosition, piecesState))
                    break;
            }
        }
        return false;
    }
    rookMove(initialPosition, desiredPosition, team, piecesState) {
        if (desiredPosition.x === initialPosition.x) {
            for (let i = 1; i < 8; i++) {
                let direction = (desiredPosition.y > initialPosition.y) ? 1 : -1;
                let passedPosition = { x: initialPosition.x, y: initialPosition.y + (i * direction) };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.isTileEmptyOrEnemy(desiredPosition, piecesState, team))
                        return true;
                } else {
                    if (this.isTileOccupied(passedPosition, piecesState))
                        break;
                }
            }
        }
        if (desiredPosition.y === initialPosition.y) {
            for (let i = 1; i < 8; i++) {
                let direction = (desiredPosition.x > initialPosition.x) ? 1 : -1;
                let passedPosition = { x: initialPosition.x + (i * direction), y: initialPosition.y };
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.isTileEmptyOrEnemy(desiredPosition, piecesState, team))
                        return true;
                } else {
                    if (this.isTileOccupied(passedPosition, piecesState))
                        break;
                }
            }
        }
        return false;
    }
}