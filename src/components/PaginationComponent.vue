<script>
export default {
    name: "PaginationComponent",
    props: {
        totalRecords: {
            type: Number,
            required: true
        },
        onClickHandler: Function,
        getCurrentPage: Number,
        getPaginationItemsPerPage: Number
    },
    data() {
        return {
            currentPage: this.getCurrentPage,
            maxPagesShow: 5,
            showBreakpointButton: true
        };
    },
    watch: {
        getCurrentPage(newVal) {
            this.currentPage = newVal
            this.scrollToTop()
        }
    },
    mounted() {
        this.updateMaxPagesShow()
        window.addEventListener("resize", this.updateMaxPagesShow)
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateMaxPagesShow)
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalRecords / this.getPaginationItemsPerPage)
        },
        pageNumbers() {
            if (this.totalPages <= 6) {
                return Array.from({length: this.totalPages}, (_, i) => i + 1)
            }

            let pages = []

            if (this.currentPage > 3 && this.currentPage < this.totalPages - 2) {
                pages = [1, 2, 'start-ellipsis', this.currentPage - 1, this.currentPage, this.currentPage + 1, 'end-ellipsis', this.totalPages - 1, this.totalPages]
            } else {
                pages = [1, 2, 3, 'start-ellipsis', this.totalPages - 2, this.totalPages - 1, this.totalPages]
            }

            return pages
        }
    },
    methods: {
        updateMaxPagesShow() {
            if (window.innerWidth <= 576) {
                this.maxPagesShow = 1
            } else if (window.innerWidth <= 768) {
                this.maxPagesShow = 3
            } else {
                this.maxPagesShow = 5
            }
        },
        scrollToTop() {
            window.scrollTo({top: 0, behavior: 'smooth'})
        },
        onClickPrevNext(direction = 'next') {
            if (direction === 'next') {
                if (this.totalPages > this.currentPage) {
                    this.currentPage++
                    this.onClickHandler(this.currentPage)
                }
            } else {
                if (this.currentPage > 1) {
                    this.currentPage--
                    this.onClickHandler(this.currentPage)
                }
            }
        },
        onClickPage(page) {
            if (page !== this.currentPage && page !== 'start-ellipsis' && page !== 'end-ellipsis') {
                this.currentPage = page
                this.onClickHandler(this.currentPage)
            }
        }
    }
}
</script>

<template>
    <div class="d-flex justify-content-md-between flex-md-row justify-content-start align-items-md-center pagination-row">
        <button @click="() => onClickPrevNext('prev')">
            <div class="prev-btn d-md-none d-block">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8334 10H4.16675M4.16675 10L10.0001 15.8333M4.16675 10L10.0001 4.16666"
                          stroke="#344054"
                          stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="prev-btn  d-md-block d-none">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8334 10H4.16675M4.16675 10L10.0001 15.8333M4.16675 10L10.0001 4.16666"
                          stroke="#344054"
                          stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="prev-btn-text">Orqaga</span>
            </div>
        </button>

        <div class="pagination-container d-none d-md-flex">
            <button
                v-for="page in pageNumbers"
                :key="page"
                :class="['number-buttons', { 'active-page': page === currentPage }]"
                @click="onClickPage(page)">
                <template v-if="typeof page === 'string'">
                    ...
                </template>
                <template v-else>
                    {{ page }}
                </template>
            </button>
        </div>

        <div class="pagination-summary d-md-none text-center w-100">
            Page {{ currentPage }} of {{ totalPages }}
        </div>

        <button @click="() => onClickPrevNext('next')">
            <div class="next-btn d-md-none d-block">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16666M15.8334 10L10.0001 15.8333"
                          stroke="#344054"
                          stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="next-btn  d-md-block d-none">
                <span class="next-btn-text me-2">Keyingisi</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16666M15.8334 10L10.0001 15.8333"
                          stroke="#344054"
                          stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </button>
    </div>
</template>

<style>
.pagination-summary {
    margin: 0 20px;
}

.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

.prev-btn, .next-btn {
    width: 118px;
    height: 36px;
    padding: 7px 14px;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid #D0D5DD;
    color: #344054;
    text-align: center;
    box-shadow: 0 1px 2px 0 #1018280D;
}

.next-btn-text, .prev-btn-text {
    display: inline-block;
    width: 58px;
    height: 20px;
    color: #344054;
}

.number-buttons, .last-button, .ending-breakpoint-button, .first-button, .starting-breakpoint-button {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    color: #475467;
}

.active-page {
    background: #F9FAFB;
    color: #1D2939;
    border-radius: 8px;
    border: 1px solid #D0D5DD;
}

@media (max-width: 767px) {
    .prev-btn, .next-btn {
        width: 40px;
        height: 36px;
        padding: 5px 0;
        border-radius: 8px;
        border: 1px solid #D0D5DD;
        color: #344054;
        text-align: center;
        box-shadow: 0 1px 2px 0 #1018280D;
    }

    .pagination-summary {
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        margin: 20px 0;
    }
}
</style>
