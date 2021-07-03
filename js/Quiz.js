export class Quiz {
    constructor(question, answer, a, b, c, d){
        // this._scoreCount = scoreCount;  // điểm cộng trừ
        // this._sumQuestion = sumQuestion;   // tổng số câu hỏi
        // this._timeAnswer = timeAnswer;  // thời gian trả lời
        // this._scoreSetting = scoreSetting; // chế độ tính điểm
        // this._countCorrect = 0;  // số câu đúng
        // this._timeOut = false;
        this._question = question;
        this._answer = answer;
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
    }

    // get scoreCount() {
    //     return this._scoreCount;
    // }

    // get sumQuestion() {
    //     return this._sumQuestion;
    // }

    // get timeAnswer() {
    //     return this._timeAnswer;
    // }

    // get scoreSetting() {
    //     return this._scoreSetting;
    // }

    // get countCorrect() {
    //     return this._countCorrect;
    // }

    // get timeOut() {
    //     return this._timeOut;
    // }

    get id() {
        return this._id
    }
    set id(value) {
        this.id = value
    }

    get question() {
        return this._question;
    }
    set question(value) {
        this._question = value;
    }

    get answer() {
        return this._answer;
    }
    set answer(value) {
        this._answer = value;
    }

    get a() {
        return this._a;
    }
    set a(value) {
        this._a = value;
    }

    get b() {
        return this._b;
    }
    set b(value) {
        this._b = value;
    }

    get c() {
        return this._c;
    }
    set c(value) {
        this._c = value;
    }

    get d() {
        return this._d;
    }
    set d(value) {
        this._d = value;
    }

    get sumQuestion() {
        return this.sumQuestion
    }

    show() {
        return `
        <play-screen id="${this._id}" question="${this._question}" answer="${this._answer}" a="${this._a}" b="${this._b}" c="${this._c}" d="${this._d}"></play-screen>
        `
    }

    // clock() {
    //     this._timeAnswer--;
    // }

    // outClock() {
    //     this._timeOut = true;
    // }
    
    // correct() {
    //     this._countCorrect++;
    // }

    // notCorrect() {
    //     this._countCorrect--;
    // }

    // getScore() {
    //     if(this._countCorrect <= 0) return 0;
    //     else return this._countCorrect * this._scoreCount;
    // }
}



