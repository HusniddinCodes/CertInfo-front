<script>
export default {
  name: "PaginationComponent"
}
</script>

<template>
  <div class="container-fluid bg-white rounded-bottom-3">
    <div class="wrapper">
      <div class="d-flex justify-content-between align-content-center">
        <div class="prev-button">
          <a class="page-link opacity-50" href="#">
            <img src="@/assets/images/arrow-left.svg" alt="❮">
            <span class="d-none d-md-inline">
              Orqaga
            </span>
          </a>
        </div>
        <div class="">
          <ul class="pagination d-none d-md-flex">
            <li class="page-item"></li>
            <li class="page-item"><a class="page-link border-0 current text-black" href="#">1</a></li>
            <li class="page-item"><a class="page-link border-0 text-black" href="#">2</a></li>
            <li class="page-item"><a class="page-link border-0 text-black" href="#">3</a></li>
            <li class="page-item"><a class="page-link border-0 text-black" href="#">...</a></li>
            <li class="page-item"><a class="page-link border-0 text-black" href="#">8</a></li>
            <li class="page-item"><a class="page-link border-0 text-black" href="#">9</a></li>
            <li class="page-item"><a class="page-link border-0 text-black" href="#">10</a></li>
            <li class="page-item">
            </li>
          </ul>
          <div class="d-block d-md-none">
              page 1 of 10
          </div>
        </div>
        <div class="next-button">
          <a class="page-link" href="#">
             <span class="d-none d-md-inline">
              Keyingisi
            </span>
            <img src="@/assets/images/arrow-right.svg" alt="❯"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 12px 24px 16px 24px;
  font-size: 14px;
  font-weight: 600;
}

.page-link {
  background-color: transparent;
  display: flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid rgba(234, 236, 240, 1);
  color: rgba(52, 64, 84, 1);

}

.page-link.current {
  background-color: #F9FAFB;
}

.page-link img {
  width: 12px;
}

.page-link:first-child span{
  margin-left: 8px;
}
.page-link:last-child span{
  margin-right: 8px;
}
</style>
