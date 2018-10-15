export class Dictionary {
    private static count:number;
    private countId = 0;
    private dic: any = {};

    constructor () {
        Dictionary.count = Dictionary.count || 0;
        Dictionary.count++;
    }

    setVal(obj: any, val: any) {
        let key: string = this.getKey(obj);
        this.dic[key] = val;
    }

    getVal(obj: any) {
        let key: string = this.getKey(obj);
        return this.dic[key];
    }

    private getKey(obj: any): string {
        if (typeof obj == "object") {
            if (obj.id) {
                return obj.id;
            } else {
                let id: string = "d_" + Dictionary.count + "_" +this.countId++;
                obj.id = id;
                return id;
            }
        } else {
            return obj + "";
        }
    }
}