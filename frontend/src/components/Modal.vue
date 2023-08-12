<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal">
                <header class="modal-header" v-if="headerActive">
                    <slot name="header"></slot>
                </header>
        
                <section class="modal-body" v-if="bodyActive">
                    <slot name="body"></slot>
                </section>
        
                <footer class="modal-footer" v-if="footerActive">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script setup>
const props = defineProps({
  headerActive: Boolean,
  bodyActive: Boolean,
  footerActive: Boolean
});

const emits = defineEmits(['close']);
function close() {
    emits('close');
}
</script>

<style scoped>

  .modal-backdrop {
    position: fixed;
    border: 2px solid black;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .modal {
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    height: auto;
  }

  .modal-header,.modal-footer {
    padding: 15px;
    display: flex;
    height: auto;
    width: auto;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: center;
    max-height: 300px;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    height: auto;
    width: auto;
  }
  .modal-fade-enter, .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>
  