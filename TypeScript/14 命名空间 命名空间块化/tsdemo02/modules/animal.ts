
export namespace A{
    interface Animal {
        name: string;
        eat(): void;
    }
    export class Dog implements Animal {
        name: string;
        constructor(theName: string) {
            this.name = theName;
        }

        eat() {
            console.log(`${this.name} 在吃狗粮。`);
        }
    }

    export class Cat implements Animal {
        name: string;
        constructor(theName: string) {
            this.name = theName;
        }

        eat() {
            console.log(`${this.name} 吃猫粮。`);
        }
    }   

}

export namespace B{
    interface Animal {
        name: string;
        eat(): void;
    }
    export class Dog implements Animal {
        name: string;
        constructor(theName: string) {
            this.name = theName;
        }

        eat() {
            console.log(`${this.name} 在吃狗粮。`);
        }
    }

    export class Cat implements Animal {
        name: string;
        constructor(theName: string) {
            this.name = theName;
        }

        eat() {
            console.log(`${this.name} 在吃猫粮。`);
        }
    }   

}
