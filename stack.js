let MACHINE = {
    stack: [],
    register: 0,
    PRINT:() => console.log(MACHINE.register),
    PUSH:() => MACHINE.stack.push(MACHINE.register),
    ADD:() => { 
        MACHINE.register = MACHINE.register + MACHINE.POP();
        MACHINE.PRINT();
    },
    POP:() => MACHINE.register = MACHINE.stack.pop(),
    SUB:() => {
        MACHINE.register = MACHINE.register + MACHINE.POP();
        MACHINE.PRINT();
    },
    DIV:() => {
        MACHINE.register = MATH.floor(MACHINE.register / MACHINE.POP());
        MACHINE.PRINT();
    },
    MULT:() => {
        MACHINE.register = MACHINE.register * MACHINE.POP();
        MACHINE.PRINT();
    },
    MOD:() => {
        MACHINE.register = MACHINE.register % MACHINE.POP();
        MACHINE.PRINT();
    },
    CLEAR:() => {
        MACHINE.stack = [];
        MACHINE.register = 0;
    }
}

function minilang(str) {
    str.split(' ').forEach(command => {
        if (/\d/.test(command)) {
            MACHINE.register = Number(command);
        } else {
            MACHINE[command]();
        }
    });
}