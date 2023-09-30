<template lang="">
    <div class="display">
        <div className="iput-board">
            <input id="height" type="number" v-model="tempheight" placeholder="Chiều Cao"/>
            <input id="weight" type="number" v-model="tempweight" placeholder="Chiều Rộng"/>
            <button @click="setBoard">
            Xác Nhận
            </button>
        </div>
        <div className="show">
            <div>
                <Broard
                @handleClick="handleClick"
                :Board="dataBoard"
                :disabled="disableBoard"
                :winCells="winCells"
            />
            </div>
            <div className="flex-show">
                <label> Lượt của: {{isTurn? 'X':'O'}} </label><br/>
                <button  @click="ResetBoard">Reset</button>
                <div>
                    <button @click="sortArray">Toggle</button>
                    <div className="buoc">
                        <h3>Lượt</h3>
                        <ol id="show-buoc">
                            <li v-for="(turn, idxT) in hitoryTurn"
                            :key="idxT"
                            :class= "turn[0] + ' ' + turn[1] + ' ' +  this.dataBoard[turn[0]][turn[1]] === this.newP? 'newPoin':''">
                            {{ turn[0] + ' ' + turn[1] + ' ' +  this.dataBoard[turn[0]][turn[1]] }}
                        </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Broard from './Board-tictoctoe.vue'
export default {
    data(){
       return {
            tempheight: '',
            tempweight: '',
            height: 10,
            weight: 10,
            isTurn: true,
            hitoryTurn: [],
            newP: '',
            dataBoard:[
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
            ],
            disableBoard: false,
            winCells:[],
        }
    },
    components:{
        Broard
    },
    computed: {

    },
    methods:{
        setBoard(){
            this.ResetBoard();
            this.dataBoard = [];
            if(this.tempheight < 4 || this.tempweight < 4){
                alert('Kích Thước bàn cờ cần lớn hơn 4!!');
                return;
            }
            this.height = parseInt(this.tempheight);
            this.weight = parseInt(this.tempheight);
            this.tempheight = '';
            this.tempweight = '';
            for (let i = 0; i < this.weight; i++) {
                const row = Array(this.height).fill('');
                this.dataBoard.push(row);
            }
        },
        handleClick(row, col){
            if(this.dataBoard[row][col] !== ''){
                return;
            }
            else if(this.dataBoard[row][col] === ''){
                this.dataBoard[row][col] = this.isTurn? 'X':'O';
                this.isTurn = !this.isTurn;
                this.hitoryTurn.push([row, col])
                this.newP = row + ' ' + col + ' ' + this.dataBoard[row][col];
                this.handleWinner(row, col);
            }
            
        },
        ResetBoard(){
            this.isTurn = true;
            this.hitoryTurn = [];
            for (let i = 0; i < this.weight; i++) {
                for (let j = 0; j < this.height; j++)
                this.dataBoard[i][j] = '';
            }
            this.disableBoard = false;
            this.winCells=[]
        },
        sortArray() {
            const sortedArray = [...this.hitoryTurn].sort((a, b) => {
                if (a[0] !== b[0]) {
                    return a[0] - b[0];
                } else {
                    return a[1] - b[1];
                }
            });
            this.hitoryTurn = sortedArray;
        },
        checkWinner(row,col) {
            const player = this.dataBoard[row][col];
            const directions = [
                [1, 0], // Kiểm tra chiến thắng dọc
                [0, 1], // Kiểm tra chiến thắng ngang
                [1, 1], // Kiểm tra chiến thắng chéo lên
                [1, -1], // Kiểm tra chiến thắng chéo xuống
            ];

            for (const [dx, dy] of directions) {
                var winCells = [row+''+col];
                let count = 1;
                let r = row + dx;
                let c = col + dy;
                while (r >= 0 && r < this.height && c >= 0 && c < this.weight && this.dataBoard[r][c] === player) {
                    winCells.push(r+''+c);
                    count++;
                    r += dx;
                    c += dy;
                }

                r = row - dx;
                c = col - dy;

                while (r >= 0 && r < this.height && c >= 0 && c < this.weight && this.dataBoard[r][c] === player) {
                    winCells.push(r+''+c);
                    count++;
                    r -= dx;
                    c -= dy;
                }
                if (count >= 4) {
                    return winCells;
                }
            }
            return null;
        },
        handleWinner(row, col) {
            this.winCells = this.checkWinner(row, col);
            if (this.winCells) {
                alert("Người Thắng Cuộc là: "+ this.dataBoard[row][col])
                this.disableBoard = true;
            }
        },
    },
}
</script>

<style lang="">

</style>