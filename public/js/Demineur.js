import { Case } from "./Case.js";
export class Demineur {
    nbColumns = 16;
    nbLines = 16;
    nbBombes = 20;
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
                    this.grid[this.formateKey(xPosition, yPosition)] = new Case(
                        xPosition,
                        yPosition
                    );
                    var span = document.createElement("button");
                    span.innerHTML = "&ensp;";
                    span.dataset.id = this.formateKey(xPosition, yPosition);
                    span.addEventListener("click", (e) => this.clickOnCase(e));
                    this.app.appendChild(span);
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
                // app.querySelector(
                //     "[data-id='" +
                //         this.grid[idCaseWithBombe].xPosition +
                //         "," +
                //         this.grid[idCaseWithBombe].yPosition +
                //         "']"
                // ).classList.add("black");
            }
        }

        // console.table(this.grid);
    }

    addDigits() {
        //   \ | /
        //  --   --
        //   / | \
        const idsCasesToCheck = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [1, 0],
            [1, -1],
            [1, 1],
            [0, -1],
            [0, 1],
        ];
        for (const property in this.grid) {
            if (this.grid[property].value === Case.STATUS_TYPE.BOMBE) {
                idsCasesToCheck.forEach((caseToCheck) => {
                    const idCasesToCheck = this.formateKey(
                        caseToCheck[0] + this.grid[property].xPosition,
                        caseToCheck[1] + this.grid[property].yPosition
                    );

                    if (
                        this.grid.hasOwnProperty(idCasesToCheck) &&
                        this.grid[idCasesToCheck].value !==
                            Case.STATUS_TYPE.BOMBE
                    ) {
                        this.grid[idCasesToCheck].value++;
                    }
                });
            }
        }
    }

    formateKey(xPosition, yPosition) {
        return xPosition + "," + yPosition;
    }

    clickOnCase(e) {
        if (this.grid[e.target.dataset.id].value !== Case.STATUS_TYPE.BOMBE) {
            e.target.classList.add("white");
            if(this.grid[e.target.dataset.id].value !== Case.STATUS_TYPE.NEUTRE){
                app.querySelector(
                    "[data-id='" +
                        this.formateKey(
                            this.grid[e.target.dataset.id].xPosition,
                            this.grid[e.target.dataset.id].yPosition
                        ) +
                        "']"
                ).textContent = this.grid[e.target.dataset.id].value;
            }
        } else {
            e.target.classList.add("black");
        }
    }

    getRandomCase() {
        return Math.floor(Math.random() * (this.nbColumns * this.nbLines));
    }
}
