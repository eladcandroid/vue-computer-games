import dataService from '../services/data.service.js';

const NEW_GAME = {
    title: '',
    type: '',
    price: 0,
    image: ''
}

export default Vue.component('AddGame', {
    template: `<div class="add-game-container">
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input class="input is-primary" placeholder="Title" type="text" v-model="game.title" @input="validateField('title', game.title)" @blur="validateField('title', game.title)">
                    </div>
                    <p v-show="errors.includes('title')" class="help is-danger">Title is required</p>
                </div>
                <div class="field">
                    <label class="label">Type</label>
                    <div class="control">
                        <input class="input is-primary" placeholder="Type" type="text" v-model="game.type">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Image URL</label>
                    <div class="control">
                        <input class="input is-primary" placeholder="Image" type="text" v-model="game.image">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Price</label>
                    <div class="control">
                        <input class="input is-primary" placeholder="Price" v-model.number="game.price" @input="validateField('price', game.price && Number(game.price))" @blur="validateField('price', game.price && Number(game.price))">
                    </div>
                    <p v-show="errors.includes('price')" class="help is-danger">This price is invalid</p>
                </div>
                <p class="buttons">
                    <a class="button is-primary" :disabled="!isFormRequiredExist || !isFormValidated" @click="addGame()">Add Game</a>
                    <a class="button is-primary" @click="reset()">Reset</a>
                </p>
            </div>`,
    data() {
        return {
            errors: [],
            isFormValidated: true,
            game: { ...NEW_GAME
            },
        }
    },
    mounted() {},
    computed: {
        isFormRequiredExist() {
            return this.game.title && this.game.type && this.game.image && this.game.price
        },
    },
    methods: {
        validateField(prop, exp) {
            this.errors = [];
            if (exp) {
                const propIdx = this.errors.indexOf(prop);
                if (propIdx > -1) {
                    this.errors.splice(propIdx, 1);
                }
            } else {
                this.errors.push(prop);
            }
        },
        addGame() {
            dataService.addItem(this.game).then(() => {
                alert('Game was added!');
                this.$router.push('/');
            });
        },
        reset() {
            this.game = { ...NEW_GAME
            };
        },
    }
});