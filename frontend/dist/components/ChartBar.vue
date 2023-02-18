<template>
        <b-navbar type="dark" variant="dark">
            <b-row align-content="center">
                <b-collapse id="nav-text-collapse" is-nav>
                    <b-navbar-nav>
                        <b-col cols="2"></b-col>
                        <b-col cols="2">
                            <b-nav-item>
                                <b-nav-text class="nav-item">Bar</b-nav-text>
                            </b-nav-item>
                        </b-col>
                        <b-col cols="2">
                            <b-nav-item>
                                <b-nav-text class="nav-item">Line</b-nav-text>
                            </b-nav-item>
                        </b-col>
                        <b-col cols="2">
                            <b-nav-item>
                                <b-nav-text class="nav-item">Pie</b-nav-text>
                            </b-nav-item>
                        </b-col>
                        <b-col cols="2">
                            <b-nav-item>
                                <b-nav-text class="nav-item">Bubble</b-nav-text>
                            </b-nav-item>
                        </b-col>
                        <b-col cols="2"></b-col>
                    </b-navbar-nav>
                </b-collapse>
            </b-row>
        </b-navbar>
</template>

<script>
export default {
    data() {
        return {}
    },
}
</script>
<style scoped>
    .nav-item {
        color: white;
    }
    .navbar.center .navbar-inner {
        text-align: center;
    }   

    .navbar.center .navbar-inner .nav {
        display:inline-block;
        float: none;
    }
</style>