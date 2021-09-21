<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white">
            <img src="@/assets/logo.png" 
                alt="Vue Logo"
                height="24"
                class="d-inline-block align-text-top mx-2">
            Daybook
        </a>

        <div class="d-flex">
            <a class="navbar-brand text-white">
            {{ userName }}
            </a>
            <button 
                class="btn btn-outline-info mx-2" 
                @click="$emit('on:logout')">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'navbar-component',
    props: {
        userName: {
            type: String,
            required: true,
            default: 'testing'
        }
    },
    emits: ["on:logout"],
}
</script>
