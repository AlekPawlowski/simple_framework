export class Attributes<T> {
    constructor(private data: T) { }

    get(propName: string): string | number | boolean {
        return this.data[propName];
    }

    set(update: T): void {
        Object.assign(this.data, update);
    }
}

/* teraz w kursie będzie o rozwiązaniu problemu zwracanego 
typu w przypadku w którym mamy w zwracanym typie wiecej 
niz jeden (get method) tak aby było to bardziej generyczne
oraz abyśmy mogli uzywać bez przeszkód metod dla danych 
typów (teraz w returnie jak przypiszemy do jakiegoś obiektu/
zmiennej to będziemy mogli uzywać tylko wspólnych dla danych 
typów obiektow)
*/