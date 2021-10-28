import { Case } from "./Case.js";
export class Demineur {
    nbColumns = 16;
    nbLines = 16;
    nbBombes = 25;
    //   \ | /
    //  --   --
    //   / | \
    caseAroundRealtiveCoordinates = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [1, 0],
        [1, -1],
        [1, 1],
        [0, -1],
        [0, 1],
    ];
    constructor(app, resetGameBtn) {
        this.app = app;
        this.resetGameBtn = resetGameBtn;
        this.player = "X";
        this.win = false;
        this.grid = [];
        this.gridHTML;
    }

    prepare() {
        this.displayInitialGrid();
        this.addBombes();
        this.addDigits();
        console.log(this.grid);
    }

    displayInitialGrid() {
        for (let yPosition = 0; yPosition <= this.nbLines; yPosition++) {
            for (let xPosition = 0; xPosition <= this.nbColumns; xPosition++) {
                if (yPosition !== 0 && xPosition !== 0) {
                    var span = document.createElement("button");
                    span.innerHTML = "&ensp;";
                    span.dataset.id = this.formateKey(xPosition, yPosition);
                    span.addEventListener("click", (e) => this.clickOnCase(e));
                    this.app.appendChild(span);
                    this.grid[this.formateKey(xPosition, yPosition)] = new Case(
                        xPosition,
                        yPosition,
                        span
                    );
                } else {
                    var span = document.createElement("button");
                    span.innerHTML = yPosition === 0 ? xPosition : yPosition;
                    this.app.appendChild(span);
                }
            }
            this.app.appendChild(document.createElement("br"));
        }
        console.log(this.grid);
    }

    addBombes() {
        let nbBombes = this.nbBombes;
        while (nbBombes !== 0) {
            const idCaseWithBombe = Object.keys(this.grid)[
                this.getRandomCase()
            ];
            if (this.grid[idCaseWithBombe].value !== Case.STATUS_TYPE.BOMBE) {
                this.grid[idCaseWithBombe].value = Case.STATUS_TYPE.BOMBE;
                nbBombes--;
            }
        }
    }

    addDigits() {
        for (const property in this.grid) {
            if (this.grid[property].value === Case.STATUS_TYPE.BOMBE) {
                this.caseAroundRealtiveCoordinates.forEach(
                    (caseToCheck) => {
                        const idCaseToCheck = this.formateKey(
                            caseToCheck[0] + this.grid[property].xPosition,
                            caseToCheck[1] + this.grid[property].yPosition
                        );

                        if (
                            this.grid.hasOwnProperty(idCaseToCheck) &&
                            this.grid[idCaseToCheck].value !==
                                Case.STATUS_TYPE.BOMBE
                        ) {
                            this.grid[idCaseToCheck].value++;
                        }
                    }
                );
            }
        }
    }

    formateKey(xPosition, yPosition) {
        return xPosition + "," + yPosition;
    }

    clickOnCase(e) {
        const caseClicked = this.grid[e.target.dataset.id];
        this.revealCase(caseClicked);

        if (caseClicked.value === Case.STATUS_TYPE.NEUTRE) {
            this.revealAllAroundEmptyCase(caseClicked);
        }
    }

    revealAllAroundEmptyCase(caseClicked) {

        this.caseAroundRealtiveCoordinates.forEach((positionCaseToCheck) => {
            const idCaseToCheck = this.formateKey(
                positionCaseToCheck[0] + caseClicked.xPosition,
                positionCaseToCheck[1] + caseClicked.yPosition
            );

            if (this.grid.hasOwnProperty(idCaseToCheck)) {
                const caseToCheck = this.grid[idCaseToCheck];
                switch (true) {
                    case caseToCheck.value === Case.STATUS_TYPE.NEUTRE &&
                        caseToCheck.status !== Case.STATUS_TYPE.DISCOVER:
                        this.revealCase(caseClicked);
                        this.revealAllAroundEmptyCase(caseToCheck);
                        break;
                    case caseToCheck.value !== Case.STATUS_TYPE.NEUTRE &&
                        caseToCheck.value !== Case.STATUS_TYPE.BOMBE &&
                        caseToCheck.status !== Case.STATUS_TYPE.DISCOVER:
                        this.revealCase(caseToCheck);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    revealCase(caseSelected) {
        switch (caseSelected.value) {
            case Case.STATUS_TYPE.BOMBE:
                caseSelected.element.classList.add("black");
                break;
            case Case.STATUS_TYPE.NEUTRE:
                caseSelected.element.classList.add("white");
                break;
            default:
                caseSelected.element.classList.add("white");
                app.querySelector(
                    "[data-id='" +
                        this.formateKey(
                            caseSelected.xPosition,
                            caseSelected.yPosition
                        ) +
                        "']"
                ).textContent = caseSelected.value;
                break;
        }
        caseSelected.status = Case.STATUS_TYPE.DISCOVER;
    }

    getRandomCase() {
        return Math.floor(Math.random() * (this.nbColumns * this.nbLines));
    }
}
