<script>

export default {
    name: "isLoading",
    props: {
        shimmerType: {
            type: String,
            default: 'single'
        }
    },
    data() {
        return {};
    },
}
</script>

<template>
    <div class="d-flex align-items-center justify-content-center vh-100">
        <div v-if="shimmerType === 'single'" class="card br">
            <div class="wrapper">
                <div class="profilePic animate"></div>
                <div class="comment br animate w-80 mt-5"></div>
                <div class="comment br animate mt-5"></div>
                <div class="comment br animate mt-5"></div>
                <div class="comment br animate mt-5"></div>
            </div>
        </div>

        <div v-else-if="shimmerType === 'list'" class="card br list">
            <div class="wrapper">
                <div class="row d-flex align-items-center my-3">
                    <div class="col-auto">
                        <div class="profilePic animate"></div>
                    </div>
                    <div class="col">
                        <div class="comment br animate"></div>
                    </div>
                </div>
                <div class="row d-flex align-items-center my-3">
                    <div class="col-auto">
                        <div class="profilePic animate"></div>
                    </div>
                    <div class="col">
                        <div class="comment br animate"></div>
                    </div>
                </div>
                <div class="row d-flex align-items-center my-3">
                    <div class="col-auto">
                        <div class="profilePic animate"></div>
                    </div>
                    <div class="col">
                        <div class="comment br animate"></div>
                    </div>
                </div>
                <div class="row d-flex align-items-center my-3">
                    <div class="col-auto">
                        <div class="profilePic animate"></div>
                    </div>
                    <div class="col">
                        <div class="comment br animate"></div>
                    </div>
                </div>
                <div class="row d-flex align-items-center my-3">
                    <div class="col-auto">
                        <div class="profilePic animate"></div>
                    </div>
                    <div class="col">
                        <div class="comment br animate"></div>
                    </div>
                </div>
                <div class="row d-flex align-items-center my-3">
                    <div class="col-auto">
                        <div class="profilePic animate"></div>
                    </div>
                    <div class="col">
                        <div class="comment br animate"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.br {
    border-radius: 8px;
}
.w-80 {
    max-width: 80%;
}
.card {
    border: 2px solid #fff;
    padding: 30px 40px;
    width: 80%;
    margin: 50px auto;
}
.profilePic {
    height: 65px;
    width: 65px;
    border-radius: 50%;
    background: #eff1f3;
}
.comment {
    height: 10px;
    background: #777;
}
.wrapper {
    width: 0;
    animation: fullView 0.1s forwards linear;
}

@keyframes fullView {
    100% {
        width: 100%;
    }
}

.animate {
    animation : shimmer 2s infinite;
    background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
    background-size: 1000px 100%;
}

@keyframes shimmer {
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
}

@media (max-width: 576px) {
    .profilePic {
        height: 35px;
        width: 35px;
        border-radius: 50%;
    }
    .comment {
        height: 10px;
        background: #777;
    }
    .animate {
        animation : shimmer 2s infinite;
        background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
        background-size: 1000px 100%;
    }
    .card {
        width: 90%;
    }
}
</style>
