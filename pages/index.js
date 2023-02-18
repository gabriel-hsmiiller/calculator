import React from "react";
import styles from './root-styles.module.css';
import {OPERATIONS_CONSTANTS} from "../constants/operations-constants";
import OperationsService from "../services/operations-service";
import {MdBackspace} from 'react-icons/md';

export default function Root() {
    const [operations, setOperations] = React.useState([]);
    const [result, setResult] = React.useState('');

    const operationsService = OperationsService();

    const write = (value) => {
        const newOperations = [...operations, value];
        setOperations(newOperations);
    }
    
    const deleteLast = () => {
        const newOperations = [...operations];
        newOperations.pop();

        setOperations(newOperations);
    }

    const calculate = () => {
        let index = 0;
        const fullOperation = operations.reduce((prev, char) => {
            const lastChar = prev[index - 1];

            if (typeof lastChar === 'number' && typeof char === 'number') {
                prev[index - 1] = (lastChar * 10) + char;
            } else {
                prev.push(char);
                index = index + 1;
            };

            return prev;
        }, []);

        let currentCalculation;
        let secondaryCalculation;
        let currentResult = 0;

        for (let i = 0; i < fullOperation.length; i++) {
            if (i === 0 && typeof fullOperation[i] === 'number') {
                currentResult = fullOperation[i];
            };

            if (typeof fullOperation[i] === 'string') {
                if (typeof fullOperation[i - 1] === 'string') {
                    secondaryCalculation = fullOperation[i];
                } else {
                    currentCalculation = fullOperation[i];
                }
            }

            if (currentCalculation === OPERATIONS_CONSTANTS.SQUARE) {
                fullOperation[i - 1] = operationsService.squareFunc(fullOperation[i - 1]);
            }

            if (typeof fullOperation[i] === 'number') {
                if (secondaryCalculation) {
                    switch (secondaryCalculation) {
                        case OPERATIONS_CONSTANTS.ABS:
                            fullOperation[i] = operationsService.absFunc(fullOperation[i]);
                            break;
                        case OPERATIONS_CONSTANTS.MOD:
                            fullOperation[i] = operationsService.modFunc(fullOperation[i]);
                            break;
                        case OPERATIONS_CONSTANTS.ROOT:
                            fullOperation[i] = operationsService.squareRootFunc(fullOperation[i]);
                            break;
                    }

                    secondaryCalculation = undefined;
                }
                switch (currentCalculation) {
                    case OPERATIONS_CONSTANTS.ADD:
                        currentResult = operationsService.addFunc(currentResult, fullOperation[i]);
                        break;
                    case OPERATIONS_CONSTANTS.SUB:
                        currentResult = operationsService.subFunc(currentResult, fullOperation[i]);
                        break;
                    case OPERATIONS_CONSTANTS.MULT:
                        currentResult = operationsService.multFunc(currentResult, fullOperation[i]);
                        break;
                    case OPERATIONS_CONSTANTS.DIV:
                        currentResult = operationsService.divFunc(currentResult, fullOperation[i]);
                        break;
                    case OPERATIONS_CONSTANTS.PERCENT:
                        currentResult = operationsService.percentFunc(currentResult, fullOperation[i]);
                        break;
                    case OPERATIONS_CONSTANTS.ABS:
                        currentResult = operationsService.absFunc(fullOperation[i]);
                        break;
                    case OPERATIONS_CONSTANTS.MOD:
                        currentResult = operationsService.modFunc(fullOperation[i]);
                        break;
                    case OPERATIONS_CONSTANTS.ROOT:
                        currentResult = operationsService.squareRootFunc(fullOperation[i]);
                        break;
                    default:
                        currentResult = fullOperation[i];
                }
            }
        }
        
        setResult(currentResult);
    }

    const clear = () => {
        setOperations([]);
        setResult('');
    }

    return (
        <section id={styles.main}>
            <div className={styles.visor}>
                <input className={styles.input} value={operations.join('')} readOnly />
                <span className={styles.result}>{result}</span>
            </div>
            <div className={styles.buttons}>
                <button className={styles.buttonItem} style={{ backgroundColor: '#30d06b' }} onClick={() => calculate()}>=</button>
                <button className={styles.buttonItem} style={{ backgroundColor: '#faf04b' }} onClick={() => clear()}>Clear</button>
                <button className={styles.buttonItem} onClick={() => write(0)}>0</button>
                <button className={styles.buttonItem} onClick={() => write(1)}>1</button>
                <button className={styles.buttonItem} onClick={() => write(2)}>2</button>
                <button className={styles.buttonItem} onClick={() => write(3)}>3</button>
                <button className={styles.buttonItem} onClick={() => write(4)}>4</button>
                <button className={styles.buttonItem} onClick={() => write(5)}>5</button>
                <button className={styles.buttonItem} onClick={() => write(6)}>6</button>
                <button className={styles.buttonItem} onClick={() => write(7)}>7</button>
                <button className={styles.buttonItem} onClick={() => write(8)}>8</button>
                <button className={styles.buttonItem} onClick={() => write(9)}>9</button>
                <button className={styles.buttonItem} onClick={() => write(OPERATIONS_CONSTANTS.ADD)}>+</button>
                <button className={styles.buttonItem} onClick={() => write(OPERATIONS_CONSTANTS.SUB)}>-</button>
                <button className={styles.buttonItem} onClick={() => write(OPERATIONS_CONSTANTS.MULT)}>×</button>
                <button className={styles.buttonItem} onClick={() => write(OPERATIONS_CONSTANTS.DIV)}>÷</button>
                <button className={styles.buttonItem} onClick={() => write(OPERATIONS_CONSTANTS.PERCENT)}>%</button>
                <button className={styles.buttonItem} onClick={() => write(OPERATIONS_CONSTANTS.ROOT)}>√x</button>
                <button className={styles.buttonItem} onClick={() => write(OPERATIONS_CONSTANTS.SQUARE)}>x²</button>
                <button className={styles.buttonItem} onClick={() => write(OPERATIONS_CONSTANTS.MOD)}>mod</button>
                <button className={styles.buttonItem} onClick={() => write(OPERATIONS_CONSTANTS.ABS)}>|x|</button>
                <button className={styles.buttonItem} onClick={() => deleteLast()}><MdBackspace /></button>
            </div>
        </section>
    );
}