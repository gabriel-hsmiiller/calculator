export default function OperationsService() {

    const addFunc = (a, b) => a + b;

    const subFunc = (a, b) => a - b;

    const multFunc = (a, b) => a * b;

    const divFunc = (a, b) => a / b;

    const squareFunc = (a) => a ** 2;

    const squareRootFunc = (a) => Math.sqrt(a);

    const modFunc = (a, b) => a % b;

    const absFunc = (a) => a < 0 ? a * -1 : a;

    const percentFunc = (a, b) => (b / 100) * a;

    return {
        addFunc,
        subFunc,
        multFunc,
        divFunc,
        squareFunc,
        squareRootFunc,
        modFunc,
        absFunc,
        percentFunc
    }
}