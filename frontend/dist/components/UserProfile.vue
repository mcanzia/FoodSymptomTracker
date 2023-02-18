<template>
    <div>
        Logged in as user
    </div>
</template>

<script>
import { auth } from "../firebase";
export default {
    data() {
        return {
            auth
        }
    },
    props: ['user'],
    components: {
    }
}
</script>