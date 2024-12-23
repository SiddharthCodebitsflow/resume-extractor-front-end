<template>
    <div class="overlay">
        <div class="popup">
            <div>
                <!-- Close button triggering $emit -->
                <div class="close-btn" @click="closeModle">Close</div>
                <h2>Candidate Details</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value, key) in data" :key="key">
                            <td>{{ formatKey(key) }}</td>
                            <td>
                                <div v-if="typeof value === 'object'">
                                    <table>
                                        <tbody>
                                            <tr v-for="(subValue, subKey) in value" :key="subKey">
                                                <td>{{ formatKey(subKey) }}</td>
                                                <td>{{ subValue }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-else>{{ value }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        closeModleMethod: {
            type: Function,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        closeModle() {
            // Correct way to emit the event
            this.$emit("closeModleMethod", 0); // Emit event with value 0
        },
        formatKey(key) {
            console.log(key);
            if (!key) return;
            return key
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase());
        },
    },
};
</script>

<style scoped>
.overlay {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(48, 58, 65, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
}

.popup {
    width: 700px;
    padding: 50px 100px;
    background: #fff;
    border-radius: 6px;
}

.close-btn {
    cursor: pointer;
    display: block;
    float: right;
}

h2 {
    font-weight: 600;
    font-size: 26px;
    text-align: center;
    margin: 0;
}

@media only screen and (max-width: 800px) {
    .overlay .popup {
        padding: 70px 30px 30px;
        max-width: 600px;
        width: auto;
    }
}
</style>