export class Case {
  static STATUS_TYPE = {
    BOMBE: -1,
    NEUTRE: 0,
    DISCOVER: 1,
    FLAG: 2,
  };
  constructor(xPosition, yPosition) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.status = Case.STATUS_TYPE.NEUTRE;
    this.value = 0;
  }
}
