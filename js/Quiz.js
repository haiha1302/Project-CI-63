export class Quiz {
    constructor(sumQuestion, timeAnswer, scoreCount, scoreSetting){
        this._scoreCount = scoreCount;  // điểm cộng trừ
        this._sumQuestion = sumQuestion;   // tổng số câu hỏi
        this._timeAnswer = timeAnswer;  // thời gian trả lời
        this._scoreSetting = scoreSetting; // chế độ tính điểm
        this._countCorrect = 0;  // số câu đúng
        this._timeOut = false;
    }

    get scoreCount() {
        return this._scoreCount;
    }

    get sumQuestion() {
        return this._sumQuestion;
    }

    get timeAnswer() {
        return this._timeAnswer;
    }

    get scoreSetting() {
        return this._scoreSetting;
    }

    get countCorrect() {
        return this._countCorrect;
    }

    get timeOut() {
        return this._timeOut;
    }

    clock() {
        this._timeAnswer--;
    }

    outClock() {
        this._timeOut = true;
    }
    
    correct() {
        this._countCorrect++;
    }

    notCorrect() {
        this._countCorrect--;
    }

    getScore() {
        if(this._countCorrect <= 0) return 0;
        else return this._countCorrect * this._scoreCount;
    }
}