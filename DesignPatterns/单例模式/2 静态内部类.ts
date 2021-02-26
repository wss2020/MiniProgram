class AtomicLong {
    private currentValue: number;

    public constructor(value: number) {
        this.currentValue = value;
    }

    incrementAndGet(): number {
        return ++this.currentValue;
    }

}

class IdGenerator {
    private id: AtomicLong = new AtomicLong(0);

    public constructor() {}

    private static SingletonHolder=class{
         static instance:IdGenerator = new IdGenerator();
    }

    public static getInstance():IdGenerator {
        return this.SingletonHolder.instance;
    }

    public getId(): number {
        return this.id.incrementAndGet();
    }
}

const s1: IdGenerator = IdGenerator.getInstance();
const s2: IdGenerator = IdGenerator.getInstance();

console.log(  s1 === s2 );
console.log(  s1.getId() );
console.log(  s2.getId() );
